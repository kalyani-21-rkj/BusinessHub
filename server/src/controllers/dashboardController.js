const Employee = require("../models/Employee");
const Customer = require("../models/Customer");
const Lead = require("../models/Lead");

const getDashboard = async (req, res) => {
    try {

        const totalEmployees = await Employee.countDocuments();

        const totalCustomers = await Customer.countDocuments();

        const totalLeads = await Lead.countDocuments();

        const newLeads = await Lead.countDocuments({
            status: "New",
        });

        const wonLeads = await Lead.countDocuments({
            status: "Won",
        });

        const lostLeads = await Lead.countDocuments({
            status: "Lost",
        });

        res.status(200).json({
            success: true,
            dashboard: {
                totalEmployees,
                totalCustomers,
                totalLeads,
                newLeads,
                wonLeads,
                lostLeads,
            },
        });

    } catch (error) {

        res.status(500).json({
            success: false,
            message: error.message,
        });

    }
};

module.exports = {
    getDashboard,
};