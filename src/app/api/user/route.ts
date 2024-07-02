import prisma from "@/lib/prisma";
import { validateUser } from "@/lib/validations/user";
import { UserModel } from "@/models/mysql/user-model";
import { UserService } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import bcrypt from "bcrypt";

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
    return NextResponse.json(users);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error fetching users" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    let data;
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
    const newPass = await bcrypt.hash(password, 10);
    const createUser = {
      email: email,
      role: role,
      password: newPass,
      ref_id: Number(ref_id),
      full_name: full_name,
      dni: dni,
      phone: phone,
      country_code: country_code,
    };

    const validatedUser = validateUser(createUser);

    if (file) {
      const newUser = await prisma.user.create({ data: validatedUser });
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const nameImage = "user_" + newUser.id + ".png";
      const filePath = path.join(process.cwd(), `public/users`, nameImage);
      await writeFile(filePath, buffer);
      await prisma.$disconnect();
      return NextResponse.json(newUser);
    }

    const newUser = prisma.user.create({ data: validatedUser });
    await prisma.$disconnect();
    return NextResponse.json(newUser);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error to Create user" },
      { status: 500 }
    );
  }
}
