import { UserInType, UserUpdateInType } from "@/types/user";
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prismaClient = new PrismaClient();

async function connect() {
  try {
    await prismaClient.$connect();
    const database = prismaClient.user;
    return database;
  } catch (e) {
    console.error("Error connecting to db");
    console.error(e);
    await prismaClient.$disconnect();
  }
}

export class UserModel {
  static getById = async ({ user_id }: { user_id: number }) => {
    const db = await connect();

    if (!db) throw new Error("db not connecting");

    const userFound = await db.findUnique({
      where: { id: user_id },
      include: { products: true, role: true },
    });

    await prismaClient.$disconnect();

    return userFound;
  };

  static getAll = async () => {
    const db = await connect();
    if (!db) throw new Error("db not connecting");
    return await db.findMany({
      include: { products: true, role: true },
    });
  };

  static create = async ({ user_info }: { user_info: UserInType }) => {
    const db = await connect();
    if (!db) throw new Error("db not connecting");
    const newUser = await db.create({
      data: user_info,
    });

    const formatBalance = parseFloat(newUser.balance.toString());
    const newUserFormatedBalance = { ...newUser, balance: formatBalance };

    await prismaClient.$disconnect();

    return newUserFormatedBalance;
  };

  static delete = async ({ user_id }: { user_id: number }) => {
    const db = await connect();
    if (!db) throw new Error("db not connecting");
    const userDeleted = await db.delete({
      where: { id: user_id },
    });

    await prismaClient.$disconnect();

    if (!userDeleted)
      throw NextResponse.json(
        { error: "The product has already been deleted or does not exist" },
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
    const db = await connect();
    if (!db) throw new Error("db not connecting");
    const { id, products, ...rest } = user_info;
    const userUpdated = await db.update({
      where: { id: user_id },
      data: rest,
      include: { role: true },
    });
    await prismaClient.$disconnect();

    return userUpdated;
  };
}
