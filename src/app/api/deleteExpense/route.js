import dbConnect from "@/lib/dbConnect";
import ExpenseModel from "@/models/Expense";

dbConnect();

export async function DELETE(NextRequest) {
  try {
    const { searchParams } = new URL(NextRequest.url);
    const expenseId = searchParams.get("expenseId");

    if (!expenseId) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "expenseId required",
        }),
        { status: 401 }
      );
    }

    const deletedExpense = await ExpenseModel.findByIdAndDelete(expenseId);

    if (!deletedExpense) {
      return new Response(
        JSON.stringify(
          {
            success: false,
            message: "Expense not found",
          },
          { status: 404 }
        )
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "Expense Deleted",
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
