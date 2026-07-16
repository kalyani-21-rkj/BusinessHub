const Payroll = require("../models/Payroll");
const Employee = require("../models/Employee");

const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");

// Generate Payroll
const generatePayroll = asyncHandler(async (req, res) => {

    const {
        employee,
        month,
        year,
        bonus,
        deduction,
    } = req.body;

    // Check Employee
    const emp = await Employee.findById(employee);

    if (!emp) {
        throw new ApiError(404, "Employee Not Found");
    }

    // Check Duplicate Payroll
    const existingPayroll = await Payroll.findOne({
        employee,
        month,
        year,
    });

    if (existingPayroll) {
        throw new ApiError(400, "Payroll Already Generated");
    }

    const basicSalary = emp.salary;

    const netSalary =
        basicSalary +
        (bonus || 0) -
        (deduction || 0);

    const payroll = await Payroll.create({

        employee,
        month,
        year,
        basicSalary,
        bonus,
        deduction,
        netSalary,

    });

    res.status(201).json({

        success: true,
        message: "Payroll Generated Successfully",
        payroll,

    });

});

// Get Payroll
const APIFeatures = require("../utils/apiFeatures");

const getPayroll = asyncHandler(async (req, res) => {

    const resultPerPage = 5;
    const totalPayroll = await Payroll.countDocuments();
    const apiFeatures = new APIFeatures(
        Payroll.find()
            .populate(
                "employee",
                "fullName department designation"
            ),
        req.query
    )
        .search()
        .filter()
        .sort()
        .paginate(resultPerPage);

    const payroll = await apiFeatures.query;

    res.status(200).json({
        success: true,
        totalPayroll,
        resultPerPage,
        currentPage: Number(req.query.page) || 1,
        count: payroll.length,
        payroll,
    });

});

// Mark Salary Paid
const markSalaryPaid = asyncHandler(async (req, res) => {

    const payroll = await Payroll.findByIdAndUpdate(

        req.params.id,

        {
            paymentStatus: "Paid",
        },

        {
            returnDocument: "after",
            runValidators: true,
        }

    ).populate(
        "employee",
        "fullName department"
    );

    if (!payroll) {
        throw new ApiError(404, "Payroll Not Found");
    }

    res.status(200).json({

        success: true,
        message: "Salary Paid Successfully",
        payroll,

    });

});

module.exports = {

    generatePayroll,
    getPayroll,
    markSalaryPaid,

};