import prisma from "@/lib/prisma";
import { validateBank } from "@/lib/validations/bank";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

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

  const update = {
    bank,
    number,
    name,
    type,
  };
  const validatedBank = validateBank(update);
  let newBank;

  if (file) {
    newBank = await prisma.bank.create({
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
    newBank = await prisma.bank.create({
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
