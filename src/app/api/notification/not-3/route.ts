import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {

    const users = await prisma.user.findMany({
      where: { role: "DISTRIBUTOR" },
    });

    const accountsActive = await prisma.account.findMany({
      where: { status: "BOUGHT" },
    });


    return NextResponse.json({users,accountsActive});
  } catch (e) {
    return NextResponse.json({ error: "Error to get orders" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}