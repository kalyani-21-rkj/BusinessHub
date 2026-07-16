const { body } = require("express-validator");

const invoiceValidation = [

    body("customer")
        .isMongoId()
        .withMessage("Invalid Customer ID"),

    body("items")
        .isArray({ min: 1 })
        .withMessage("Invoice must contain at least one product"),

    body("items.*.product")
        .isMongoId()
        .withMessage("Invalid Product ID"),

    body("items.*.quantity")
        .isInt({ min: 1 })
        .withMessage("Quantity must be at least 1"),

];

module.exports = invoiceValidation;