const mongoose = require("mongoose");

const claimSchema = new mongoose.Schema({
  itemId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Item",
    required: true,
  },
  claimantId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  responses: [
    {
      questionId: {
        type: String,
        required: true,
      },
      response: {
        type: String,
        required: true,
      },
    },
  ],
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Claim", claimSchema);
