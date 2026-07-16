const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
{
    name:{
        type:String,
        required:true,
        trim:true
    },

    category:{
        type:String,
        required:true
    },

    description:{
        type:String
    },

    price:{
        type:Number,
        required:true
    },

    stock:{
        type:Number,
        default:0
    },

    status:{
        type:String,
        enum:["Available","Out Of Stock"],
        default:"Available"
    }

},
{
    timestamps:true
});

module.exports = mongoose.model("Product",productSchema);