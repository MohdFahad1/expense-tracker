import dbConnect from "@/lib/dbConnect";
import ExpenseModel from "@/models/Expense";

dbConnect();

export async function POST(NextRequest) {
  try {
    const body = await NextRequest.json();
    let { name, amount, budgetId } = body;

    if (!name || !budgetId || !amount) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Name, Amount &  BudgetId required",
        }),
        { status: 401 }
      );
    }

    name = name.trim().toLowerCase();

    const existingExpense = await ExpenseModel.findOne({
      name,
    });

    if (existingExpense) {
      return new Response(
        JSON.stringify(
          {
            success: false,
            message: "Expense with this name already exist",
          },
          { status: 400 }
        )
      );
    }

    const newExpense = await ExpenseModel.create({
      name,
      amount,
      budgetId,
    });

    newExpense.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "New Expense Created",
        newExpense,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error Creating Expense: ", error);

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
