const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, unique: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
    type: { type: String, required: true },
    rating: { type: Number, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);
const Document = mongoose.model("Document", documentSchema);
module.exports = Document;
