import prisma from "@/lib/prisma";
import { ProductInType, ProductOutType } from "@/types/product";

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

  static create = async ({ platform, accounts, prices }: ProductInType) => {
    const newPlatform = await prisma.platform.create({
      data: platform,
    });

    const newProduct = await prisma.product.create({
      data: { platform_id: newPlatform.id },
    });

    const pricesWithProductId = prices.map((price) => ({
      ...price,
      product_id: newProduct.id,
    }));

    const newPrices = await prisma.price.createMany({
      data: pricesWithProductId,
    });

    const productsCreated = await prisma.price.findMany({
      where: {
        product_id: newProduct.id,
      },
      include: { role: true },
    });

    let newAccounts = null;
    if (accounts) {
      const accountsWithProductAndPlatformId = accounts.map((account) => ({
        ...account,
        platform_id: newPlatform.id,
        product_id: newProduct.id,
      }));
      newAccounts = await prisma.account.createMany({
        data: accountsWithProductAndPlatformId,
      });
    }

    console.log("productsCreated", productsCreated);

    console.log("newPlatform", newPlatform);
    console.log("newProduct", newProduct);
    console.log("newPrices", newPrices);
    const newProductOut = {
      id: newProduct.id,
      platform: newPlatform.name,
      accounts: newAccounts,
      prices: newPrices,
    };
    console.log("newProductOut", newProductOut);
    return newProductOut;
  };
}
