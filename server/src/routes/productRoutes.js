const express = require("express");
const router = express.Router();

const {
    addProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
} = require("../controllers/productController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");
const productValidation = require("../validators/productValidator");
const validate = require("../middleware/validate");

console.log("protect:", typeof protect);
console.log("authorizeRoles:", typeof authorizeRoles);
console.log("productValidation:", Array.isArray(productValidation));
console.log("validate:", typeof validate);
console.log("addProduct:", typeof addProduct);
console.log(productValidation);

router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    productValidation,
    validate,
    addProduct
);

router.get("/", protect, authorizeRoles("admin", "manager"), getProducts);

router.get("/:id", protect, authorizeRoles("admin", "manager"), getProductById);

router.put(
    "/:id",
    protect,
    authorizeRoles("admin"),
    productValidation,
    validate,
    updateProduct
);

router.delete("/:id", protect, authorizeRoles("admin", "manager"), deleteProduct);

module.exports = router;