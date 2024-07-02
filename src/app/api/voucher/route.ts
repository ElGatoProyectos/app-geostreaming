import prisma from "@/lib/prisma";
import { validateVoucher } from "@/lib/validations/voucher";
import path from "path";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const vouchers = await prisma.voucher.findMany();
    await prisma.$disconnect();
    return NextResponse.json(vouchers);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error fetching vouchers", message: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  try {
    let data;
    data = await req.formData();

    const { file, number, value, date, user_id, status } = Object.fromEntries(
      data.entries()
    ) as {
      file: File;
      number: string;
      value: string;
      date: string;
      user_id: string;
      status: "READ" | "UNREAD";
    };

    const updateUser: any = {
      number,
      value,
      date,
      user_id,
      status,
    };
    console.log(updateUser);
    /*  const validatedVoucher = validateVoucher(updateUser); */
    let newVoucher;
    if (file) {
      newVoucher = await prisma.voucher.create({
        data: updateUser,
      });
      await prisma.$disconnect();
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const nameImage = "vouchers_" + newVoucher.id + ".png";
      const filePath = path.join(process.cwd(), `public/vouchers`, nameImage);
      await writeFile(filePath, buffer);
      return NextResponse.json(newVoucher);
    }

    newVoucher = await prisma.voucher.create({
      data: updateUser,
    });
    await prisma.$disconnect();

    return NextResponse.json(newVoucher);
  } catch (error: any) {
    console.error("Error creating voucher:", error.message, error.stack);
    return NextResponse.json(
      { error: "Error creating voucher", message: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
