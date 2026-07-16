const Customer = require("../models/Customer");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");

// Add Customer
const addCustomer = asyncHandler(async (req, res) => {

    const customer = await Customer.create(req.body);

    res.status(201).json({
        success: true,
        message: "Customer Added Successfully",
        customer,
    });

});

// Get All Customers
const APIFeatures = require("../utils/apiFeatures");

const getCustomers = asyncHandler(async (req, res) => {

    const resultPerPage = 5;
    const totalCustomers = await Customer.countDocuments();
    const apiFeatures = new APIFeatures(
        Customer.find(),
        req.query
    )
        .search()
        .filter()
        .sort()
        .paginate(resultPerPage);

    const customers = await apiFeatures.query;

    res.status(200).json({
        success: true,
        totalCustomers,
        resultPerPage,
        currentPage: Number(req.query.page) || 1,
        count: customers.length,
        customers,
    });

});

// Get Single Customer
const getCustomerById = asyncHandler(async (req, res) => {

    const customer = await Customer.findById(req.params.id);
    if (!customer) {
        throw new ApiError(404, "Customer Not Found");
    }

    res.status(200).json({
        success: true,
        customer,
    });

});

// Update Customer
const updateCustomer = asyncHandler(async (req, res) => {
    const customer = await Customer.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            returnDocument: "after",
            runValidators: true,
        }
    );

    if (!customer) {
        throw new ApiError(404, "Customer Not Found");
    }

    res.status(200).json({
        success: true,
        message: "Customer Updated Successfully",
        customer,
    });

});

// Delete Customer
const deleteCustomer = asyncHandler(async (req, res) => {

    const customer = await Customer.findByIdAndDelete(req.params.id);
    if (!customer) {
        throw new ApiError(404, "Customer Not Found");
    }

    res.status(200).json({
        success: true,
        message: "Customer Deleted Successfully",
    });

});

module.exports = {
    addCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
};