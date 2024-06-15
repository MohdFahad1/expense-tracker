import dbConnect from "@/lib/dbConnect";
import BudgetModel from "@/models/Budget";

dbConnect();

export async function POST(NextRequest) {
  try {
    const body = await NextRequest.json();
    let { name, userId, emoji, amount } = body;

    if (!name || !userId || !amount) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Name, Amount & userId required",
        }),
        { status: 401 }
      );
    }

    name = name.trim().toLowerCase();

    const existingBudget = await BudgetModel.findOne({
      name,
    });

    if (existingBudget) {
      return new Response(
        JSON.stringify(
          {
            success: false,
            message: "Budget with this name already exist",
          },
          { status: 400 }
        )
      );
    }

    const newBudget = await BudgetModel.create({
      name,
      userId,
      emoji,
      amount,
    });

    return new Response(
      JSON.stringify({
        success: true,
        message: "Budget Created",
        newBudget,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error Creating Budget: ", error);

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
