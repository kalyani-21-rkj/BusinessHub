const { body } = require("express-validator");

const payrollValidation = [

    body("employee")
        .isMongoId()
        .withMessage("Invalid Employee ID"),

   body("month")
  .matches(/^\d{4}-\d{2}$/)
  .withMessage("Invalid month"),

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