const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    markAttendance,
    getAttendance,
    getAttendanceByEmployee,
} = require("../controllers/attendanceController");

// Admin and Manager can mark attendance
router.post(
    "/",
    protect,
    authorizeRoles("admin", "manager"),
    markAttendance
);

// Admin, Manager and Employee can view all attendance
router.get(
    "/",
    protect,
    authorizeRoles("admin", "manager", "employee"),
    getAttendance
);

// Attendance of a specific employee
router.get(
    "/:employeeId",
    protect,
    authorizeRoles("admin", "manager", "employee"),
    getAttendanceByEmployee
);

module.exports = router;