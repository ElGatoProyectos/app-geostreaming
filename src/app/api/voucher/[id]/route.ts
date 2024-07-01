import prisma from "@/lib/prisma";
import { validateVoucher } from "@/lib/validations/voucher";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const voucher_id = Number(params.id);
    const foundVoucher = await prisma.voucher.findUnique({
      where: { id: voucher_id },
    });
    prisma.$disconnect();
    return NextResponse.json(foundVoucher);
  } catch (e) {
    return NextResponse.json(
      { error: "Error to get voucher" },
      { status: 404 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  let voucher_id;

  try {
    voucher_id = Number(params.id);
    if (isNaN(voucher_id)) {
      return NextResponse.json(
        { error: "Invalid voucher ID" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing voucher ID" },
      { status: 400 }
    );
  }
  try {
    let data;
    data = await req.formData();

    const { file, number, value, date, user_id, country_code } =
      Object.fromEntries(data.entries()) as {
        file: File;
        number: string;
        value: string;
        date: string;
        user_id: string;
        country_code: string;
      };

    const updateUser = {
      number,
      value,
      date,
      user_id,
      country_code,
    };
    const validatedVoucher = validateVoucher(updateUser);
    let newVoucher;
    if (file) {
      newVoucher = await prisma.voucher.update({
        where: { id: voucher_id },
        data: validatedVoucher,
      });
      prisma.$disconnect();
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const nameImage = "vouchers_" + newVoucher.id + ".png";
      const filePath = path.join(process.cwd(), `public/vouchers`, nameImage);
      await writeFile(filePath, buffer);
      return NextResponse.json(newVoucher);
    }

    newVoucher = await prisma.voucher.update({
      where: { id: voucher_id },
      data: validatedVoucher,
    });
    prisma.$disconnect();

    return NextResponse.json(newVoucher);

    // const voucher_id = Number(params.id);
    // const voucherInfo = await req.json();
    // const validatedVoucher = validateVoucher(voucherInfo);
    // const updatedVoucher = await prisma.voucher.update({
    //   where: { id: voucher_id },
    //   data: validatedVoucher,
    // });
    // prisma.$disconnect();
    // return NextResponse.json(updatedVoucher);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error to update voucher" },
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
    const voucher_id = Number(params.id);
    await prisma.voucher.delete({
      where: { id: voucher_id },
    });
    prisma.$disconnect();

    return NextResponse.json({ message: "deleted voucher" });
  } catch (e) {
    return NextResponse.json(
      { error: "Error to delete voucher" },
      { status: 404 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
