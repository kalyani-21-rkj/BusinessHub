const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const validate = require("../middleware/validate");
const productValidation = require("../validators/productValidator");

const {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    getProductStats,
    addStock,
} = require("../controllers/productController");

// Product Statistics
router.get(
  "/stats",
  protect,
  authorizeRoles("admin", "manager"),
  getProductStats
);

// Get All Products
router.get(
  "/",
  protect,
  authorizeRoles("admin", "manager"),
  getProducts
);

// Get Single Product
router.get(
  "/:id",
  protect,
  authorizeRoles("admin", "manager"),
  getProductById
);

// Add Product
router.post(
  "/",
  protect,
  authorizeRoles("admin"),
  productValidation,
  validate,
  addProduct
);

// Update Product
router.put(
  "/:id",
  protect,
  authorizeRoles("admin"),
  productValidation,
  validate,
  updateProduct
);

router.patch(
    "/:id/stock",
    protect,
    authorizeRoles("admin"),
    addStock
);

// Delete Product
router.delete(
  "/:id",
  protect,
  authorizeRoles("admin"),
  deleteProduct
);

module.exports = router;