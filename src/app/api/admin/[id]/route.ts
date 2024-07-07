import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth-options";
import { url_front_to_wsp } from "@/context/token";
import axios from "axios";

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  let admin_id;

  try {
    admin_id = Number(params.id);
    if (isNaN(admin_id)) {
      return NextResponse.json({ error: "Invalid admin ID" }, { status: 400 });
    }
  } catch (e) {
    return NextResponse.json(
      { error: "Error processing admin ID" },
      { status: 400 }
    );
  }

  let foundAdmin;

  try {
    foundAdmin = await prisma.admin.findUnique({
      where: { id: admin_id },
    });
    await prisma.$disconnect();
    if (!foundAdmin) {
      return NextResponse.json({ error: "Admin not found" }, { status: 404 });
    }
  } catch (e) {
    return NextResponse.json(
      { error: "Error fetching admin" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }

  return NextResponse.json(foundAdmin);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  let session;

  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching session" },
      { status: 500 }
    );
  }

  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  let admin_id;

  try {
    admin_id = Number(params.id);
    if (isNaN(admin_id)) {
      return NextResponse.json({ error: "Invalid admin ID" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing admin ID" },
      { status: 400 }
    );
  }

  let adminInfo;

  try {
    const data: any = await req.formData();

    const file = data.get("file");
    const email = data.get("email");
    const full_name = data.get("full_name");
    const phone = data.get("phone");
    const country_code = data.get("country_code");

    adminInfo = {
      file,
      email,
      full_name,
      phone,
      country_code,
    };
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  let updatedAdmin;

  try {
    const { file, ...restData } = adminInfo;
    if (adminInfo.file !== "undefined") {
      console.log(file);
      const formDataAll = new FormData();
      formDataAll.append("image-admin", file);

     /*  const res = await fetch(`${url_front_to_wsp}/file/profile-admin`, {
        method: "POST",
        body: formDataAll,
      }); */
      const res = await axios.post(`${url_front_to_wsp}/file/profile-admin`, formDataAll);

      console.log("res", res);

      /* const json = await res.json(); */
      console.log(res)
      /* console.log("json", json); */
    }

    updatedAdmin = await prisma.admin.update({
      where: { id: admin_id },
      data: restData,
    });
    await prisma.$disconnect();
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Error updating admin" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }

  return NextResponse.json(updatedAdmin);
}

export async function DELETE(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  let session;

  try {
    session = await getServerSession(authOptions);
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching session" },
      { status: 500 }
    );
  }

  if (session.user.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let admin_id;

  try {
    admin_id = Number(params.id);
    if (isNaN(admin_id)) {
      return NextResponse.json({ error: "Invalid admin ID" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Error processing admin ID" },
      { status: 400 }
    );
  }

  try {
    await prisma.admin.delete({
      where: { id: admin_id },
    });
    await prisma.$disconnect();
    return NextResponse.json({ message: "Deleted admin" });
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting admin" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
