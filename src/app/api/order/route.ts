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

    let product;
    try {
      product = await prisma.product.findUnique({
        where: { id: validatedOrder.product_id },
        select: {
          accounts: true,
          price_distributor_in_cents: true,
          price_in_cents: true,
        },
      });

      if (!product) {
        return NextResponse.json(
          { error: "Error: product not exist" },
          { status: 500 }
        );
      }
    } catch (e) {
      return NextResponse.json(
        { error: "Error fetching product" },
        { status: 500 }
      );
    }

    let user;
    try {
      user = await prisma.user.findUnique({
        where: { id: validatedOrder.user_id },
        select: { balance_in_cents: true, role: true, ref_id: true },
      });

      if (!user) {
        return NextResponse.json(
          { error: "Error: user not exist" },
          { status: 500 }
        );
      }
    } catch (e) {
      return NextResponse.json(
        { error: "Error fetching user" },
        { status: 500 }
      );
    }

    const accountNotActive = product.accounts.find((user) => !user.is_active);

    if (!accountNotActive) {
      return NextResponse.json(
        { error: "No accounts for sale" },
        { status: 500 }
      );
    }

    const { price_distributor_in_cents, price_in_cents } = product;
    const { quantity, user_id, product_id } = validatedOrder;

    let newBalanceInCents;
    if (user.role === "DISTRIBUTOR") {
      if (price_distributor_in_cents * quantity > user.balance_in_cents) {
        return NextResponse.json(
          { error: "Insufficient balance" },
          { status: 500 }
        );
      }
      newBalanceInCents =
        user.balance_in_cents - price_distributor_in_cents * quantity;
    } else if (user.role === "USER") {
      if (price_in_cents * quantity > user.balance_in_cents) {
        return NextResponse.json(
          { error: "Insufficient balance" },
          { status: 500 }
        );
      }
      newBalanceInCents = user.balance_in_cents - price_in_cents * quantity;
    }

    try {
      await prisma.account.update({
        where: { id: accountNotActive.id },
        data: { is_active: true, user_id: user_id },
      });
    } catch (e) {
      return NextResponse.json(
        { error: "Error updating account" },
        { status: 500 }
      );
    }

    try {
      await prisma.user.update({
        where: { id: user_id },
        data: { balance_in_cents: newBalanceInCents },
      });
    } catch (e) {
      return NextResponse.json(
        { error: "Error updating user balance" },
        { status: 500 }
      );
    }

    const dataOrder = {
      quantity,
      user_id,
      role: user.role,
      ref_id: user.ref_id,
      account_id: accountNotActive.id,
      product_id,
    };

    try {
      const newOrder = await prisma.order.create({
        data: dataOrder,
        select: {
          account: true,
          id: true,
          quantity: true,
          role: true,
          ref_id: true,
        },
      });

      return NextResponse.json({
        ...newOrder,
        price_in_cents: product.price_in_cents,
        price_distributor_in_cents: product.price_distributor_in_cents,
      });
    } catch (e) {
      return NextResponse.json(
        { error: "Error creating order" },
        { status: 500 }
      );
    }
  } catch (e) {
    return NextResponse.json(
      { error: "Error to create order" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
