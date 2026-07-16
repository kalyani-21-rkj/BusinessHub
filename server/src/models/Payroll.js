const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema(
{
    employee:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Employee",
        required:true
    },

    month:{
        type:String,
        required:true
    },

    year:{
        type:Number,
        required:true
    },

    basicSalary:{
        type:Number,
        required:true
    },

    bonus:{
        type:Number,
        default:0
    },

    deduction:{
        type:Number,
        default:0
    },

    netSalary:{
        type:Number
    },

    paymentStatus:{
        type:String,
        enum:["Pending","Paid"],
        default:"Pending"
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Payroll", payrollSchema);