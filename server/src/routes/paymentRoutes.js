const express = require("express");
const router = express.Router();

const {
    createPayment,
    getPayments,
} = require("../controllers/paymentController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const paymentValidation = require("../validators/paymentValidator");
const validate = require("../middleware/validate");

router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    paymentValidation,
    validate,
    createPayment
);

router.get(
    "/",
    protect,
    authorizeRoles("admin", "manager"),
    getPayments
);

module.exports = router;