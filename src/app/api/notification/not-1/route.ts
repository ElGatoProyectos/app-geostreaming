import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { platform } from "os";

export async function GET() {
  try {
    // const currentDate = new Date();

    // const accounts = await prisma.account.findMany({
    //   where: { status: "BOUGHT" },
    // });

    // const platforms = await prisma.platform.findMany({});

    

    // await prisma.$disconnect();

    // const filteredAccounts = accounts.filter((account:any) => {
    //   let creationDate;
    //   if (account.renewal_date) {
    //     creationDate = new Date(account.renewal_date);
    //   } else {
    //     creationDate = new Date(account.purchase_date);
    //   }
    //   const expirationDate = new Date(creationDate);

    //   const platform:any= platforms.find(
    //     (item) => item.id === account.platform_id
    //   );

     
    //   expirationDate.setDate(
    //     creationDate.getDate() + platform.days_duration - 2
    //   );

    //   if (expirationDate <= currentDate) return account;
    // });

   

    // return NextResponse.json(accounts);

    const currentDate = new Date();

    const accounts = await prisma.account.findMany({
      where: { status: "BOUGHT" },
      include:{
        user:true,

        platform:true
      }
    });

    const platforms = await prisma.platform.findMany({});

    await prisma.$disconnect();

    const filteredAccounts = accounts.filter((account: any) => {
      let creationDate;
      if (account.renewal_date) {
        creationDate = new Date(account.renewal_date);
      } else {
        creationDate = new Date(account.purchase_date);
      }

      const platform = platforms.find((item) => item.id === account.platform_id);
      
      if (!platform) return false; 

      const expirationDate = new Date(creationDate);

      expirationDate.setDate(expirationDate.getDate() + platform.days_duration);

      return (
        expirationDate.getFullYear() === currentDate.getFullYear() &&
        expirationDate.getMonth() === currentDate.getMonth() &&
        expirationDate.getDate() === currentDate.getDate() + 1
      );
    });
      
    return NextResponse.json(filteredAccounts);
    
  } catch (e) {
    return NextResponse.json({ error: "Error to get orders" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
}