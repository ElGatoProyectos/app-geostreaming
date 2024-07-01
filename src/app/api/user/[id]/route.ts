import { UserModel } from "@/models/mysql/user-model";
import { UserService } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";

const userService = new UserService({ userModel: UserModel });

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await userService.getById({ params });
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: "Error to get user" }, { status: 404 });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  let data;
  try {
    const datafile = await req.formData();
    const file = datafile.get("file") as File;
    const routeFile = datafile.get("route");
    const ref_id = datafile.get("ref_id");

    const datafileImg = new FormData();
    datafileImg.set("file", file);
    // datafileImg.set("full_name", routeFile);
    console.log("datafileImg", datafileImg);

    try {
      const res = await fetch("/api/img/upload", {
        method: "POST",
        body: datafileImg,
      });

      const text = await res.text();
      if (!text) {
        console.error("Respuesta vacía");
        return;
      }

      data = JSON.parse(text);
      console.log("data", data);
    } catch (error) {
      console.error("Error al enviar el archivo:", error);
    }

    if (!datafile) {
      return NextResponse.json(
        { message: "No file found in request" },
        { status: 400 }
      );
    }

    console.log("json adquirido", JSON.parse(jsonFile));

    const user = await userService.update({ req, params });
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error to update user" },
      { status: 404 }
    );
  }
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await userService.delete({ params });
    return NextResponse.json({ message: "deleted user" });
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error to delete user" },
      { status: 404 }
    );
  }
}
