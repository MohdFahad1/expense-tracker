import UserModel from "@/models/User";
import { comparePassword } from "@/helpers/authHelper";
import dbConnect from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

dbConnect();

export async function POST(NextRequest) {
  try {
    const body = await NextRequest.json();
    const { email, password } = body;

    if (!email || !password) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email and Password is required",
        }),
        { status: 401 }
      );
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      return new Response(
        JSON.stringify(
          {
            success: false,
            message: "Email not registered",
          },
          { status: 400 }
        )
      );
    }

    const validPassword = await comparePassword(password, user.password);

    if (!validPassword) {
      return new Response(
        JSON.stringify(
          {
            success: false,
            message: "Incorrect Password",
          },
          { status: 400 }
        )
      );
    }

    const tokenData = {
      username: user.username,
      id: user._id,
    };

    const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, {
      expiresIn: "7d",
    });

    const response = NextResponse.json({ message: "Login Successfull" });

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error) {
    console.error("Error in Logging: ", error);

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
