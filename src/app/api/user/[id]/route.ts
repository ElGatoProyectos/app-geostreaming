import { UserModel } from "@/models/mysql/user-model";
import { UserService } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";

const userService = new UserService({ userModel: UserModel });

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await userService.getById({ params });
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: "Error to get user" }, { status: 404 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await userService.update({ req, params });
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error to update user" },
      { status: 404 }
    );
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await userService.delete({ params });
    return NextResponse.json({ message: "Delete product" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error to delete user" },
      { status: 404 }
    );
  }
}
