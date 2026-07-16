const express = require("express");
const router = express.Router();

const {
    generatePayroll,
    getPayroll,
    markSalaryPaid,
} = require("../controllers/payrollController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const payrollValidation = require("../validators/payrollValidator");
const validate = require("../middleware/validate");

router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    payrollValidation,
    validate,
    generatePayroll
);

router.get(
    "/",
    protect,
    authorizeRoles("admin", "manager"),
    getPayroll
);

router.put(
    "/:id",
    protect,
    authorizeRoles("admin"),
    payrollValidation,
    validate,
    markSalaryPaid
);

module.exports = router;