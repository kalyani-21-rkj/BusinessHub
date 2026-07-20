const Bill = require("../models/Bill");
const Product = require("../models/Product");

const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");

// Create Bill
const createBill = asyncHandler(async (req, res) => {
  const {
    customerName,
    customerPhone,
    customerEmail,
    products,
    discount,
    gst,
    paymentMethod,
    status,
  } = req.body;

  if (!products || products.length === 0) {
    throw new ApiError(400, "Please select at least one product");
  }

  // Generate Invoice Number
  const lastBill = await Bill.findOne().sort({ createdAt: -1 });

  let invoiceNo = "INV-1001";

  if (lastBill) {
    const lastNo = parseInt(lastBill.invoiceNo.split("-")[1]);
    invoiceNo = `INV-${lastNo + 1}`;
  }

  let subTotal = 0;
  const billProducts = [];

  for (const item of products) {
    const product = await Product.findById(item.product);

    if (!product) {
      throw new ApiError(404, "Product Not Found");
    }

    if (product.stock < item.quantity) {
      throw new ApiError(
        400,
        `${product.name} has only ${product.stock} items in stock`
      );
    }

    const total = item.quantity * item.sellingPrice;

    subTotal += total;

    billProducts.push({
      product: product._id,
      quantity: item.quantity,
      sellingPrice: item.sellingPrice,
      total,
    });

    // Reduce Stock
    product.stock -= item.quantity;
    await product.save();
  }

  const discountAmount = Number(discount || 0);
  const gstAmount = Number(gst || 0);

  const totalAmount =
    subTotal - discountAmount + gstAmount;

  const bill = await Bill.create({
    invoiceNo,
    customerName,
    customerPhone,
    customerEmail,
    products: billProducts,
    subTotal,
    discount: discountAmount,
    gst: gstAmount,
    totalAmount,
    paymentMethod,
    status,
  });

  res.status(201).json({
    success: true,
    message: "Invoice Created Successfully",
    bill,
  });
});

// Get All Bills
const getBills = asyncHandler(async (req, res) => {
  const bills = await Bill.find()
    .populate("products.product")
    .sort({ createdAt: -1 });

  res.status(200).json({
    success: true,
    count: bills.length,
    bills,
  });
});

// Get Single Bill
const getBillById = asyncHandler(async (req, res) => {
  const bill = await Bill.findById(req.params.id)
    .populate("products.product");

  if (!bill) {
    throw new ApiError(404, "Invoice Not Found");
  }

  res.status(200).json({
    success: true,
    bill,
  });
});

// Delete Bill
const deleteBill = asyncHandler(async (req, res) => {
  const bill = await Bill.findById(req.params.id);

  if (!bill) {
    throw new ApiError(404, "Invoice Not Found");
  }

  // Restore Stock
  for (const item of bill.products) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: {
        stock: item.quantity,
      },
    });
  }

  await bill.deleteOne();

  res.status(200).json({
    success: true,
    message: "Invoice Deleted Successfully",
  });
});

module.exports = {
  createBill,
  getBills,
  getBillById,
  deleteBill,
};