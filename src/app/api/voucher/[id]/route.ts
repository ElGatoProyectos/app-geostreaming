import prisma from "@/lib/prisma";
import { validateVoucher } from "@/lib/validations/voucher";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const voucher_id = Number(params.id);
    const foundVoucher = await prisma.voucher.findUnique({
      where: { id: voucher_id },
    });
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
  try {
    const voucher_id = Number(params.id);
    const voucherInfo = await req.json();
    const validatedVoucher = validateVoucher(voucherInfo);
    const updatedVoucher = await prisma.voucher.update({
      where: { id: voucher_id },
      data: validatedVoucher,
    });

    return NextResponse.json(updatedVoucher);
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
