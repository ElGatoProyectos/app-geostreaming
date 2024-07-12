import prisma from "@/lib/prisma";
import { validateAccount } from "@/lib/validations/account";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth-options";

export async function GET() {
  let accounts;

  try {
    accounts = await prisma.account.findMany();
  } catch (e) {
    return NextResponse.json(
      { error: "Error fetching accounts" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }

  return NextResponse.json(accounts);
}

export async function POST(req: NextRequest) {
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

  let accountInfo;

  try {
    accountInfo = await req.json();
    console.log(accountInfo)
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  // let validatedAccount;

  // try {
  //   validatedAccount = validateAccount(accountInfo);
  // } catch (error) {
  //   console.log(error)
  //   return NextResponse.json({ error: "Validation error" }, { status: 400 });
  // }

  let newAccount;

  try {
    newAccount = await prisma.account.create({
      data: accountInfo,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating account" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }

  return NextResponse.json(newAccount);
}
