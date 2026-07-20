const Leave = require("../models/Leave");
const APIFeatures = require("../utils/apiFeatures");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");

// ======================================
// Apply Leave
// ======================================
const applyLeave = asyncHandler(async (req, res) => {

    const leave = await Leave.create(req.body);

    res.status(201).json({
        success: true,
        message: "Leave Applied Successfully",
        leave,
    });

});

// ======================================
// Get All Leaves
// ======================================
const getLeaves = asyncHandler(async (req, res) => {

    const resultPerPage = 10;
    const page = Number(req.query.page) || 1;
    const keyword = req.query.search || "";

    let query = Leave.find().populate(
        "employee",
        "fullName department designation"
    );

    query = query.sort("-createdAt");

    const leaves = await query;

    // Search AFTER populate
    let filteredLeaves = leaves;

    if (keyword) {
        filteredLeaves = leaves.filter((leave) => {

            const employeeName =
                leave.employee?.fullName?.toLowerCase() || "";

            const department =
                leave.employee?.department?.toLowerCase() || "";

            const leaveType =
                leave.leaveType?.toLowerCase() || "";

            const status =
                leave.status?.toLowerCase() || "";

            return (
                employeeName.includes(keyword.toLowerCase()) ||
                department.includes(keyword.toLowerCase()) ||
                leaveType.includes(keyword.toLowerCase()) ||
                status.includes(keyword.toLowerCase())
            );
        });
    }

    const totalLeaves = filteredLeaves.length;

    const start = (page - 1) * resultPerPage;
    const end = start + resultPerPage;

    const paginatedLeaves = filteredLeaves.slice(start, end);

    res.status(200).json({
        success: true,
        totalLeaves,
        resultPerPage,
        currentPage: page,
        count: paginatedLeaves.length,
        leaves: paginatedLeaves,
    });

});

// ======================================
// Get Leave By ID
// ======================================
const getLeaveById = asyncHandler(async (req, res) => {

    const leave = await Leave.findById(req.params.id)
        .populate(
            "employee",
            "fullName department designation"
        );

    if (!leave) {
        throw new ApiError(404, "Leave Not Found");
    }

    res.status(200).json({
        success: true,
        leave,
    });

});

// ======================================
// Update Leave
// ======================================
const updateLeave = asyncHandler(async (req, res) => {

    const leave = await Leave.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!leave) {
        throw new ApiError(404, "Leave Not Found");
    }

    res.status(200).json({
        success: true,
        message: "Leave Updated Successfully",
        leave,
    });

});

// ======================================
// Delete Leave
// ======================================
const deleteLeave = asyncHandler(async (req, res) => {

    const leave = await Leave.findByIdAndDelete(req.params.id);

    if (!leave) {
        throw new ApiError(404, "Leave Not Found");
    }

    res.status(200).json({
        success: true,
        message: "Leave Deleted Successfully",
    });

});

// ======================================
// Approve Leave
// ======================================
const approveLeave = asyncHandler(async (req, res) => {

    const leave = await Leave.findById(req.params.id);

    if (!leave) {
        throw new ApiError(404, "Leave Not Found");
    }

    leave.status = "Approved";
    leave.approvedAt = new Date();

    if (req.user) {
        leave.approvedBy = req.user._id;
    }

    await leave.save();

    res.status(200).json({
        success: true,
        message: "Leave Approved Successfully",
        leave,
    });

});

// ======================================
// Reject Leave
// ======================================
const rejectLeave = asyncHandler(async (req, res) => {

    const leave = await Leave.findById(req.params.id);

    if (!leave) {
        throw new ApiError(404, "Leave Not Found");
    }

    leave.status = "Rejected";
    leave.approvedAt = new Date();

    if (req.user) {
        leave.approvedBy = req.user._id;
    }

    await leave.save();

    res.status(200).json({
        success: true,
        message: "Leave Rejected Successfully",
        leave,
    });

});

// ======================================
// Leave Statistics
// ======================================
const getLeaveStats = asyncHandler(async (req, res) => {

    const totalLeaves = await Leave.countDocuments();

    const pendingLeaves = await Leave.countDocuments({
        status: "Pending",
    });

    const approvedLeaves = await Leave.countDocuments({
        status: "Approved",
    });

    const rejectedLeaves = await Leave.countDocuments({
        status: "Rejected",
    });

    res.status(200).json({
        success: true,
        stats: {
            totalLeaves,
            pendingLeaves,
            approvedLeaves,
            rejectedLeaves,
        },
    });

});

module.exports = {
    applyLeave,
    getLeaves,
    getLeaveById,
    updateLeave,
    deleteLeave,
    approveLeave,
    rejectLeave,
    getLeaveStats,
};