import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  let user_id;
  let foundAccount;

  try {
    user_id = Number(params.id);
    if (isNaN(user_id)) {
      return NextResponse.json(
        { error: "Invalid account ID" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing account ID" },
      { status: 400 }
    );
  }

  try {
    foundAccount = await prisma.order.findMany({
      where: { ref_id: user_id },
      include: { platform: true, user: true },
    });
    if (!foundAccount) {
      return NextResponse.json(
        { message: "No se encontraron ordenes de los referidos" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching account" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }

  return NextResponse.json(foundAccount);
}
