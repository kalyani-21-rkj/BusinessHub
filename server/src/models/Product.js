const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    brand: {
      type: String,
      required: true,
      trim: true,
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    sku: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    supplier: {
      type: String,
      required: true,
      trim: true,
    },

    purchasePrice: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },

    image: {
    type: String,
    default: "",
   
    
},

    description: {
      type: String,
      trim: true,
      default: "",
    },

    status: {
      type: String,
      enum: ["Available", "Out Of Stock"],
      default: "Available",
    },
    sellingPrice: {
    type: Number,
    required: true,
    min: 0,
},
  },
  {
    timestamps: true,
  }
);

productSchema.pre("save", function () {
  if (this.stock <= 0) {
    this.status = "Out Of Stock";
  } else {
    this.status = "Available";
  }

  
});

module.exports = mongoose.model("Product", productSchema);