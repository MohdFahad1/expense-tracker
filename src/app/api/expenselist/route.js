import dbConnect from "@/lib/dbConnect";
import ExpenseModel from "@/models/Expense";

dbConnect();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const budgetId = searchParams.get("budgetId");

    if (!budgetId) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Budget Id must be provided",
        }),
        { status: 400 }
      );
    }

    const expenses = await ExpenseModel.find({ budgetId });

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
