import prisma from "@/lib/prisma";
import { convertToCents } from "@/utils/convertToCents";
import { NextRequest, NextResponse } from "next/server";
import * as xlsx from "xlsx";

export async function POST(req: NextRequest) {
    try {
      const datafile = await req.formData();
      const file = datafile.get("file") as File;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer); // usar buffer para node
  
      const workbook = xlsx.read(buffer, { type: "buffer" });
      const sheetName = workbook.SheetNames[0]; // selecciona la hoja
      const sheet = workbook.Sheets[sheetName]; // los valores de la hoja
      const sheetToJson = xlsx.utils.sheet_to_json(sheet);
  
      // const transformedData = sheetToJson.map((item: any) => ({
      //   platform: item[Object.keys(item)[0]],
      //   price_distributor: convertToCents(item[Object.keys(item)[1]]),
      //   price: convertToCents(item[Object.keys(item)[2]]),
      //   days_duration: item[Object.keys(item)[3]],
      // }));
  
      const entregaInmediata = "ENTREGA INMEDIATA";
      const pedido = "BAJO PEDIDO";
  
      const IMMEDIATE_DELIVERY = "IMMEDIATE_DELIVERY";
      const UPON_REQUEST = "UPON_REQUEST";
  
      type platforms = {
        name: string;
        price_distributor_in_cents: number;
        price_in_cents: number;
        days_duration: number;
        description: string;
        status: "IMMEDIATE_DELIVERY" | "UPON_REQUEST";
      };
  
      const transformedData: platforms[] = sheetToJson.map((item: any) => ({
        name: item["PLATAFORMAS"].toString(),
        price_distributor_in_cents: convertToCents(
          item["PRECIO PARA DISTRIBUIDORES"]
        ),
        price_in_cents: convertToCents(item["PRECIO PARA CONSUMIDORES"]),
        days_duration: Number(item["DIAS DE USO"]),
        description: item["DESCRIPCION"] ?? "",
        status:
          item["ESTATUS"] === entregaInmediata
            ? IMMEDIATE_DELIVERY
            : UPON_REQUEST,
      }));
  
      const newPlataforms = await prisma.platform.createMany({
        data: transformedData,
      });
  
      return NextResponse.json({ message: "success", data: newPlataforms });
    } catch (e) {
      console.log(e);
      return NextResponse.json({ error: "falló" });
    }
  }