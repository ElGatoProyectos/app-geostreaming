import prisma from "@/lib/prisma";
import { validateUpdateBank } from "@/lib/validations/bank";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bank_id = Number(params.id);
    const foundBank = await prisma.bank.findUnique({
      where: { id: bank_id },
    });
    return NextResponse.json(foundBank);
  } catch (e) {
    return NextResponse.json({ error: "Error to get bank" }, { status: 404 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const bank_id = Number(params.id);
    const bankinfo = await req.json();
    const bankvalidated = validateUpdateBank(bankinfo);
    const updatedBank = await prisma.bank.update({
      where: { id: bank_id },
      data: bankvalidated,
    });

    return NextResponse.json(updatedBank);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error to update bank" },
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
    const bank_id = Number(params.id);
    await prisma.bank.delete({
      where: { id: bank_id },
    });

    return NextResponse.json({ message: "deleted bank" });
  } catch (e) {
    return NextResponse.json(
      { error: "Error to delete bank" },
      { status: 404 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
