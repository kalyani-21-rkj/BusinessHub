const { body } = require("express-validator");

const productValidation = [

    body("name")
        .notEmpty()
        .withMessage("Product Name is required"),

    body("price")
        .isNumeric()
        .withMessage("Price must be numeric")
        .isFloat({ min: 1 })
        .withMessage("Price must be greater than 0"),

    body("stock")
        .isInt({ min: 0 })
        .withMessage("Stock cannot be negative"),

    body("category")
        .notEmpty()
        .withMessage("Category is required"),

];



module.exports = productValidation;

module.exports = productValidation;