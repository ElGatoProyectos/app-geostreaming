import prisma from "@/lib/prisma";
import { validateVoucher } from "@/lib/validations/voucher";

import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const vouchers = await prisma.voucher.findMany();
    return NextResponse.json(vouchers);
  } catch (e) {
    return NextResponse.json(
      { error: "Error to get vouchers" },
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
  } catch (e) {
    return NextResponse.json(
      { error: "Error to create voucher" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
