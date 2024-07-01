import prisma from "@/lib/prisma";
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
