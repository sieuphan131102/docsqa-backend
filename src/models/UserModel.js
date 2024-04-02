const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    fullName: { type: String, default: "" },
    isAdmin: { type: Boolean, default: false },
    email: { type: String, default: "" },
    address: { type: String, default: "" },
    avatar: { type: String, default: "" },
    coin: { type: Number, default: 0 },
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
    readingHistory: [
      {
        bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
        date: { type: Date, default: Date.now },
      },
    ],
    paymentHistory: [
      {
        bookId: { type: mongoose.Schema.Types.ObjectId, ref: "Document" },
        date: { type: Date, default: Date.now },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
