import prisma from "@/lib/prisma";
import { validatePlatform } from "@/lib/validations/platform";
import path from "path";
import { writeFile } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  let platform_id;

  try {
    platform_id = Number(params.id);
    if (isNaN(platform_id)) {
      return NextResponse.json(
        { error: "Invalid platform ID" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing platform ID" },
      { status: 400 }
    );
  }

  try {
    const foundPlatform = await prisma.platform.findUnique({
      where: { id: platform_id },
    });
    if (!foundPlatform) {
      return NextResponse.json(
        { error: "Platform not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(foundPlatform);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching platform" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  let platform_id;

  try {
    platform_id = Number(params.id);
    if (isNaN(platform_id)) {
      return NextResponse.json(
        { error: "Invalid platform ID" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing platform ID" },
      { status: 400 }
    );
  }

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
    newPlatform = await prisma.platform.update({
      where: { id: platform_id },
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
    const newPlatform = await prisma.platform.update({
      where: { id: platform_id },
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

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  let platform_id;

  try {
    platform_id = Number(params.id);
    if (isNaN(platform_id)) {
      return NextResponse.json(
        { error: "Invalid platform ID" },
        { status: 400 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing platform ID" },
      { status: 400 }
    );
  }

  try {
    await prisma.platform.delete({
      where: { id: platform_id },
    });

    return NextResponse.json({ message: "Deleted platform" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting platform" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
