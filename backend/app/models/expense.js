const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const expenseSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    invoicePdf: {
      type: String,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    deletedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

// mongoose delete

const mongoose_delete = require("mongoose-delete");
expenseSchema.plugin(require("mongoose-delete"), { overrideMethods: true });
const Expense = mongoose.model("Expense", expenseSchema);

module.exports = Expense;
