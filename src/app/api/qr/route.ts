import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const url_wsp = "http://localhost:4000/qrcode";
    const options = {
      method: "GET",
    };

    const res = await fetch(url_wsp, options);
    console.log("res", res);
    // Usamos.blob() para obtener los datos de la imagen como un Blob
    const imgBlob = await res.blob();

    // Convertimos el Blob a una cadena Base64
    const reader = new FileReader();
    let base64data;
    reader.onloadend = () => {
      base64data = reader.result;
      console.log("Base64 Image Data:", base64data); // Aquí puedes usar la imagen como desees
    };
    reader.readAsDataURL(imgBlob);

    // Otra opción es crear una URL de objeto para el Blob y usarla directamente en un elemento <img>
    const imgUrl = URL.createObjectURL(imgBlob);
    console.log("Image URL:", imgUrl); // Esta URL puede ser asignada a src de un elemento <img>

    return NextResponse.json({ qr: "qr", photo: base64data });
  } catch (error: any) {
    return NextResponse.json({ error: "Error to get QR" }, { status: 500 });
  }
}
