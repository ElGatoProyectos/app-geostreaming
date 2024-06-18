import prisma from "@/lib/prisma";
import { ProductType } from "@/types/product";
import { Product, Platform, Price, Account, Role } from "@prisma/client";

export class ProductModel {
  // static getById = async ({ id }: { id: number }) => {
  //   return await prisma.product.findUnique({ where: { id } });
  // };

  static getAll = async (platformId?: number) => {
    if (platformId) {
      return await prisma.product.findMany({
        where: { platform_id: platformId },
      });
    }

    return await prisma.product.findMany({
      include: { accounts: true, platform: true, Price: true },
    });
  };

  static create = async ({ productInfo }: { productInfo: ProductType }) => {
    const { platform_id, accounts, price, role_id } = productInfo;

    // 1 = netflix
    // 2 = haboo
    // 3 = disney+
    const newProduct = await prisma.product.create({
      data: { platform_id: platform_id },
    });

    const newPrice = await prisma.price.create({
      data: { price: price.user, product_id: newProduct.id, role_id },
    });

    // const accounts = [
    //   {
    //     productId: 1,
    //     platform_id: 1,
    //     is_active: true,
    //     email: "luis.sanchez@gmail.com",
    //     password: "disney6541",
    //     pin: "1111",
    //     numb_profiles: 4,
    //     numb_days_duration: 30,
    //     status: "Available",
    //   },
    // ];
    const newAccounts = await prisma.account.createMany({ data: accounts });
    console.log("newProduct", newProduct);
    console.log("newPrice", newPrice);
    console.log("newProduct", newAccounts);
    return;
  };
}
