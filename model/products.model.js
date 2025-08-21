const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    productName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
    },
    price: {
      type: Number,
    },
    description: {
      type: String,
    },
    productImage: {
      type: String,
    },
    productImageID: {
      type: String,
    },

    productOwner: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "users",
      },
    ],
  },
  { timestamps: true }
);

const productModel = mongoose.model("products", productSchema);
module.exports = productModel;
