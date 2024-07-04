import prisma from "@/lib/prisma";
import { validatePlatform } from "@/lib/validations/platform";
import { convertToCents } from "@/utils/convertToCents";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const platforms = await prisma.platform.findMany({
      include: { Account: true },
    });
    return NextResponse.json(platforms);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching platforms" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  let platformInfo;
  let platformValidated;

  try {
    platformInfo = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    platformValidated = validatePlatform(platformInfo);
  } catch (error) {
    return NextResponse.json({ error: "Validation error" }, { status: 400 });
  }

  const { price_in_cents, price_distributor_in_cents } = platformValidated;

  platformValidated = {
    ...platformValidated,
    price_distributor_in_cents: convertToCents(price_distributor_in_cents),
    price_in_cents: convertToCents(price_in_cents),
  };

  try {
    const newPlatform = await prisma.platform.create({
      data: platformValidated,
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
