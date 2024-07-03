import prisma from "@/lib/prisma";
import { validateVoucher } from "@/lib/validations/voucher";
import path from "path";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import { dev, url_backend } from "@/context/token";

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

    const createVoucher: any = {
      number,
      value: parseInt(value),
      date: new Date(date),
      user_id: Number(user_id),
      status,
    };

    const validatedVoucher = validateVoucher(createVoucher);

    const userwe = await prisma.user.findUnique({
      where: { id: validatedVoucher.user_id },
    });

    let cookiesesion = dev
      ? "next-auth.session-token"
      : "__Secure-next-auth.session-token";
    const token = req.cookies.get(cookiesesion)?.value as any;
    const url_wsp = `${url_backend}/notifications`;

    const admi = await prisma.admin.findMany();

    const wspmessageadmi = `👋 Hola ${admi[0].full_name} tienes un voucher pendiente del usuario ${userwe?.full_name} con el id de ${userwe?.id} por favor revisarlo en depositos`;
    const resadmi = await fetch(url_wsp, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
      body: JSON.stringify({
        phone: admi[0].phone,
        message: wspmessageadmi,
        country_code: admi[0].country_code,
      }),
    });

    await resadmi.json();

    let newVoucher;
    if (file) {
      newVoucher = await prisma.voucher.create({
        data: validatedVoucher,
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
      data: createVoucher,
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
