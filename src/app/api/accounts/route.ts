import { NextRequest, NextResponse } from "next/server";
import * as xlsx from "xlsx";

export async function POST(req: NextRequest) {
  try {
    const datafile = await req.formData();
    const file = datafile.get("file") as File;
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    // Leer el ArrayBuffer como un libro de trabajo de Excel
    console.log("file", file);
    const workbook = xlsx.read(buffer, { type: "buffer" });
    const sheetName = workbook.SheetNames[0]; // selecciona la hoja
    const sheet = workbook.Sheets[sheetName]; // los valores de la hoja
    const sheetToJson = xlsx.utils.sheet_to_json(sheet);

    console.log("sheetToJson", sheetToJson);
    return NextResponse.json({ message: "funcino" });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ error: "falló" });
  }
}
