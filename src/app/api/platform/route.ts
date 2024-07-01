import prisma from "@/lib/prisma";
import { validatePlatform } from "@/lib/validations/platform";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";

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
  let data;
  data = await req.formData();

  const {
    file,
    name,
    description,
    days_duration,
    price_distributor_in_cents,
    status,
  } = Object.fromEntries(data.entries()) as {
    file: File;
    name: string;
    description: string;
    days_duration: string;
    price_distributor_in_cents: string;
    status: "IMMEDIATE_DELIVERY" | "UPON_REQUEST";
  };

  const update = {
    name,
    description,
    days_duration,
    price_distributor_in_cents,
    status,
  };
  let validatedPlatform = validatePlatform(update);
  let newPlatform;

  if (file) {
    newPlatform = await prisma.platform.create({
      data: validatedPlatform,
    });
    await prisma.$disconnect();
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const nameImage = "platforms_" + newPlatform.id + ".png";
    const filePath = path.join(process.cwd(), `public/platforms`, nameImage);
    await writeFile(filePath, buffer);
    return NextResponse.json(newPlatform);
  }

  try {
    const newPlatform = await prisma.platform.create({
      data: validatedPlatform,
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
