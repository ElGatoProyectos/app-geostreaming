import prisma from "@/lib/prisma";
import { UserInType, UserUpdateInType } from "@/types/user";
import { NextResponse } from "next/server";

export class UserModel {
  static getById = async ({ user_id }: { user_id: number }) => {
    return await prisma.user.findUnique({
      where: { id: user_id },
      include: { products: true, role: true },
    });
  };

  static getAll = async () => {
    return await prisma.user.findMany({
      include: { products: true, role: true },
    });
  };

  static create = async ({ user_info }: { user_info: UserInType }) => {
    const newUser = await prisma.user.create({
      data: user_info,
    });

    const formatBalance = parseFloat(newUser.balance.toString());
    const newUserFormatedBalance = { ...newUser, balance: formatBalance };
    return newUserFormatedBalance;
  };

  static delete = async ({ user_id }: { user_id: number }) => {
    const userDeleted = await prisma.user.delete({
      where: { id: user_id },
    });

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
    const { id, products, ...rest } = user_info;
    const userUpdated = await prisma.user.update({
      where: { id: user_id },
      data: rest,
      include: { role: true },
    });

    return userUpdated;
  };
}
