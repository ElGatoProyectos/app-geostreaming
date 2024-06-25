import prisma from "@/lib/prisma";
import { validateBank } from "@/lib/validations/bank";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const banks = await prisma.bank.findMany();
    return NextResponse.json(banks);
  } catch (e) {
    return NextResponse.json({ error: "Error to get banks" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  try {
    const bankinfo = await req.json();
    const bankvalidated = validateBank(bankinfo);
    const newBank = await prisma.bank.create({
      data: bankvalidated,
    });
    return NextResponse.json(newBank);
  } catch (e) {
    return NextResponse.json(
      { error: "Error to create bank" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
