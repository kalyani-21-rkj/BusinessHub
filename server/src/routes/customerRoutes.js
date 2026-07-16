const express = require("express");
const router = express.Router();

const {
    addCustomer,
    getCustomers,
} = require("../controllers/customerController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const customerValidation = require("../validators/customerValidator");
const validate = require("../middleware/validate");

router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    customerValidation,
    validate,
    addCustomer
);

router.get(
    "/",
    protect,
    authorizeRoles("admin", "manager"),
    getCustomers
);

module.exports = router;