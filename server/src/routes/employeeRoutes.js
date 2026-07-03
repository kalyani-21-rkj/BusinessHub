const express = require("express");
const router = express.Router();

const {
    addEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
} = require("../controllers/employeeController");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

// Only Admin can add employees
router.post("/", protect, authorizeRoles("admin"), addEmployee);

// Admin, Manager and Employee can view employees
router.get("/", protect, authorizeRoles("admin", "manager", "employee"), getEmployees);

// Admin, Manager and Employee can view employee by ID
router.get("/:id", protect, authorizeRoles("admin", "manager", "employee"), getEmployeeById);

// Only Admin can update employee
router.put("/:id", protect, authorizeRoles("admin"), updateEmployee);

// Only Admin can delete employee
router.delete("/:id", protect, authorizeRoles("admin"), deleteEmployee);

module.exports = router;