const { body } = require("express-validator");

const productValidation = [

    body("name")
        .trim()
        .notEmpty()
        .withMessage("Product Name is required"),

    body("brand")
        .trim()
        .notEmpty()
        .withMessage("Brand is required"),

    body("category")
        .trim()
        .notEmpty()
        .withMessage("Category is required"),

    body("supplier")
        .trim()
        .notEmpty()
        .withMessage("Supplier is required"),

    body("sku")
        .trim()
        .notEmpty()
        .withMessage("SKU is required"),

    body("purchasePrice")
        .isFloat({ min: 0 })
        .withMessage("Purchase Price must be a positive number"),

    body("sellingPrice")
        .isFloat({ min: 0 })
        .withMessage("Selling Price must be a positive number"),

    body("stock")
        .isInt({ min: 0 })
        .withMessage("Stock cannot be negative"),

    body("description")
        .optional(),

    body("image.url")
        .optional(),

    body("image.public_id")
        .optional(),

];

module.exports = productValidation;