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
      include: { accounts: true, role: true },
    });

    await prisma.$disconnect();

    return userFound;
  };

  static getAll = async () => {
    const users = await prisma.user.findMany({
      include: { accounts: true, role: true },
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

    const newUser = await prisma.user.create({
      data: user_info,
    });

    const formatBalance = parseFloat(newUser.balance.toString());
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
    const userUpdated = await prisma.user.update({
      where: { id: user_id },
      data: rest,
      include: { role: true },
    });
    await prisma.$disconnect();

    return userUpdated;
  };
}
