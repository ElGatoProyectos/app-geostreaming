import prisma from "@/lib/prisma";
import { validateAccount } from "@/lib/validations/account";
import { validateBank } from "@/lib/validations/bank";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const accounts = await prisma.account.findMany();
    return NextResponse.json(accounts);
  } catch (e) {
    return NextResponse.json(
      { error: "Error to get accounts" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  try {
    const accountInfo = await req.json();
    const validatedAccount = validateAccount(accountInfo);
    const newAccount = await prisma.account.create({
      data: validatedAccount,
    });
    return NextResponse.json(newAccount);
  } catch (e) {
    return NextResponse.json(
      { error: "Error to create account" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
