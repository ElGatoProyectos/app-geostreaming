import prisma from "@/lib/prisma";
import { validateBank } from "@/lib/validations/bank";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  let bank_id;

  try {
    bank_id = Number(params.id);
    if (isNaN(bank_id)) {
      return NextResponse.json({ error: "Invalid bank ID" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing bank ID" },
      { status: 400 }
    );
  }

  try {
    const foundBank = await prisma.bank.findUnique({
      where: { id: bank_id },
    });
    if (!foundBank) {
      return NextResponse.json({ error: "Bank not found" }, { status: 404 });
    }
    return NextResponse.json(foundBank);
  } catch (error) {
    return NextResponse.json({ error: "Error fetching bank" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  let bank_id;
  let bankinfo;
  let bankvalidated;

  try {
    bank_id = Number(params.id);
    if (isNaN(bank_id)) {
      return NextResponse.json({ error: "Invalid bank ID" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing bank ID" },
      { status: 400 }
    );
  }

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
    const updatedBank = await prisma.bank.update({
      where: { id: bank_id },
      data: bankvalidated,
    });

    return NextResponse.json(updatedBank);
  } catch (error) {
    return NextResponse.json({ error: "Error updating bank" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  let bank_id;

  try {
    bank_id = Number(params.id);
    if (isNaN(bank_id)) {
      return NextResponse.json({ error: "Invalid bank ID" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing bank ID" },
      { status: 400 }
    );
  }

  try {
    await prisma.bank.delete({
      where: { id: bank_id },
    });

    return NextResponse.json({ message: "Deleted bank" });
  } catch (error) {
    return NextResponse.json({ error: "Error deleting bank" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}
