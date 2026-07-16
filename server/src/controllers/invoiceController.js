const Invoice = require("../models/Invoice");
const Product = require("../models/Product");
const Customer = require("../models/Customer");

const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");

// Create Invoice
const createInvoice = asyncHandler(async (req, res) => {

    const { customer, items } = req.body;
    const customerExists = await Customer.findById(customer);
    if (!customerExists) {
        throw new ApiError(404, "Customer Not Found");
    }

    let totalAmount = 0;
    for (const item of items) {
        const product = await Product.findById(item.product);

        if (!product) {
            throw new ApiError(404, "Product Not Found");
        }
        if (product.stock < item.quantity) {
            throw new ApiError(
                400,
                `${product.name} is out of stock`
            );
        }

        item.price = product.price;
        totalAmount += product.price * item.quantity;
        product.stock -= item.quantity;
        await product.save();

    }

    const invoice = await Invoice.create({

        customer,
        items,
        totalAmount,

    });

    res.status(201).json({

        success: true,
        message: "Invoice Created Successfully",
        invoice,

    });

});


// Get All Invoices
const APIFeatures = require("../utils/apiFeatures");

const getInvoices = asyncHandler(async (req, res) => {
    const resultPerPage = 5;
    const totalInvoices = await Invoice.countDocuments();
    const apiFeatures = new APIFeatures(
        Invoice.find()
            .populate("customer", "fullName email")
            .populate("items.product", "name price"),
        req.query
    )
        .search()
        .filter()
        .sort()
        .paginate(resultPerPage);

    const invoices = await apiFeatures.query;

    res.status(200).json({
        success: true,
        totalInvoices,
        resultPerPage,
        currentPage: Number(req.query.page) || 1,
        count: invoices.length,
        invoices,
    });

});

module.exports = {

    createInvoice,
    getInvoices,

};