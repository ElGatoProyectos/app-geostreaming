import prisma from "@/lib/prisma";
import { validateOrder } from "@/lib/validations/order";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      include: { platform: true, user: true },
    });
    return NextResponse.json(orders);
  } catch (e) {
    return NextResponse.json({ error: "Error to get orders" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(req: NextRequest) {
  let orderInfo;
  let orderValidated;

  try {
    orderInfo = await req.json();
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    orderValidated = validateOrder(orderInfo);
  } catch (error) {
    return NextResponse.json({ error: "Validation error" }, { status: 400 });
  }

  let platform;
  let user;

  try {
    platform = await prisma.platform.findUnique({
      where: { id: orderValidated.platform_id },
      select: {
        Account: true,
        price_distributor_in_cents: true,
        price_in_cents: true,
        name: true,
        description: true,
        status: true,
        days_duration: true,
      },
    });

    if (!platform) {
      return NextResponse.json(
        { error: "Error: platform not exist" },
        { status: 500 }
      );
    }
  } catch (e) {
    return NextResponse.json(
      { error: "Error fetching platform" },
      { status: 500 }
    );
  }

  try {
    user = await prisma.user.findUnique({
      where: { id: orderValidated.user_id },
      select: {
        balance_in_cents: true,
        ref_id: true,
        phone: true,
        full_name: true,
        role: true,
        country_code: true, // enviar wsp
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Error: user not exist" },
        { status: 500 }
      );
    }
  } catch (e) {
    return NextResponse.json({ error: "Error fetching user" }, { status: 500 });
  }

  try {
    const { price_distributor_in_cents, price_in_cents } = platform;
    const { user_id, platform_id, status } = orderValidated;

    let newBalanceInCents;
    let quantity = 1;
    let refId = user.ref_id;

    if (user.role === "DISTRIBUTOR") {
      if (price_distributor_in_cents * quantity > user.balance_in_cents) {
        return NextResponse.json(
          { error: "Insufficient balance" },
          { status: 500 }
        );
      }
      newBalanceInCents =
        user.balance_in_cents - price_distributor_in_cents * quantity;

      if (refId) {
        try {
          await prisma.user.update({
            where: { id: refId },
            data: { balance_in_cents: { increment: 100 } },
          });
        } catch (e) {
          return NextResponse.json(
            { error: "Error to inscrement user ref balance" },
            { status: 500 }
          );
        }
      }
    } else if (user.role === "USER") {
      if (price_in_cents * quantity > user.balance_in_cents) {
        return NextResponse.json(
          { error: "Insufficient balance" },
          { status: 500 }
        );
      }
      newBalanceInCents = user.balance_in_cents - price_in_cents * quantity;

      if (refId) {
        try {
          await prisma.user.update({
            where: { id: refId },
            data: { balance_in_cents: { increment: 100 } },
          });
        } catch (e) {
          return NextResponse.json(
            { error: "Error to inscrement user ref balance" },
            { status: 500 }
          );
        }
      }
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

    const statusOrder = status;

    if (statusOrder === "PENDING") {
      const dataOrder = {
        role: user.role,
        ref_id: user.ref_id,
        user_id,
        platform_id,
        status: statusOrder,
      };

      try {
        const newOrder = await prisma.order.create({
          data: dataOrder,
          select: {
            id: true,
            role: true,
            platform: { select: { name: true } },
          },
        });

        const wspMessage = `👋 Hola ${user.full_name}\n _Pedido #${newOrder.id} PENDIENTE_\n🖥️ Plataforma: ${platform.name}\n📧 La espera aproximada es de 1 hora, y enviaremos la información a este número de WhatsApp.`;

        // const userPhone = user.phone;

        // const url_wsp = "http://localhost:4000/notifications";
        // const options = {
        //   method: "POST",
        //   headers: {
        //     "Content-Type": "application/json",
        //     // Authorization: `Bearer ${token}`,
        //   },

        //   body: JSON.stringify({ phone: userPhone, message: wspMessage, country_code:  }),
        // };

        // const res = await fetch(url_wsp, options);
        // const json = await res.json();

        // await prisma.notification.create({
        //   data: { phone_client: userPhone, message: wspMessage },
        // });

        return NextResponse.json(newOrder);
      } catch (e) {
        return NextResponse.json(
          { error: "Error creating order pending" },
          { status: 500 }
        );
      }
    }

    const accountselected = platform.Account.find(
      (cuenta) => !cuenta.is_active
    );

    if (!accountselected) {
      return NextResponse.json(
        { error: "No accounts for sale" },
        { status: 500 }
      );
    }

    try {
      await prisma.account.update({
        where: { id: accountselected.id },
        data: {
          is_active: true,
          user_id: user_id,
          platform_id: platform_id,
          purchase_date: new Date(),
          status: "BOUGHT",
        },
      });
    } catch (e) {
      return NextResponse.json(
        { error: "Error updating account" },
        { status: 500 }
      );
    }

    const dataOrder = {
      role: user.role,
      ref_id: user.ref_id,
      user_id,
      platform_id,
    };

    try {
      const newOrder = await prisma.order.create({
        data: dataOrder,
        select: {
          id: true,
          role: true,
          platform: { select: { name: true } },
        },
      });

      const responseOrder = { ...newOrder, account: accountselected };

      const { email, password, pin, description } = accountselected;

      const wspMessage = `👋 Hola ${user.full_name}\n _Pedido #${
        newOrder.id
      } Completado_\n🖥️ Plataforma: ${
        platform.name
      }\n📧 Email: ${email}\n🔑 Password: ${password}\n🔢 Pin: ${pin}\n${
        description ? `📝 Descripción: ${description}\n` : ""
      }🕒 Duración de la cuenta: ${platform.days_duration} días}`;

      // const userPhone = user.phone;

      // const url_wsp = "http://localhost:4000/notifications";
      // const options = {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //     // Authorization: `Bearer ${token}`,
      //   },

      //   body: JSON.stringify({ phone: userPhone, message: wspMessage, country_code:  }),
      // };

      // const res = await fetch(url_wsp, options);
      // const json = await res.json();

      // await prisma.notification.create({
      //   data: { phone_client: userPhone, message: wspMessage },
      // });

      return NextResponse.json({
        ...responseOrder,
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
