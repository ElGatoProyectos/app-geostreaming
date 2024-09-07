import prisma from "@/lib/prisma";
import { validateRenovate } from "@/lib/validations/renovate";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  let renovateInfo;
  let renovateValidated;

  try {
    renovateInfo = await req.json();
    console.log(renovateInfo);
  } catch (error) {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  try {
    renovateValidated = validateRenovate(renovateInfo);
  } catch (error) {
    return NextResponse.json({ error: "Validation error" }, { status: 400 });
  }

  try {

    // validar que tipo soy

    const userFound:any = await prisma.user.findFirst({
      where:{
        id:renovateInfo.user_id
      }
    })
    // validar si tienes el saldo suficiente
    const platform = await prisma.platform.findFirst({
      where:{
        id:renovateInfo.platform_id
      }
    })

    let price:any=0

    if(userFound.rol==="DISTRIBUTOR"){
      price = platform?.price_distributor_in_cents
    }else{
      price = platform?.price_in_cents
    }

    if(price>userFound.balance_in_cents){
      return NextResponse.json(
        { error: "Credit insuficient!!!" },
        { status: 400 }
      );
    }

  // restar

  await prisma.user.update({
    where:{id:renovateInfo.user_id},
    data:{ balance_in_cents:{decrement:price}}
  })

  // cambiar estado
    const newPlatform = await prisma.account.update({
      where: { id: renovateValidated.account_id },
      data: { renewal_date: new Date() },
    });



   await prisma.$disconnect();
    return NextResponse.json(newPlatform);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating platform" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
