import { UserModel } from "@/models/mysql/user-model";
import { UserService } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";

const userService = new UserService({ userModel: UserModel });

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const role = searchParams.get("role") as "USER" | "DISTRIBUTOR" | null;

  try {
    let users;
    if (role) {
      users = await userService.getAllByRole(role);
    } else {
      users = await userService.getAll();
    }
    return NextResponse.json({ users });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 }
    );
  }
}

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
