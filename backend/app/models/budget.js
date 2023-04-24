const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const budgetSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

const Budget = mongoose.model("Budget", budgetSchema);

module.exports = Budget;
