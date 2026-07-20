const Attendance = require("../models/Attendance");
const APIFeatures = require("../utils/apiFeatures");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");


// ================================
// Mark Attendance
// ================================
const markAttendance = asyncHandler(async (req, res) => {

    const attendance = await Attendance.create(req.body);

    res.status(201).json({
        success: true,
        message: "Attendance Marked Successfully",
        attendance,
    });

});


/// ================================
// Get All Attendance
// ================================
const getAttendance = asyncHandler(async (req, res) => {

    const resultPerPage = 10;
    const page = Number(req.query.page) || 1;
    const keyword = req.query.search || "";

    let query = Attendance.find().populate(
        "employee",
        "fullName department designation"
    );

    if (req.query.status) {
        query = query.where("status").equals(req.query.status);
    }

    if (req.query.date) {
        query = query.where("date").equals(req.query.date);
    }

    query = query.sort("-createdAt");

    const attendance = await query;

    // Search after populate
    let filteredAttendance = attendance;

    if (keyword) {

        filteredAttendance = attendance.filter((item) => {

            const employeeName =
                item.employee?.fullName?.toLowerCase() || "";

            const department =
                item.employee?.department?.toLowerCase() || "";

            const designation =
                item.employee?.designation?.toLowerCase() || "";

            const status =
                item.status?.toLowerCase() || "";

            return (
                employeeName.includes(keyword.toLowerCase()) ||
                department.includes(keyword.toLowerCase()) ||
                designation.includes(keyword.toLowerCase()) ||
                status.includes(keyword.toLowerCase())
            );
        });

    }

    const totalAttendance = filteredAttendance.length;

    const start = (page - 1) * resultPerPage;
    const end = start + resultPerPage;

    const paginatedAttendance = filteredAttendance.slice(start, end);

    res.status(200).json({

        success: true,
        totalAttendance,
        resultPerPage,
        currentPage: page,
        count: paginatedAttendance.length,
        attendance: paginatedAttendance,

    });

});


// ================================
// Get Attendance By ID
// ================================
const getAttendanceById = asyncHandler(async (req, res) => {

    const attendance = await Attendance.findById(req.params.id)
        .populate(
            "employee",
            "fullName department designation"
        );

    if (!attendance) {

        throw new ApiError(
            404,
            "Attendance Not Found"
        );

    }

    res.status(200).json({

        success: true,
        attendance,

    });

});


// ================================
// Get Attendance By Employee
// ================================
const getAttendanceByEmployee = asyncHandler(async (req, res) => {

    const attendance = await Attendance.find({

        employee: req.params.employeeId,

    }).populate(

        "employee",
        "fullName department designation"

    );

    res.status(200).json({

        success: true,
        count: attendance.length,
        attendance,

    });

});


// ================================
// Update Attendance
// ================================
const updateAttendance = asyncHandler(async (req, res) => {

    const attendance = await Attendance.findByIdAndUpdate(

        req.params.id,

        req.body,

        {
            new: true,
            runValidators: true,
        }

    );

    if (!attendance) {

        throw new ApiError(
            404,
            "Attendance Not Found"
        );

    }

    res.status(200).json({

        success: true,
        message: "Attendance Updated Successfully",
        attendance,

    });

});


// ================================
// Delete Attendance
// ================================
const deleteAttendance = asyncHandler(async (req, res) => {

    const attendance = await Attendance.findByIdAndDelete(
        req.params.id
    );

    if (!attendance) {

        throw new ApiError(
            404,
            "Attendance Not Found"
        );

    }

    res.status(200).json({

        success: true,
        message: "Attendance Deleted Successfully",

    });

});


// ================================
// Attendance Statistics
// ================================
const getAttendanceStats = asyncHandler(async (req, res) => {

    const totalAttendance =
        await Attendance.countDocuments();

    const present =
        await Attendance.countDocuments({
            status: "Present",
        });

    const absent =
        await Attendance.countDocuments({
            status: "Absent",
        });

    const leave =
        await Attendance.countDocuments({
            status: "Leave",
        });

    const halfDay =
        await Attendance.countDocuments({
            status: "Half Day",
        });

    res.status(200).json({

        success: true,

        stats: {

            totalAttendance,
            present,
            absent,
            leave,
            halfDay,

        },

    });

});


// ================================
// Monthly Attendance
// ================================
const getMonthlyAttendance = asyncHandler(async (req, res) => {

    const { month, year } = req.query;

    const startDate = new Date(year, month - 1, 1);

    const endDate = new Date(year, month, 1);

    const attendance = await Attendance.find({

        date: {

            $gte: startDate,
            $lt: endDate,

        },

    }).populate(

        "employee",
        "fullName department designation"

    );

    res.status(200).json({

        success: true,
        count: attendance.length,
        attendance,

    });

});


module.exports = {

    markAttendance,

    getAttendance,

    getAttendanceById,

    getAttendanceByEmployee,

    updateAttendance,

    deleteAttendance,

    getAttendanceStats,

    getMonthlyAttendance,

};