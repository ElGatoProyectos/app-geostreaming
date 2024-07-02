import prisma from "@/lib/prisma";
import { validateRenovate } from "@/lib/validations/renovate";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let renovateInfo;
  let renovateValidated;

  try {
    renovateInfo = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    renovateValidated = validateRenovate(renovateInfo);
  } catch (error) {
    return NextResponse.json({ error: "Validation error" }, { status: 400 });
  }

  try {
    const newPlatform = await prisma.account.update({
      where: { id: renovateValidated.account_id },
      data: { renewal_date: new Date() },
    });
   await prisma.$disconnect();
    return NextResponse.json(newPlatform);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating platform" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
