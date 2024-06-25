import prisma from "@/lib/prisma";
import { validateAccount } from "@/lib/validations/account";
import { validateBank } from "@/lib/validations/bank";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth-options";

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
    const session = await getServerSession(authOptions);
    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "forbidden" }, { status: 500 });
    }
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
