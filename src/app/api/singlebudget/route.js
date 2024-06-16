import dbConnect from "@/lib/dbConnect";
import BudgetModel from "@/models/Budget";

dbConnect();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const budgetId = searchParams.get("budgetId");

    if (!budgetId) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Budget ID must be provided",
        }),
        { status: 400 }
      );
    }

    const budgetData = await BudgetModel.findById(budgetId);

    if (!budgetData) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No Budget found",
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        budgetData,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Fetching Budgets: ", error);

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
