const Payment = require("../models/Payment");
const Invoice = require("../models/Invoice");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");

// Create Payment
const createPayment = asyncHandler(async (req, res) => {

    const {
        invoice,
        paymentMethod,
        transactionId,
    } = req.body;

    // Check Invoice
    const invoiceData = await Invoice.findById(invoice);

    if (!invoiceData) {
        throw new ApiError(404, "Invoice Not Found");
    }

    // Check Duplicate Transaction ID
    const existingPayment = await Payment.findOne({
        transactionId,
    });

    if (existingPayment) {
        throw new ApiError(400, "Transaction ID Already Exists");
    }

    // Create Payment
    const payment = await Payment.create({

        invoice,
        amount: invoiceData.totalAmount,
        paymentMethod,
        transactionId,

    });

    // Update Invoice Status
    invoiceData.paymentStatus = "Paid";

    await invoiceData.save();

    res.status(201).json({

        success: true,
        message: "Payment Successful",
        payment,

    });

});

// Get Payments
const APIFeatures = require("../utils/apiFeatures");

const getPayments = asyncHandler(async (req, res) => {
    const resultPerPage = 5;
    const totalPayments = await Payment.countDocuments();
    const apiFeatures = new APIFeatures(
        Payment.find()
            .populate({
                path: "invoice",
                populate: {
                    path: "customer",
                    select: "fullName email",
                },
            }),
        req.query
    )
        .search()
        .filter()
        .sort()
        .paginate(resultPerPage);

    const payments = await apiFeatures.query;

    res.status(200).json({
        success: true,
        totalPayments,
        resultPerPage,
        currentPage: Number(req.query.page) || 1,
        count: payments.length,
        payments,
    });

});

module.exports = {

    createPayment,
    getPayments,

};