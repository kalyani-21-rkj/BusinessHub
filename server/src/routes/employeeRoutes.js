const express = require("express");
const router = express.Router();

const {
    addEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    getEmployeeStats,
} = require("../controllers/employeeController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const employeeValidation = require("../validators/employeeValidator");
const validate = require("../middleware/validate");

// Add Employee
router.post(
    "/",
    protect,
    authorizeRoles("admin"),
    employeeValidation,
    validate,
    addEmployee
);

// Get All Employees
router.get(
    "/",
    protect,
    authorizeRoles("admin", "manager", "employee"),
    getEmployees
);
router.get(
    "/stats",
    protect,
    authorizeRoles("admin", "manager"),
    getEmployeeStats
);

// Get Employee By ID
router.get(
    "/:id",
    protect,
    authorizeRoles("admin", "manager", "employee"),
    getEmployeeById
);


// Update Employee
router.put(
    "/:id",
    protect,
    authorizeRoles("admin"),
    employeeValidation,
    validate,
    updateEmployee
);

// Delete Employee
router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    deleteEmployee
);


module.exports = router;