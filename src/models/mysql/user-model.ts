import prisma from "@/lib/prisma";
import { UserInType, UserUpdateInType } from "@/types/user";
import { NextResponse } from "next/server";

// const prismaClient = new PrismaClient();

// async function connect() {
//   try {
//     await prismaClient.$connect();
//     const database = prismaClient.user;
//     return database;
//   } catch (e) {
//     console.error("Error connecting to db");
//     console.error(e);
//     await prismaClient.$disconnect();
//   }
// }

export class UserModel {
  static getById = async ({ user_id }: { user_id: number }) => {
    const userFound = await prisma.user.findUnique({
      where: { id: user_id },
      include: { accounts: true },
    });

    await prisma.$disconnect();

    return userFound;
  };

  static getAll = async () => {
    const users = await prisma.user.findMany({
      include: { accounts: true },
    });
    await prisma.$disconnect();
    return users;
  };

  static create = async ({ user_info }: { user_info: UserInType }) => {
    const userFound = await prisma.user.findUnique({
      where: { email: user_info.email },
    });

    if (userFound) {
      throw NextResponse.json(
        { message: "User already exists" },
        { status: 400 }
      );
    }

    const curatedUser = {
      email: user_info.email,
      ref_id: user_info.ref_id,
      role: user_info.role,
      full_name: user_info.full_name,
      dni: user_info.dni,
      phone: user_info.phone,
      password: user_info.password,
    };

    const newUser = await prisma.user.create({
      data: curatedUser,
    });

    const formatBalance = parseFloat(newUser.balance_in_cents.toString());
    const newUserFormatedBalance = { ...newUser, balance: formatBalance };

    await prisma.$disconnect();

    return newUserFormatedBalance;
  };

  static delete = async ({ user_id }: { user_id: number }) => {
    const userDeleted = await prisma.user.delete({
      where: { id: user_id },
    });

    await prisma.$disconnect();

    if (!userDeleted)
      throw NextResponse.json(
        { error: "The user has already been deleted or does not exist" },
        { status: 410 }
      );
  };

  static update = async ({
    user_id,
    user_info,
  }: {
    user_id: number;
    user_info: UserUpdateInType;
  }) => {
    const { id, products, ...rest } = user_info;

    const userFound = await prisma.user.findUnique({
      where: { id },
    });

    if (!userFound) {
      throw NextResponse.json({ message: "User not exist" }, { status: 400 });
    }

    const curatedUser = {
      email: rest.email,
      ref_id: rest.ref_id,
      role: rest.role,
      full_name: rest.full_name,
      dni: rest.dni,
      phone: rest.phone,
      password: rest.password,
    };

    const userUpdated = await prisma.user.update({
      where: { id: user_id },
      data: curatedUser,
    });
    await prisma.$disconnect();

    return userUpdated;
  };
}
