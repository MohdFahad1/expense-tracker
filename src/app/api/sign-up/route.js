import UserModel from "@/models/User";
import { hashPassword } from "@/helpers/authHelper";
import dbConnect from "@/lib/dbConnect";

export async function POST(req) {
  await dbConnect();

  try {
    const { username, email, password } = await req.json();

    if (!username) {
      return new Response(
        JSON.stringify({ success: false, message: "Username is required" }),
        {
          status: 404,
        }
      );
    }
    if (!email) {
      return new Response(
        JSON.stringify({ success: false, message: "Email is required" }),
        {
          status: 404,
        }
      );
    }
    if (!password) {
      return new Response(
        JSON.stringify({ success: false, message: "Password is required" }),
        {
          status: 404,
        }
      );
    }

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Email already registered",
        }),
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new UserModel({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return new Response(
      JSON.stringify({
        success: true,
        message: "User registered successfully",
        user: newUser,
      }),
      { status: 201 }
    );
  } catch (error) {
    console.error("Error registering user: ", error);

    return new Response(
      JSON.stringify({
        success: false,
        message: "Something went wrong while registering user",
        error: error.message,
      }),
      { status: 500 }
    );
  }
}
