import prisma from "@/lib/prisma";
import { validateAdmin } from "@/lib/validations/admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const admins = await prisma.admin.findMany();
    await prisma.$disconnect();
    return NextResponse.json(admins);
  } catch (e) {
    return NextResponse.json({ error: "Error to get admins" }, { status: 404 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  try {
    const bankinfo = await req.json();
    const validatdeAdmin = validateAdmin(bankinfo);
    const newAdmin = await prisma.admin.create({
      data: validatdeAdmin,
    });
    await prisma.$disconnect();
    return NextResponse.json(newAdmin);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error to create admin" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
