import prisma from "@/lib/prisma";
import { validateUpdateAdmin } from "@/lib/validations/admin";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin_id = Number(params.id);
    const foundAdmin = await prisma.admin.findUnique({
      where: { id: admin_id },
    });
    return NextResponse.json(foundAdmin);
  } catch (e) {
    return NextResponse.json({ error: "Error to get admin" }, { status: 404 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin_id = Number(params.id);
    const adminInfo = await req.json();
    const validatedAdmin = validateUpdateAdmin(adminInfo);
    const updatedAdmin = await prisma.admin.update({
      where: { id: admin_id },
      data: validatedAdmin,
    });

    return NextResponse.json(updatedAdmin);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error to update admin" },
      { status: 404 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const admin_id = Number(params.id);
    await prisma.admin.delete({
      where: { id: admin_id },
    });

    return NextResponse.json({ message: "deleted admin" });
  } catch (e) {
    return NextResponse.json(
      { error: "Error to delete admin" },
      { status: 404 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
