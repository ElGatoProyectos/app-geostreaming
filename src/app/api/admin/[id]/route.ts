import prisma from "@/lib/prisma";
import { validateUpdateAdmin } from "@/lib/validations/admin";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth-options";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  let admin_id;

  try {
    admin_id = Number(params.id);
    if (isNaN(admin_id)) {
      return NextResponse.json({ error: "Invalid admin ID" }, { status: 400 });
    }
  } catch (e) {
    return NextResponse.json(
      { error: "Error processing admin ID" },
      { status: 400 }
    );
  }

  let foundAdmin;

  try {
    foundAdmin = await prisma.admin.findUnique({
      where: { id: admin_id },
    });
    if (!foundAdmin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }
  } catch (e) {
    return NextResponse.json(
      { error: "Error fetching admin" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }

  return NextResponse.json(foundAdmin);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  let session;

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

  let admin_id;

  try {
    admin_id = Number(params.id);
    if (isNaN(admin_id)) {
      return NextResponse.json({ error: "Invalid admin ID" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing admin ID" },
      { status: 400 }
    );
  }

  let adminInfo;

  try {
    adminInfo = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  let validatedAdmin;

  try {
    validatedAdmin = validateUpdateAdmin(adminInfo);
  } catch (error) {
    return NextResponse.json({ error: "Validation error" }, { status: 400 });
  }

  let updatedAdmin;

  try {
    updatedAdmin = await prisma.admin.update({
      where: { id: admin_id },
      data: validatedAdmin,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating admin" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }

  return NextResponse.json(updatedAdmin);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  let session;

  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching session" },
      { status: 500 }
    );
  }

  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let admin_id;

  try {
    admin_id = Number(params.id);
    if (isNaN(admin_id)) {
      return NextResponse.json({ error: "Invalid admin ID" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing admin ID" },
      { status: 400 }
    );
  }

  try {
    await prisma.admin.delete({
      where: { id: admin_id },
    });
    return NextResponse.json({ message: "Deleted admin" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting admin" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
