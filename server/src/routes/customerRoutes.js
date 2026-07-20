const express = require("express");
const router = express.Router();

const {
    addCustomer,
    getCustomers,
    getCustomerById,
    updateCustomer,
    deleteCustomer,
    getCustomerStats,
} = require("../controllers/customerController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const customerValidation = require("../validators/customerValidator");
const validate = require("../middleware/validate");

// Add Customer
router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    customerValidation,
    validate,
    addCustomer
);

// Get All Customers
router.get(
    "/",
    protect,
    authorizeRoles("admin", "manager"),
    getCustomers
);

router.get(
    "/stats",
    protect,
    authorizeRoles("admin", "manager"),
    getCustomerStats
);

// Get Single Customer
router.get(
    "/:id",
    protect,
    authorizeRoles("admin", "manager"),
    getCustomerById
);

// Update Customer
router.put(
    "/:id",
    protect,
    authorizeRoles("admin"),
    customerValidation,
    validate,
    updateCustomer
);

// Delete Customer
router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    deleteCustomer
);

module.exports = router;