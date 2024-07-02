import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const afiliados = await prisma.user.count({
      where: {
        ref_id: {
          not: null,
        },
      },
    });

    const consumidores = await prisma.user.count({
      where: {
        role: "USER",
      },
    });

    const cantidadDeProductos = await prisma.platform.count();

    const cuentasDeVenta = await prisma.account.count({
      where: {
        is_active: true,
      },
    });

    // products vendidos

    const productosMasVendidos = await prisma.platform.findMany({
      select: {
        name: true,
        _count: { select: { Account: { where: { is_active: true } } } },
      },
    });
    // top afiliates
    const usersWithAffiliates = await prisma.user.findMany({
      where: {
        ref_id: {
          not: null,
        },
      },
      select: {
        id: true,
        ref_id: true,
        full_name: true,
      },
    });

    const affiliateCounts = await prisma.user.groupBy({
      by: ["ref_id"],
      _count: {
        _all: true,
      },
      where: {
        ref_id: {
          not: null,
        },
      },
    });

    const topAfiliados = affiliateCounts.map((affiliate) => {
      const user = usersWithAffiliates.find(
        (u) => u.ref_id === affiliate.ref_id
      );

      return {
        Nombre_del_afiliador: user?.full_name,
        Cuantos_usuarios_tienen_el_Ref_id: affiliate._count._all,
        Ventas_del_afiliador: user?.id,
      };
    });

    await prisma.$disconnect();

    return NextResponse.json({
      afiliados,
      consumidores,
      cantidadDeProductos,
      cuentasDeVenta,
      topAfiliados,
      productosMasVendidos,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Error fetching dashboard" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
