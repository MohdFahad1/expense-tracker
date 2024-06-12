import mongoose, { Schema } from "mongoose";

const BudgetSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    emoji: {
      type: String,
    },
    amount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const BudgetModel =
  mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);

export default BudgetModel;
