const mongoose = require("mongoose");

const leadSchema = new mongoose.Schema(
{
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customer",
        required: true,
    },

    assignedTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee",
        required: true,
    },

    source: {
        type: String,
        enum: ["Website", "Facebook", "Instagram", "Referral", "Walk-in"],
        default: "Website",
    },

    status: {
        type: String,
        enum: [
            "New",
            "Contacted",
            "Qualified",
            "Lost",
            "Won"
        ],
        default: "New",
    },

    notes: {
        type: String,
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Lead", leadSchema);