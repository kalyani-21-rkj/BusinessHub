const express = require("express");
const router = express.Router();

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
    markAttendance,
    getAttendance,
    getAttendanceById,
    getAttendanceByEmployee,
    updateAttendance,
    deleteAttendance,
    getAttendanceStats,
    getMonthlyAttendance,
} = require("../controllers/attendanceController");


// =======================================
// Mark Attendance
// =======================================
router.post(
    "/",
    protect,
    authorizeRoles("admin", "manager"),
    markAttendance
);


// =======================================
// Attendance Statistics
// =======================================
router.get(
    "/stats",
    protect,
    authorizeRoles("admin", "manager"),
    getAttendanceStats
);


// =======================================
// Monthly Attendance Report
// Example:
// /attendance/monthly?month=7&year=2026
// =======================================
router.get(
    "/monthly",
    protect,
    authorizeRoles("admin", "manager"),
    getMonthlyAttendance
);


// =======================================
// Get All Attendance
// =======================================
router.get(
    "/",
    protect,
    authorizeRoles("admin", "manager", "employee"),
    getAttendance
);


// =======================================
// Get Attendance By Employee
// =======================================
router.get(
    "/employee/:employeeId",
    protect,
    authorizeRoles("admin", "manager", "employee"),
    getAttendanceByEmployee
);


// =======================================
// Get Attendance By ID
// =======================================
router.get(
    "/:id",
    protect,
    authorizeRoles("admin", "manager", "employee"),
    getAttendanceById
);


// =======================================
// Update Attendance
// =======================================
router.put(
    "/:id",
    protect,
    authorizeRoles("admin", "manager"),
    updateAttendance
);


// =======================================
// Delete Attendance
// =======================================
router.delete(
    "/:id",
    protect,
    authorizeRoles("admin"),
    deleteAttendance
);

module.exports = router;