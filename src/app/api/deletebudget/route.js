import dbConnect from "@/lib/dbConnect";
import BudgetModel from "@/models/Budget";

dbConnect();

export async function DELETE(NextRequest) {
  try {
    const { searchParams } = new URL(NextRequest.url);
    const budgetId = searchParams.get("budgetId");

    if (!budgetId) {
      console.error("No budgetId provided");
      return new Response(
        JSON.stringify({
          success: false,
          message: "budgetId required",
        }),
        { status: 401 }
      );
    }

    const deletedBudget = await BudgetModel.findByIdAndDelete(budgetId);

    if (!deletedBudget) {
      console.error("No budget found with ID:", budgetId);
      return new Response(
        JSON.stringify(
          {
            success: false,
            message: "Budget not found",
          },
          { status: 404 }
        )
      );
    }

    console.log("Budget deleted successfully:", deletedBudget);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Budget Deleted",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error Deleting Expense: ", error);

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
