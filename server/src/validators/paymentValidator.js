const { body } = require("express-validator");

const paymentValidation = [

    body("invoice")
        .isMongoId()
        .withMessage("Invalid Invoice ID"),

    body("paymentMethod")
        .isIn(["Cash", "Card", "UPI", "Net Banking"])
        .withMessage("Invalid Payment Method"),

    body("transactionId")
        .notEmpty()
        .withMessage("Transaction ID is required"),

];

module.exports = paymentValidation;