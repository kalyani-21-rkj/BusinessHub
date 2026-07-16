const Attendance = require("../models/Attendance");

const markAttendance = async (req, res) => {
    try {

        const attendance = await Attendance.create(req.body);

        res.status(201).json({
            success: true,
            message: "Attendance Marked Successfully",
            attendance,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};
const getAttendance = async (req, res) => {

    try {

        const attendance = await Attendance.find()
            .populate("employee", "fullName department designation");

        res.status(200).json({
            success: true,
            count: attendance.length,
            attendance,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};
const getAttendanceByEmployee = async (req, res) => {

    try {

        const attendance = await Attendance.find({
            employee: req.params.employeeId
        }).populate(
            "employee",
            "fullName department designation"
        );

        res.status(200).json({
            success: true,
            count: attendance.length,
            attendance,
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }

};

module.exports = {
    markAttendance,
    getAttendance,
    getAttendanceByEmployee,
};