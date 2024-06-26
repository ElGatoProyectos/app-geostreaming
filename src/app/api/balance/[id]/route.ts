import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/prisma";
import { authOptions } from "../../auth-options";
import { validateBalance } from "@/lib/validations/balance";
import {
  CentsToBeADistributor,
  distributor_role,
  user_role,
} from "@/constants/roles";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);

    if (session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "forbidden" }, { status: 500 });
    }

    const balanceUser = await req.json();
    const validatedBalanceUser = validateBalance(balanceUser);
    const { balance_in_cents } = validatedBalanceUser;
    const user = await prisma.user.update({
      where: { id: Number(params.id) },
      data: { balance_in_cents: { increment: balance_in_cents } },
    });

    const isDistributor = user.balance_in_cents >= CentsToBeADistributor;

    const newRole = isDistributor ? distributor_role : user_role;

    const updateUser = await prisma.user.update({
      where: { id: Number(params.id) },
      data: { role: newRole },
    });

    return NextResponse.json(updateUser);
  } catch (error: any) {
    return NextResponse.json(
      { error: "Error to balance user" },
      { status: 404 }
    );
  }
}
