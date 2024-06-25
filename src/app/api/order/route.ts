import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth-options";
import { NextApiRequest, NextApiResponse } from "next";
import { signIn } from "next-auth/react";

export async function GET(req: NextRequest, params: { id: string }) {
  try {
    // const newUser = await userService.create({ req });
    return NextResponse.json("data de la orden");
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error to Create user" },
      { status: 500 }
    );
  }
}
