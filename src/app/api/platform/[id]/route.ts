import prisma from "@/lib/prisma";
import { validatePlatform } from "@/lib/validations/platform";
import { convertToCents } from "@/utils/convertToCents";
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
    await prisma.$disconnect();
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
  let platforminfo;
  let platformValidated;

  // validacion si id es numerico
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

  // obtencion de informacion
  try {
    platforminfo = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    platformValidated = validatePlatform(platforminfo);
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
    const updatedPlatform = await prisma.platform.update({
      where: { id: platform_id },
      data: platformValidated,
    });
    await prisma.$disconnect();
    return NextResponse.json(updatedPlatform);
  } catch (e) {
    return NextResponse.json(
      { error: "Error updating platform" },
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
    await prisma.$disconnect();

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
