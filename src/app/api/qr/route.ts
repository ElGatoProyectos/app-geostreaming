import { url_backend } from "@/context/token";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const url_wsp = `${url_backend}/qrcode`;
    const options = {
      method: "GET",
    };

    const res = await fetch(url_wsp, options);
    console.log("res", res);

    if (!res.ok) {
      throw new Error("Failed to fetch QR code");
    }

    const buffer = await res.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");
    const imageType = res.headers.get("content-type");

    return NextResponse.json({ qr: `data:${imageType};base64,${base64Image}` });
  } catch (error: any) {
    return NextResponse.json({ error: "Error to get QR" }, { status: 500 });
  }
}
