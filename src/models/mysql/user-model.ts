import prisma from "@/lib/prisma";
import { UserInType, UserUpdateInType } from "@/types/user";
import { NextResponse } from "next/server";
import { userInfo } from "os";

export class UserModel {
  static getById = async ({ user_id }: { user_id: number }) => {
    const userFound = await prisma.user.findUnique({
      where: { id: user_id },
    });

    await prisma.$disconnect();

    return userFound;
  };

  static getAll = async () => {
    const users = await prisma.user.findMany();
    await prisma.$disconnect();
    return users;
  };

  static getAllByRole = async (userRole: "USER" | "DISTRIBUTOR") => {
    const users = await prisma.user.findMany({
      where: {
        role: userRole,
      },
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
      country_code: user_info.country_code,
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
    const userFound = await prisma.user.findUnique({
      where: { id: user_id },
    });

    if (!userFound) {
      throw NextResponse.json({ message: "User not exist" }, { status: 400 });
    }

    const curatedUser = {
      avatar_url: user_info.avatar_url,
      email: user_info.email,
      ref_id: user_info.ref_id,
      role: user_info.role,
      full_name: user_info.full_name,
      dni: user_info.dni,
      phone: user_info.phone,
      password: user_info.password,
      country_code: user_info.country_code,
    };

    const userUpdated = await prisma.user.update({
      where: { id: user_id },
      data: curatedUser,
    });

    await prisma.$disconnect();

    return userUpdated;
  };
}
