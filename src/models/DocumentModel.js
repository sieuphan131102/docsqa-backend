const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    author: { type: String, required: true },
    image: { type: String, required: true },
    data: { type: String, required: true },
    type: { type: String, required: true },
    description: { type: String, required: true },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    down: { type: Number, default: 0 },
    view: { type: Number, default: 0 },
    price: { type: Number, default: 0 },
  },
  {
    timestamps: true,
  }
);

const Document = mongoose.model("Document", documentSchema);
module.exports = Document;
