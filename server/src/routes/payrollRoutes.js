const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const validate = require("../middleware/validate");
const payrollValidation = require("../validators/payrollValidator");

const {
    generatePayroll,
    getPayrolls,
    getPayrollById,
    updatePayroll,
    deletePayroll,
    getPayrollStats,
    downloadPayslip,
} = require("../controllers/payrollController");

// Create Payroll
router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    payrollValidation,
    validate,
    generatePayroll
);

// Get All Payrolls
router.get(
    "/",
    protect,
    authorizeRoles("admin", "manager"),
    getPayrolls
);

// Payroll Statistics
router.get(
    "/stats",
    protect,
    authorizeRoles("admin", "manager"),
    getPayrollStats
);

router.get(
    "/:id/payslip",
    protect,
    authorizeRoles("admin", "manager"),
    downloadPayslip
);

// Get Payroll By ID
router.get(
    "/:id",
    protect,
    authorizeRoles("admin", "manager"),
    getPayrollById
);

// Update Payroll
router.put(
    "/:id",
    protect,
    authorizeRoles("admin"),
    payrollValidation,
    validate,
    updatePayroll
);

// Delete Payroll
router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    deletePayroll
);

module.exports = router;