import dbConnect from "@/lib/dbConnect";
import BudgetModel from "@/models/Budget";

dbConnect();

export async function PUT(NextRequest) {
  try {
    const body = await NextRequest.json();
    const { name, amount, emoji, budgetId, userId } = body;

    if (!budgetId) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Budget ID must be provided",
        }),
        { status: 400 }
      );
    }

    const updatedBudget = await BudgetModel.findByIdAndUpdate(
      budgetId,
      {
        name,
        emoji,
        amount,
        userId,
      },
      { new: true }
    );

    if (!updatedBudget) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Budget not found",
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Budget Updated",
        updatedBudget,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Updating Budget: ", error);

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
