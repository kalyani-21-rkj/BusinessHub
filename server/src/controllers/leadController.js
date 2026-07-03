const Lead = require("../models/Lead");

const addLead = async (req, res) => {
    try {
        const lead = await Lead.create(req.body);

        res.status(201).json({
            success: true,
            message: "Lead Created Successfully",
            lead,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

const getLeads = async (req, res) => {
    try {

        const leads = await Lead.find()
            .populate("customer")
            .populate("assignedTo");

        res.status(200).json({
            success: true,
            count: leads.length,
            leads,
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

module.exports = {
    addLead,
    getLeads,
};