const { body } = require("express-validator");

const leaveValidation = [

    body("employee")
        .isMongoId()
        .withMessage("Invalid Employee ID"),

    body("leaveType")
        .isIn(["Sick", "Casual", "Paid"])
        .withMessage("Invalid Leave Type"),

    body("fromDate")
        .isISO8601()
        .withMessage("Invalid From Date"),

    body("toDate")
        .isISO8601()
        .withMessage("Invalid To Date"),

    body("reason")
        .notEmpty()
        .withMessage("Reason is required"),

];

module.exports = leaveValidation;