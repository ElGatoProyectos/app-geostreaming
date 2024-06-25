import prisma from "@/lib/prisma";
import { validateOrder } from "@/lib/validations/order";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const orders = await prisma.order.findMany();
    return NextResponse.json(orders);
  } catch (e) {
    return NextResponse.json({ error: "Error to get orders" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  try {
    const orderInfo = await req.json();
    const validatedOrder = validateOrder(orderInfo);

    const account = await prisma.account.findUnique({
      where: { id: validatedOrder.account_id },
      select: {
        is_active: true,
        product: {
          select: { price_distributor_in_cents: true, price_in_cents: true },
        },
      },
    });

    const user = await prisma.user.findUnique({
      where: { id: validatedOrder.user_id },
      select: { balance_in_cents: true },
    });

    if (!account) {
      return NextResponse.json(
        { error: "Error to account not exist" },
        { status: 500 }
      );
    }

    if (!user) {
      return NextResponse.json(
        { error: "Error to user not exist" },
        { status: 500 }
      );
    }

    const { quantity, account_id, user_id, role } = validatedOrder;

    const {
      product: { price_distributor_in_cents, price_in_cents },
    } = account;

    let newBalanceInCents;
    if (role === "DISTRIBUTOR") {
      newBalanceInCents =
        user.balance_in_cents - price_distributor_in_cents * quantity;
    }
    if (role === "USER") {
      newBalanceInCents = user.balance_in_cents - price_in_cents * quantity;
    }

    await prisma.account.update({
      where: { id: account_id },
      data: { is_active: true },
    });

    await prisma.user.update({
      where: { id: user_id },
      data: { balance_in_cents: newBalanceInCents },
    });

    const newOrder = await prisma.order.create({
      data: validatedOrder,
    });

    return NextResponse.json(newOrder);
  } catch (e) {
    return NextResponse.json(
      { error: "Error to create order" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
