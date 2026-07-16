const { body } = require("express-validator");

const payrollValidation = [

    body("employee")
        .isMongoId()
        .withMessage("Invalid Employee ID"),

    body("month")
        .isInt({ min: 1, max: 12 })
        .withMessage("Month must be between 1 and 12"),

    body("year")
        .isInt({ min: 2024 })
        .withMessage("Invalid Year"),

    body("bonus")
        .optional()
        .isNumeric()
        .withMessage("Bonus must be numeric"),

    body("deduction")
        .optional()
        .isNumeric()
        .withMessage("Deduction must be numeric"),

];

module.exports = payrollValidation;