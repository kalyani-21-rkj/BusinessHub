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

    let query = Product.find();

if (req.query.search) {
    query = query.find({
        name: {
            $regex: req.query.search,
            $options: "i",
        },
    });
}

if (req.query.category) {
    query = query.find({
        category: req.query.category,
    });
}

if (req.query.brand) {
    query = query.find({
        brand: req.query.brand,
    });
}

const apiFeatures = new APIFeatures(
    query,
    req.query
)
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

    const existingProduct = await Product.findById(req.params.id);

    if (!existingProduct) {
        throw new ApiError(404, "Product Not Found");
    }

    // Use old values if they are not being updated
    const purchasePrice =
        req.body.purchasePrice !== undefined
            ? Number(req.body.purchasePrice)
            : existingProduct.purchasePrice;

    const sellingPrice =
        req.body.sellingPrice !== undefined
            ? Number(req.body.sellingPrice)
            : existingProduct.sellingPrice;

    if (sellingPrice < purchasePrice) {
        throw new ApiError(
            400,
            "Selling Price must be greater than or equal to Purchase Price"
        );
    }

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    res.status(200).json({
        success: true,
        message: "Product Updated Successfully",
        product,
    });

});

// Add Stock
const addStock = asyncHandler(async (req, res) => {

    const { quantity } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
        throw new ApiError(404, "Product Not Found");
    }

    product.stock += Number(quantity);

    if (product.stock > 0) {
        product.status = "Available";
    }

    await product.save();

    res.status(200).json({
        success: true,
        message: "Stock Updated Successfully",
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
const getProductStats = asyncHandler(async (req, res) => {

    const totalProducts = await Product.countDocuments();

    const inStock = await Product.countDocuments({
        stock: { $gt: 5 },
    });

    const lowStock = await Product.countDocuments({
        stock: { $lte: 5 },
    });

    const revenue = await Product.aggregate([
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$sellingPrice",
                },
            },
        },
    ]);

    res.status(200).json({
        success: true,
        stats: {
            totalProducts,
            inStock,
            lowStock,
            revenue:
                revenue.length > 0
                    ? revenue[0].total
                    : 0,
        },
    });

});

module.exports = {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductStats,
    addStock,
};