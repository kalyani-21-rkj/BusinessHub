const Payroll = require("../models/Payroll");
const APIFeatures = require("../utils/apiFeatures");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");

// ======================================
// Create Payroll
// ======================================
const  generatePayroll = asyncHandler(async (req, res) => {
    const payroll = await Payroll.create(req.body);

    res.status(201).json({
        success: true,
        message: "Payroll Created Successfully",
        payroll,
    });
});

// ======================================
// Get All Payroll
// ======================================
const getPayrolls = asyncHandler(async (req, res) => {

    const resultPerPage = 10;

    const totalPayrolls = await Payroll.countDocuments();

    let query = Payroll.find()
        .sort({ createdAt: -1 })
        .populate(
        "employee",
        "fullName department designation"
    );

    if (req.query.search) {
        query = query.populate({
            path: "employee",
            match: {
                fullName: {
                    $regex: req.query.search,
                    $options: "i",
                },
            },
        });
    }

    const apiFeatures = new APIFeatures(query, req.query)
        .filter()
        .sort()
        .paginate(resultPerPage);

    let payrolls = await apiFeatures.query;

    payrolls = payrolls.filter((item) => item.employee);

    res.status(200).json({
        success: true,
        totalPayrolls,
        resultPerPage,
        currentPage: Number(req.query.page) || 1,
        count: payrolls.length,
        payrolls,
    });
});

// ======================================
// Get Payroll By Id
// ======================================
const getPayrollById = asyncHandler(async (req, res) => {

    const payroll = await Payroll.findById(req.params.id).populate(
        "employee",
        "fullName department designation"
    );

    if (!payroll) {
        throw new ApiError(404, "Payroll Not Found");
    }

    res.status(200).json({
        success: true,
        payroll,
    });
});

// ======================================
// Update Payroll
// ======================================
const updatePayroll = asyncHandler(async (req, res) => {

    const payroll = await Payroll.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
            runValidators: true,
        }
    );

    if (!payroll) {
        throw new ApiError(404, "Payroll Not Found");
    }

    res.status(200).json({
        success: true,
        message: "Payroll Updated Successfully",
        payroll,
    });
});

// ======================================
// Delete Payroll
// ======================================
const deletePayroll = asyncHandler(async (req, res) => {

    const payroll = await Payroll.findByIdAndDelete(req.params.id);

    if (!payroll) {
        throw new ApiError(404, "Payroll Not Found");
    }

    res.status(200).json({
        success: true,
        message: "Payroll Deleted Successfully",
    });
});

// ======================================
// Payroll Statistics
// ======================================
const getPayrollStats = asyncHandler(async (req, res) => {

    const totalPayrolls = await Payroll.countDocuments();

    const paid = await Payroll.countDocuments({
        paymentStatus: "Paid",
    });

    const pending = await Payroll.countDocuments({
        paymentStatus: "Pending",
    });

    const totalSalary = await Payroll.aggregate([
        {
            $group: {
                _id: null,
                total: {
                    $sum: "$netSalary",
                },
            },
        },
    ]);

    res.status(200).json({
        success: true,
        stats: {
            totalPayrolls,
            paid,
            pending,
            totalSalary:
                totalSalary.length > 0
                    ? totalSalary[0].total
                    : 0,
        },
    });
});

const PDFDocument = require("pdfkit");

const downloadPayslip = asyncHandler(async (req, res) => {

    const payroll = await Payroll.findById(req.params.id)
        .populate(
            "employee",
            "fullName department designation"
        );

    if (!payroll) {
        throw new ApiError(404, "Payroll Not Found");
    }

    const doc = new PDFDocument();

    res.setHeader(
        "Content-Type",
        "application/pdf"
    );

    res.setHeader(
        "Content-Disposition",
        `attachment; filename=payslip-${payroll.employee.fullName}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(22).text("BusinessHub Payslip", {
        align: "center",
    });

    doc.moveDown();

    doc.fontSize(14).text(`Employee : ${payroll.employee.fullName}`);
    doc.text(`Department : ${payroll.employee.department}`);
    doc.text(`Designation : ${payroll.employee.designation}`);
    doc.text(`Month : ${payroll.month}`);
    doc.text(`Year : ${payroll.year}`);

    doc.moveDown();

    doc.text(`Basic Salary : Rs. ${payroll.basicSalary}`);
doc.text(`HRA : Rs. ${payroll.hra}`);
doc.text(`DA : Rs. ${payroll.da}`);
doc.text(`Bonus : Rs. ${payroll.bonus}`);
doc.text(`Deduction : Rs. ${payroll.deduction}`);
doc.text(`Net Salary : Rs. ${payroll.netSalary}`);

    doc.moveDown();

    doc.text(`Status : ${payroll.paymentStatus}`);

    doc.end();
});

module.exports = {
    generatePayroll,
    getPayrolls,
    getPayrollById,
    updatePayroll,
    deletePayroll,
    getPayrollStats,
    downloadPayslip,
};