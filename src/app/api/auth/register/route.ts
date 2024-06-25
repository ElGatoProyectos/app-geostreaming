import { UserModel } from "@/models/mysql/user-model";
import { UserService } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";
const userService = new UserService({ userModel: UserModel });

export async function POST(req: NextRequest) {
  try {
    const newUser = await userService.create({ req });
    return NextResponse.json(newUser);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error to Create user" },
      { status: 500 }
    );
  }
}
