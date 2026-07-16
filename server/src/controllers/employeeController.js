const APIFeatures = require("../utils/apiFeatures");
const Employee = require("../models/Employee");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");

const addEmployee = async (req, res) => {
    try {
        const employee = await Employee.create(req.body);

        res.status(201).json({
            success: true,
            message: "Employee Added Successfully",
            employee,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getEmployees = asyncHandler(async (req, res) => {

    const resultPerPage = 5;

    const totalEmployees = await Employee.countDocuments();

    const apiFeatures = new APIFeatures(
        Employee.find(),
        req.query
    )
        .search()
        .filter()
        .sort()
        .paginate(resultPerPage);

    const employees = await apiFeatures.query;

    res.status(200).json({
        success: true,
        totalEmployees,
        resultPerPage,
        currentPage: Number(req.query.page) || 1,
        count: employees.length,
        employees,
    });

});

const getEmployeeStats = asyncHandler(async (req, res) => {

    const totalEmployees = await Employee.countDocuments();

    const activeEmployees = await Employee.countDocuments({
        status: "Active",
    });

    const inactiveEmployees = await Employee.countDocuments({
        status: "Inactive",
    });

    const departments = await Employee.distinct("department");

    res.status(200).json({
        success: true,
        stats: {
            totalEmployees,
            activeEmployees,
            inactiveEmployees,
            totalDepartments: departments.length,
        },
    });

});
const getEmployeeById = asyncHandler(async (req, res) => {

    const employee = await Employee.findById(req.params.id);
    if (!employee) {
        throw new ApiError(404, "Employee Not Found");
}

    res.status(200).json({

        success: true,
        employee,

    });

});

const updateEmployee = async (req, res) => {
    try {

        const employee = await Employee.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                returnDocument: "after",
                runValidators: true,
            }
        );

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Employee Updated Successfully",
            employee,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const deleteEmployee = async (req, res) => {
    try {

        const employee = await Employee.findByIdAndDelete(req.params.id);

        if (!employee) {
            return res.status(404).json({
                success: false,
                message: "Employee Not Found",
            });
        }

        res.status(200).json({
            success: true,
            message: "Employee Deleted Successfully",
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    addEmployee,
    getEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee,
    getEmployeeStats,
};