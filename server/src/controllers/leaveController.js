const Leave = require("../models/Leave");
const asyncHandler = require("../utils/asyncHandler");
const ApiError = require("../utils/apiError");


const applyLeave = asyncHandler(async (req, res) => {

    const leave = await Leave.create(req.body);

    res.status(201).json({
        success: true,
        message: "Leave Applied Successfully",
        leave,
    });

});

const getLeaves = asyncHandler(async (req, res) => {

    const leaves = await Leave.find()
        .populate("employee", "fullName department designation");

    res.status(200).json({
        success: true,
        count: leaves.length,
        leaves,
    });

});

// Update Leave Status
const updateLeave = asyncHandler(async (req, res) => {

    console.log("Params:", req.params);
    console.log("Body:", req.body);

    const leave = await Leave.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            returnDocument: "after",
            runValidators: true,
        }
    ).populate("employee", "fullName department");

    if (!leave) {
        throw new ApiError(404, "Leave Request Not Found");
    }

    res.status(200).json({
        success: true,
        message: "Leave Updated Successfully",
        leave,
    });

});

module.exports = {
    applyLeave,
    getLeaves,
    updateLeave,
};