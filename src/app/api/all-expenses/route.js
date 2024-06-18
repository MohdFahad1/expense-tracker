import dbConnect from "@/lib/dbConnect";
import ExpenseModel from "@/models/Expense";
import BudgetModel from "@/models/Budget";
import mongoose from "mongoose";

dbConnect();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "User ID must be provided",
        }),
        { status: 400 }
      );
    }

    const expenses = await ExpenseModel.aggregate([
      {
        $lookup: {
          from: "budgets",
          localField: "budgetId",
          foreignField: "_id",
          as: "budget",
        },
      },
      {
        $unwind: "$budget",
      },
      {
        $match: {
          "budget.userId": new mongoose.Types.ObjectId(userId),
        },
      },
    ]);

    if (!expenses || expenses.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No expenses found",
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        expenses,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Fetching Expenses: ", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Something went wrong",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
