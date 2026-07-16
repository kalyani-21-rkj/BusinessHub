const express = require("express");
const router = express.Router();

const {
    createInvoice,
    getInvoices,
} = require("../controllers/invoiceController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const invoiceValidation = require("../validators/invoiceValidator");
const validate = require("../middleware/validate");

router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    invoiceValidation,
    validate,
    createInvoice
);

router.get(
    "/",
    protect,
    authorizeRoles("admin", "manager"),
    getInvoices
);

module.exports = router;