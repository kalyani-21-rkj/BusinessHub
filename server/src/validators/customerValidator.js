const { body } = require("express-validator");

const customerValidation = [

    body("fullName")
        .notEmpty()
        .withMessage("Full Name is required"),

    body("email")
        .isEmail()
        .withMessage("Enter a valid email"),

    body("phone")
        .isLength({ min: 10, max: 10 })
        .withMessage("Phone must be 10 digits"),

    body("company")
        .notEmpty()
        .withMessage("Company is required"),

    body("address")
        .notEmpty()
        .withMessage("Address is required"),

];

module.exports = customerValidation;