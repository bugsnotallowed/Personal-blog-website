const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true },
    subCategory: { type: [String], default: [] },
    description: { type: String, required: true },
    authorName: { type: String, required: true },
    authorAvatar: { type: String, default: "" },
    cover: { type: String, default: "" },
  },
  { timestamps: true } // adds createdAt & updatedAt automatically
);

module.exports = mongoose.model("Blog", blogSchema);
