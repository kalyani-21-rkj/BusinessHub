const Employee = require("../models/Employee");
const Customer = require("../models/Customer");
const Product = require("../models/Product");
const Payment = require("../models/Payment");

const asyncHandler = require("../utils/asyncHandler");

const getDashboard = asyncHandler(async (req, res) => {

    const totalEmployees = await Employee.countDocuments();
    const totalCustomers = await Customer.countDocuments();
    const totalProducts = await Product.countDocuments();

    const payments = await Payment.find();

    const totalRevenue = payments.reduce(
        (sum, payment) => sum + Number(payment.amount || 0),
        0
    );

    res.status(200).json({
        success: true,
        dashboard: {
            totalEmployees,
            totalCustomers,
            totalProducts,
            totalRevenue,
        },
    });

});

module.exports = {
    getDashboard,
};