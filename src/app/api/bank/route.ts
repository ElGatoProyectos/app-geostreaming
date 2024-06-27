import prisma from "@/lib/prisma";
import { validateBank } from "@/lib/validations/bank";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const banks = await prisma.bank.findMany();
    return NextResponse.json(banks);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching banks" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  let bankinfo;
  let bankvalidated;

  try {
    bankinfo = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    bankvalidated = validateBank(bankinfo);
  } catch (error) {
    return NextResponse.json({ error: "Validation error" }, { status: 400 });
  }

  try {
    const newBank = await prisma.bank.create({
      data: bankvalidated,
    });
    return NextResponse.json(newBank);
  } catch (error) {
    return NextResponse.json({ error: "Error creating bank" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
