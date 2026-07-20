const Purchase = require("../models/Purchase");
const Product = require("../models/Product");
const ApiError = require("../utils/apiError");
const asyncHandler = require("../utils/asyncHandler");
const addPurchase = asyncHandler(async (req, res) => {

    const {
        supplier,
        warehouse,
        products,
        expectedDate,
        notes,
        status,
    } = req.body;

    if (!supplier || !warehouse || !products || products.length === 0) {
        throw new ApiError(400, "Please fill all required fields");
    }

    let totalAmount = 0;

    for (const item of products) {

        totalAmount +=
            Number(item.quantity) *
            Number(item.purchasePrice);

    }

    const purchase = await Purchase.create({

        supplier,
        warehouse,
        products,
        expectedDate,
        notes,
        status: status || "Pending",
        totalAmount,

    });

    if (purchase.status === "Received") {

        for (const item of purchase.products) {

            await Product.findByIdAndUpdate(

                item.product,

                {
                    $inc: {
                        stock: item.quantity,
                    },
                }

            );

        }

    }

    res.status(201).json({

        success: true,
        message: "Purchase Created Successfully",
        purchase,

    });

});

const getPurchases = asyncHandler(async (req, res) => {

    const purchases = await Purchase.find()

        .populate("products.product")

        .sort({
            createdAt: -1,
        });

    res.status(200).json({

        success: true,

        count: purchases.length,

        purchases,

    });

});

const getPurchaseById = asyncHandler(async (req, res) => {

    const purchase = await Purchase.findById(req.params.id)

        .populate("products.product");

    if (!purchase) {

        throw new ApiError(404, "Purchase Not Found");

    }

    res.status(200).json({

        success: true,

        purchase,

    });

});

const updatePurchase = asyncHandler(async (req, res) => {

    const oldPurchase = await Purchase.findById(req.params.id);

    if (!oldPurchase) {

        throw new ApiError(404, "Purchase Not Found");

    }

    let totalAmount = 0;

    if (req.body.products) {

        req.body.products.forEach((item) => {

            totalAmount +=
                Number(item.quantity) *
                Number(item.purchasePrice);

        });

        req.body.totalAmount = totalAmount;

    }

    if (

        oldPurchase.status !== "Received" &&

        req.body.status === "Received"

    ) {

        for (const item of oldPurchase.products) {

            await Product.findByIdAndUpdate(

                item.product,

                {
                    $inc: {
                        stock: item.quantity,
                    },
                }

            );

        }

    }

    const purchase = await Purchase.findByIdAndUpdate(

        req.params.id,

        req.body,

        {

            new: true,

            runValidators: true,

        }

    ).populate("products.product");

    res.status(200).json({

        success: true,

        message: "Purchase Updated Successfully",

        purchase,

    });

});

const deletePurchase = asyncHandler(async (req, res) => {

    const purchase = await Purchase.findById(req.params.id);

    if (!purchase) {

        throw new ApiError(404, "Purchase Not Found");

    }

    await purchase.deleteOne();

    res.status(200).json({

        success: true,

        message: "Purchase Deleted Successfully",

    });

});

const getPurchaseStats = asyncHandler(async (req, res) => {

    const totalPurchases = await Purchase.countDocuments();

    const pending = await Purchase.countDocuments({

        status: "Pending",

    });

    const ordered = await Purchase.countDocuments({

        status: "Ordered",

    });

    const received = await Purchase.countDocuments({

        status: "Received",

    });

    const amount = await Purchase.aggregate([

        {

            $group: {

                _id: null,

                total: {

                    $sum: "$totalAmount",

                },

            },

        },

    ]);

    res.status(200).json({

        success: true,

        stats: {

            totalPurchases,

            pending,

            ordered,

            received,

            totalAmount:

                amount.length > 0

                    ? amount[0].total

                    : 0,

        },

    });

});

module.exports = {

    addPurchase,

    getPurchases,

    getPurchaseById,

    updatePurchase,

    deletePurchase,

    getPurchaseStats,

};