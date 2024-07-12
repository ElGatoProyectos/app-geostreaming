import prisma from "@/lib/prisma";
import { validateAccount } from "@/lib/validations/account";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth-options";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  let account_id;
  let foundAccount;

  try {
    account_id = Number(params.id);
    if (isNaN(account_id)) {
      return NextResponse.json(
        { error: "Invalid account ID" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing account ID" },
      { status: 400 }
    );
  }

  try {
    foundAccount = await prisma.account.findUnique({
      where: { id: account_id },
    });
    if (!foundAccount) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching account" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }

  return NextResponse.json(foundAccount);
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
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let account_id;

  try {
    account_id = Number(params.id);
    if (isNaN(account_id)) {
      return NextResponse.json(
        { error: "Invalid account ID" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing account ID" },
      { status: 400 }
    );
  }

  let account_info;

  try {
    account_info = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // let validatedAccount;

  // try {
  //   validatedAccount = validateAccount(account_info);
  // } catch (error) {
  //   return NextResponse.json({ error: "Validation error" }, { status: 400 });
  // }

  let updatedAccount;

  try {
    updatedAccount = await prisma.account.update({
      where: { id: account_id },
      data: account_info,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating account" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }

  return NextResponse.json(updatedAccount);
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

  let account_id;

  try {
    account_id = Number(params.id);
    if (isNaN(account_id)) {
      return NextResponse.json(
        { error: "Invalid account ID" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing account ID" },
      { status: 400 }
    );
  }

  try {
    await prisma.account.delete({
      where: { id: account_id },
    });
    return NextResponse.json({ message: "Deleted account" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting account" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
