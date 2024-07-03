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
    // Obtener todos los usuarios con ref_id no nulo
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

    // Obtener todos los usuarios (afiliadores)
    const allUsers = await prisma.user.findMany({
      select: {
        id: true,
        full_name: true,
      },
    });

    interface AffiliateCounts {
      [key: number]: number;
    }

    const affiliateCounts: AffiliateCounts = {};

    // Contar el número de afiliados por ref_id
    usersWithAffiliates.forEach((user) => {
      const refId = user.ref_id!;
      if (affiliateCounts[refId]) {
        affiliateCounts[refId]++;
      } else {
        affiliateCounts[refId] = 1;
      }
    });

    // Crear el resultado final
    const result = allUsers.map((user) => ({
      Nombre_del_afiliador: user.full_name,
      Cuantos_usuarios_tienen_el_Ref_id: affiliateCounts[user.id] || 0,
    }));

    await prisma.$disconnect();

    return NextResponse.json({
      afiliados,
      consumidores,
      cantidadDeProductos,
      cuentasDeVenta,
      topAfiliados: result, // here,
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
