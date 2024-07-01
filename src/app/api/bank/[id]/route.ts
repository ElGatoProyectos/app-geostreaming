import prisma from "@/lib/prisma";
import { validateBank } from "@/lib/validations/bank";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

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

  let data;
  data = await req.formData();

  const { file, bank, number, name, type } = Object.fromEntries(
    data.entries()
  ) as {
    file: File;
    bank: string;
    number: string;
    name: string;
    type: string;
  };

  const updateBank = {
    bank,
    number,
    name,
    type,
  };
  const validatedBank = validateBank(updateBank);
  let newBank;

  if (file) {
    newBank = await prisma.bank.update({
      where: { id: bank_id },
      data: validatedBank,
    });
    await prisma.$disconnect();
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const nameImage = "banks_" + newBank.id + ".png";
    const filePath = path.join(process.cwd(), `public/banks`, nameImage);
    await writeFile(filePath, buffer);
    return NextResponse.json(newBank);
  }

  try {
    newBank = await prisma.bank.update({
      where: { id: bank_id },
      data: validatedBank,
    });

    await prisma.$disconnect();
    return NextResponse.json(newBank);
  } catch (error) {
    return NextResponse.json({ error: "Error creating bank" }, { status: 500 });
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
