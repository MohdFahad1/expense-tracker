import mongoose, { Schema } from "mongoose";

const ExpenseSchema = new Schema(
  {
    budgetId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Budget",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const ExpenseModel =
  mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);

export default ExpenseModel;
