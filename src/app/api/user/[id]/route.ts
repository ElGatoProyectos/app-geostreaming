import prisma from "@/lib/prisma";
import {
  validateUpdateRole,
  validateUpdateUser,
  validateUser,
} from "@/lib/validations/user";
import { UserModel } from "@/models/mysql/user-model";
import { UserService } from "@/service/user";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { url_front_to_wsp } from "@/context/token";

const userService = new UserService({ userModel: UserModel });

export async function GET(
  _: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await userService.getById({ params });
    await prisma.$disconnect();
    return NextResponse.json(user);
  } catch (error: any) {
    return NextResponse.json({ error: "Error to get user" }, { status: 404 });
  }
}

// export async function PATCH(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   let data;
//   try {
//     data = await req.formData();

//     const {
//       file,
//       email,
//       password,
//       ref_id,
//       full_name,
//       dni,
//       phone,
//       country_code,
//       role,
//     } = Object.fromEntries(data.entries()) as {
//       file: File;
//       email: string;
//       password: string;
//       ref_id: string;
//       full_name: string;
//       dni: string;
//       phone: string;
//       country_code: string;
//       role: string;
//     };
//     const newPass = await bcrypt.hash(password, 10);
//     const updateUser = {
//       email: email,
//       role: role,
//       password: newPass,
//       ref_id: Number(ref_id),
//       full_name: full_name,
//       dni: dni,
//       phone: phone,
//       country_code: country_code,
//     };

//     const user_id = Number(params.id);
//     const validatedUser = validateUpdateUser(updateUser);

//     if (file) {
//       const bytes = await file.arrayBuffer();
//       const buffer = Buffer.from(bytes);
//       const nameImage = "user_" + user_id + ".png";
//       const filePath = path.join(process.cwd(), `public/users`, nameImage);
//       await writeFile(filePath, buffer);

//       console.log("filePath", filePath);

//       const userUpdate = await prisma.user.update({
//         where: { id: Number(params.id) },
//         data: { ...validatedUser },
//       });

//       return NextResponse.json(userUpdate);
//     }
//     const userUpdate = await prisma.user.update({
//       where: { id: Number(params.id) },
//       data: { ...validatedUser },
//     });

//     return NextResponse.json(userUpdate);
//   } catch (error: any) {
//     return NextResponse.json(
//       { error: "Error to update user" },
//       { status: 404 }
//     );
//   }
// }

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  let userInfo = await req.json();
  let validateduser = validateUpdateRole(userInfo);

  const curedUser = {
    role: validateduser.role,
    enabled: validateduser.enabled,
  };

  const updatedUser = await prisma.user.update({
    where: { id: Number(params.id) },
    data: curedUser,
  });

  await prisma.$disconnect();
  return NextResponse.json(updatedUser);
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  let userInfo;

  try {
    const data: any = await req.formData();

    const file = data.get("file");
    const email = data.get("email");
    const full_name = data.get("full_name");
    const phone = data.get("phone");
    const country_code = data.get("country_code");

    console.log("userInfo", userInfo);

    userInfo = {
      file,
      email,
      full_name,
      phone,
      country_code,
    };
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  let updatedUser;

  try {
    const { file, ...restData } = userInfo;
    if (userInfo.file !== "undefined") {
      const formDataAll = new FormData();
      formDataAll.append("image", userInfo.file);

      const res = await fetch(`${url_front_to_wsp}/file/profile/${params.id}`, {
        method: "POST",
        body: formDataAll,
      });

      const json = await res.json();
    }

    updatedUser = await prisma.user.update({
      where: { id: Number(params.id) },
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

  return NextResponse.json(updatedUser);
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
