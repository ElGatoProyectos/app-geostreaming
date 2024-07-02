import prisma from "@/lib/prisma";
import { validateAdmin } from "@/lib/validations/admin";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth-options";
import bcrypt from "bcrypt";

export async function GET() {
  let admins;

  try {
    admins = await prisma.admin.findMany();
    await prisma.$disconnect();
  } catch (e) {
    return NextResponse.json(
      { error: "Error fetching admins" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }

  return NextResponse.json(admins);
}

export async function POST(req: NextRequest) {
  let session;
  let newAdmin;

  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching session" },
      { status: 500 }
    );
  }

  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  let adminInfo;
  try {
    adminInfo = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  let validatdeAdmin;

  try {
    validatdeAdmin = validateAdmin(adminInfo);
  } catch (error) {
    return NextResponse.json({ error: "Validation error" }, { status: 400 });
  }

  const newPass = await bcrypt.hash(validatdeAdmin.password, 10);

  const { password, ...rest } = validatdeAdmin;

  const newAdminn = {
    ...rest,
    password: newPass,
  };

  try {
    newAdmin = await prisma.admin.create({
      data: newAdminn,
    });
    await prisma.$disconnect();
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating admin" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }

  return NextResponse.json(newAdmin);
}
