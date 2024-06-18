import dbConnect from "@/lib/dbConnect";
import ExpenseModel from "@/models/Expense";

dbConnect();

export async function GET(req) {
  try {
    const expenses = await ExpenseModel.find({});

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
