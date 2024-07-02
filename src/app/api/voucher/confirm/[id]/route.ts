import prisma from "@/lib/prisma";
import { validateConfirmVoucher } from "@/lib/validations/voucher";
import { NextRequest, NextResponse } from "next/server";

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

    // Extraer el campo `status` del formulario
    const { status } = Object.fromEntries(data.entries()) as {
      status: "READ" | "UNREAD";
    };

    const confirmVoucher = {
      status: status,
    };

    const validatedVoucher = validateConfirmVoucher(confirmVoucher);

    // Actualizar el voucher en la base de datos utilizando Prisma
    let newVoucher = await prisma.voucher.update({
      where: { id: voucher_id },
      data: { status: validatedVoucher.status },
    });

    await prisma.$disconnect();

    return NextResponse.json(newVoucher);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error to update voucher" },
      { status: 404 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
