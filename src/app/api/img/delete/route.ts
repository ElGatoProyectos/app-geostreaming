import { NextRequest, NextResponse } from "next/server";
import { unlink } from "fs/promises";
import path from "path";

export async function DELETE(request: NextRequest) {
  try {
    const datafile = await request.formData();
    const nameFile = datafile.get("name") as string;
    const routeFile = datafile.get("route") as string;

    const filePath = path.join(process.cwd(), `public/${routeFile}`, nameFile);
    await unlink(filePath);

    return NextResponse.json({
      message: "File deleted successfully",
      fileName: nameFile,
      fileRoute: routeFile,
    });
  } catch (e: any) {
    return NextResponse.json(
      { message: "Error deleting file", error: e.message },
      { status: 500 }
    );
  }
}
