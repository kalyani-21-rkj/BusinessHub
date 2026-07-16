const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
{
    invoice:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Invoice",
        required:true,
    },

    amount:{
        type:Number,
        required:true,
    },

    paymentMethod:{
        type:String,
        enum:[
            "Cash",
            "UPI",
            "Card",
            "Bank Transfer"
        ],
        required:true,
    },

    transactionId:{
        type:String,
        required:true,
        unique:true,
    },

    paymentDate:{
        type:Date,
        default:Date.now,
    }

},
{
    timestamps:true,
});

module.exports = mongoose.model("Payment", paymentSchema);