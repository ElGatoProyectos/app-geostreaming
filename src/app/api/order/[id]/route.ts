import prisma from "@/lib/prisma";
import { validateUpdateOrder } from "@/lib/validations/order";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order_id = Number(params.id);
    const foundOrder = await prisma.order.findUnique({
      where: { id: order_id },
    });
    return NextResponse.json(foundOrder);
  } catch (e) {
    return NextResponse.json({ error: "Error to get order" }, { status: 404 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const order_id = Number(params.id);
    const orderInfo = await req.json();
    const validatedOrder = validateUpdateOrder(orderInfo);
    const updatedOrder = await prisma.order.update({
      where: { id: order_id },
      data: validatedOrder,
    });

    return NextResponse.json(updatedOrder);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error to update order" },
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
    const order_id = Number(params.id);
    await prisma.order.delete({
      where: { id: order_id },
    });

    return NextResponse.json({ message: "deleted order" });
  } catch (e) {
    return NextResponse.json(
      { error: "Error to delete order" },
      { status: 404 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
