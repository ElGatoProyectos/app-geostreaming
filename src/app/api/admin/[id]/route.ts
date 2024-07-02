import prisma from "@/lib/prisma";
import { validateAdmin } from "@/lib/validations/admin";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../../auth-options";
import path from "path";
import { writeFile } from "fs/promises";

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
    /* adminInfo = await req.json(); */
    const data : any= await req.formData()
    

    const file = data.get("file") ;
    const email = data.get("email");
    const full_name = data.get("full_name");
    const phone = data.get("phone");
    const country_code = data.get("country_code");

    adminInfo = {
      file,
      email,
      full_name,
      phone,
      country_code
    }
    console.log(adminInfo)
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  /* let validatedAdmin; */

  /* try {
    validatedAdmin = validateAdmin(adminInfo);
  } catch (error) {
    return NextResponse.json({ error: "Validation error" }, { status: 400 });
  } */

  let updatedAdmin;

  try {
    const { file, ...restData } = adminInfo
    if (adminInfo.file!=="undefined") {
      const bytes = await adminInfo.file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const nameImage = "admin_" + params.id + ".png";
      const filePath = path.join(process.cwd(), `public/admin`, nameImage);
      await writeFile(filePath, buffer);
      updatedAdmin = await prisma.admin.update({
        where: { id: Number(params.id) },
        data: restData,
      });
    } else {

      updatedAdmin = await prisma.admin.update({
        where: { id: Number(params.id) },
        data: restData,
      });
    }

  } catch (error) {
    console.log(error)
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
