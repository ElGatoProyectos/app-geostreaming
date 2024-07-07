import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const accounts = await prisma.account.findMany({
      where: { status: "NOT_BOUGHT" },
    });

    const [admin] = await prisma.admin.findMany();
   

    return NextResponse.json({accounts,admin});
  } catch (e) {
    return NextResponse.json({ error: "Error to get orders" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}