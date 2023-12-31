const mongoose = require("mongoose");

const friendSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  receiver: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
  Status: {
    type: String,
    enum: ["Pending", "Accepted", "Rejected"],
    default: "Pending",
    required: true,
  },
});

module.exports = mongoose.model("Friends", friendSchema);
