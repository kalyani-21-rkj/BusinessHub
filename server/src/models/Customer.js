const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
            unique: true,
        },

        phone: {
            type: String,
            required: true,
        },

        company: {
            type: String,
        },

        address: {
            type: String,
        },

        status: {
            type: String,
            enum: ["Lead", "Customer", "Inactive"],
            default: "Lead",
        },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Customer", customerSchema);