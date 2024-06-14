import UserModel from "@/models/User";
import { comparePassword } from "@/helpers/authHelper";
import dbConnect from "@/lib/dbConnect";
import JWT from "jsonwebtoken";

export async function POST(req) {
  await dbConnect();

  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Invalid Email or Password",
        }),
        {
          status: 404,
        }
      );
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return new Response(
        JSON.stringify(
          {
            success: false,
            message: "Email is not Registered",
          },
          { status: 404 }
        )
      );
    }

    const match = await comparePassword(password, user.password);

    if (!match) {
      return new Response(
        JSON.stringify(
          {
            success: false,
            message: "Incorrect Password",
          },
          { status: 200 }
        )
      );
    }

    //token
    const token = await JWT.sign(
      { _id: user._id },
      process.env.NEXT_PUBLIC_JWT_SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );

    return new Response(
      JSON.stringify({
        success: true,
        message: "Login Successfull",
        user: {
          username: user.username,
          email: user.email,
        },
        token,
      })
    );
  } catch (error) {
    console.error("Error registering user: ", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Error in logging",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
