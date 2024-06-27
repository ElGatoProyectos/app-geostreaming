import prisma from "@/lib/prisma";
import { validateVoucher } from "@/lib/validations/voucher";

import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const vouchers = await prisma.voucher.findMany();
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
    const voucherInfo = await req.json();
    const validatedVoucher = validateVoucher(voucherInfo);

    const newVoucher = await prisma.voucher.create({
      data: validatedVoucher,
    });

    return NextResponse.json(newVoucher);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error creating voucher", message: error.message },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
