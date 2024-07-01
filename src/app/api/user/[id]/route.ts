import prisma from "@/lib/prisma";
import { validateUpdateUser } from "@/lib/validations/user";
import { UserModel } from "@/models/mysql/user-model";
import { UserService } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

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
  let data;
  try {
    data = await req.formData();

    const {
      file,
      email,
      password,
      ref_id,
      full_name,
      dni,
      phone,
      country_code,
      role,
    } = Object.fromEntries(data.entries()) as {
      file: File;
      email: string;
      password: string;
      ref_id: string;
      full_name: string;
      dni: string;
      phone: string;
      country_code: string;
      role: string;
    };

    const updateUser = {
      email: email,
      role: role,
      password: password,
      ref_id: Number(ref_id),
      full_name: full_name,
      dni: dni,
      phone: phone,
      country_code: country_code,
    };

    const user_id = Number(params.id);
    const validatedUser = validateUpdateUser(updateUser);

    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const nameImage = "user_" + user_id + ".png";
      const filePath = path.join(process.cwd(), `public/users`, nameImage);
      await writeFile(filePath, buffer);

      console.log("filePath", filePath);

      const userUpdate = await prisma.user.update({
        where: { id: Number(params.id) },
        data: { ...validatedUser },
      });

      return NextResponse.json(userUpdate);
    }
    const userUpdate = await prisma.user.update({
      where: { id: Number(params.id) },
      data: { ...validatedUser },
    });

    return NextResponse.json(userUpdate);
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
    return NextResponse.json({ message: "deleted user" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error to delete user" },
      { status: 404 }
    );
  }
}
