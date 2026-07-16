const Product = require("../models/Product");
const ApiError = require("../utils/apiError");
const asyncHandler = require("../utils/asyncHandler");


// Add Product
const addProduct = asyncHandler(async (req, res) => {

    const existingProduct = await Product.findOne({
        name: req.body.name,
    });

    if (existingProduct) {
        throw new ApiError(400, "Product Already Exists");
    }

    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        message: "Product Added Successfully",
        product,
    });

});

// Get All Products
const APIFeatures = require("../utils/apiFeatures");

const getProducts = asyncHandler(async (req, res) => {

    const resultPerPage = 5;

    const totalProducts = await Product.countDocuments();

    const apiFeatures = new APIFeatures(
        Product.find(),
        req.query
    )
        .search()
        .filter()
        .sort()
        .paginate(resultPerPage);

    const products = await apiFeatures.query;

    res.status(200).json({
        success: true,
        totalProducts,
        resultPerPage,
        currentPage: Number(req.query.page) || 1,
        count: products.length,
        products,
    });

});

// Get Single Product
const getProductById = asyncHandler(async (req, res) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new ApiError(404, "Product Not Found");
    }

    res.status(200).json({
        success: true,
        product,
    });

});

// Update Product
const updateProduct = asyncHandler(async (req, res) => {

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            returnDocument: "after",
            runValidators: true,
        }
    );

    if (!product) {
        throw new ApiError(404, "Product Not Found");
    }

    res.status(200).json({
        success: true,
        message: "Product Updated Successfully",
        product,
    });

});

// Delete Product
const deleteProduct = asyncHandler(async (req, res) => {

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
        throw new ApiError(404, "Product Not Found");
    }

    res.status(200).json({
        success: true,
        message: "Product Deleted Successfully",
    });

});

module.exports = {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};