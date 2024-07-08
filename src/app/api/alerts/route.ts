import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
      const [data] = await prisma.alert.findMany();
      await prisma.$disconnect();
      return NextResponse.json(data, { status: 200 });
    } catch (error) {
      await prisma.$disconnect();
      return NextResponse.json(
        { error: "Error in server" },
        { status: 500 }
      );
    }
  }
  
  export async function POST(req: NextRequest) {
    try {
      const info = await req.json();
      const [data] = await prisma.alert.findMany();
      await prisma.$disconnect();
      if (data) {
        await prisma.alert.update(
          { where: { id: data.id },  data: {description: info.description}  },
          
        );
      } else {
        await prisma.alert.create({ data: info });
      }
      return NextResponse.json({ message: "Updated ok" }, { status: 200 });
    } catch (error) {
      await prisma.$disconnect();
      return NextResponse.json(
        { error: "Error in server" },
        { status: 500 }
      );
    }
  }