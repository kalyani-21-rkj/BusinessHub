const Lead = require("../models/Lead");
const ApiError = require("../utils/apiError");
const asyncHandler = require("../utils/asyncHandler");

// Create Lead
const createLead = asyncHandler(async (req, res) => {

    const lead = await Lead.create(req.body);

    res.status(201).json({
        success: true,
        message: "Lead Created Successfully",
        lead,
    });

});

// Get All Leads
const APIFeatures = require("../utils/apiFeatures");

const getLeads = asyncHandler(async (req, res) => {

    const resultPerPage = 5;
    const totalLeads = await Lead.countDocuments();
    const apiFeatures = new APIFeatures(
        Lead.find()
            .populate("customer")
            .populate("assignedTo"),
        req.query
    )
        .search()
        .filter()
        .sort()
        .paginate(resultPerPage);

    const leads = await apiFeatures.query;

    res.status(200).json({
        success: true,
        totalLeads,
        resultPerPage,
        currentPage: Number(req.query.page) || 1,
        count: leads.length,
        leads,
    });

});

// Update Lead
const updateLead = asyncHandler(async (req, res) => {

    const lead = await Lead.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            returnDocument: "after",
            runValidators: true,
        }
    );

    if (!lead) {
        throw new ApiError(404, "Lead Not Found");
    }

    res.status(200).json({
        success: true,
        message: "Lead Updated Successfully",
        lead,
    });

});

module.exports = {
    createLead,
    getLeads,
    updateLead,
};