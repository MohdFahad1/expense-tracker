import dbConnect from "@/lib/dbConnect";
import BudgetModel from "@/models/Budget";

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

    const budgets = await BudgetModel.find({ userId });

    if (!budgets || budgets.length === 0) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "No budgets found",
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        budgets,
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
