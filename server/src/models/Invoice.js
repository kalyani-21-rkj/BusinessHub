const mongoose = require("mongoose");

const invoiceSchema = new mongoose.Schema(
{
    customer:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Customer",
        required:true,
    },

    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref:"Product",
                required:true,
            },

            quantity:{
                type:Number,
                required:true,
            },

            price:{
                type:Number,
                required:true,
            }
        }
    ],

    totalAmount:{
        type:Number,
        default:0,
    },

    paymentStatus:{
        type:String,
        enum:["Pending","Paid"],
        default:"Pending",
    }

},
{
    timestamps:true,
});

module.exports = mongoose.model("Invoice", invoiceSchema);