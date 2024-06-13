import { NextResponse } from "next/server";
import { jwtVerify } from "jose";

export default async function middleware(req) {
  try {
    const token = req.headers.get("Authorization")?.replace("Bearer ", "");

    console.log("Token: ", token);

    if (!token) {
      // return NextResponse.redirect(new URL("/", req.url));
      return new NextResponse("Invalid Token", {
        status: 401,
      });
    }

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    console.log("Decoded Token: ", payload);

    return new NextResponse("Authorized Successfully", {
      status: 200,
    });
  } catch (error) {
    console.error("Error: ", error);
    return new NextResponse("Error in Middleware", {
      status: 401,
    });
  }
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
