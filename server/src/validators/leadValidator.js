const { body } = require("express-validator");

const leadValidation = [

    body("customer")
        .isMongoId()
        .withMessage("Invalid Customer ID"),

    body("assignedTo")
        .isMongoId()
        .withMessage("Invalid Employee ID"),

    body("source")
        .notEmpty()
        .withMessage("Lead source is required"),

    body("status")
        .optional()
        .isIn(["New", "Contacted", "Qualified", "Won", "Lost"])
        .withMessage("Invalid Lead Status"),

];

module.exports = leadValidation;