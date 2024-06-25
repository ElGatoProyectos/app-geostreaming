import prisma from "@/lib/prisma";
import { validateUpdateAccount } from "@/lib/validations/account";
import { validateUpdateBank } from "@/lib/validations/bank";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const account_id = Number(params.id);
    const foundAccount = await prisma.account.findUnique({
      where: { id: account_id },
    });
    return NextResponse.json(foundAccount);
  } catch (e) {
    return NextResponse.json(
      { error: "Error to get account" },
      { status: 404 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const account_id = Number(params.id);
    const account_info = await req.json();
    const validatedAccount = validateUpdateAccount(account_info);
    const updatedAccount = await prisma.account.update({
      where: { id: account_id },
      data: validatedAccount,
    });

    return NextResponse.json(updatedAccount);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error to update account" },
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
    const account_id = Number(params.id);
    await prisma.account.delete({
      where: { id: account_id },
    });

    return NextResponse.json({ message: "deleted account" });
  } catch (e) {
    return NextResponse.json(
      { error: "Error to delete account" },
      { status: 404 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
