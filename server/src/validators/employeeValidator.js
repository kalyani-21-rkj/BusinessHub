const { body } = require("express-validator");

const employeeValidation = [

    body("fullName")
        .notEmpty()
        .withMessage("Full Name is required"),

    body("email")
        .isEmail()
        .withMessage("Invalid Email"),

    body("phone")
        .isLength({ min: 10, max: 10 })
        .withMessage("Phone must contain 10 digits"),

    body("department")
        .notEmpty()
        .withMessage("Department is required"),

    body("designation")
        .notEmpty()
        .withMessage("Designation is required"),

    body("salary")
        .isNumeric()
        .withMessage("Salary must be numeric")
        .isFloat({ min: 0 })
        .withMessage("Salary cannot be negative"),

];

module.exports = employeeValidation;