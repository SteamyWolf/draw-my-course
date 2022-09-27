const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    image: { type: String },
    type: { type: String, enum: ["digital", "physical"] },
  },
  { timeStamps: true }
);

module.exports = mongoose.model("Product", ProductSchema);
