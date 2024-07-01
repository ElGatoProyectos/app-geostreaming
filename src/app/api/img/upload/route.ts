import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const datafile = await request.formData();
    const file = datafile.get("file") as File;
    const routeFile = datafile.get("route") as File;
    console.log("file", file);
    console.log("routeFile", routeFile);

    if (!file) {
      return NextResponse.json(
        { message: "No file found in request" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const filePath = path.join(process.cwd(), `public/${routeFile}`, file.name);
    await writeFile(filePath, buffer);

    const filePathToSave = `public/${routeFile}/${file.name}`;

    return NextResponse.json({
      message: "File uploaded successfully",
      path: filePathToSave,
    });
  } catch (e: any) {
    return NextResponse.json(
      { message: "Error uploading file", error: e.message },
      { status: 500 }
    );
  }
}
