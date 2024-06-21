import prisma from "@/lib/prisma";
import {
  AccountOutType,
  PriceOutType,
  ProductInType,
  ProductOutType,
  ProductUpdateInType,
} from "@/types/product";
import { compareArrays } from "@/utils/compare-arrays";
import { createAccounts, deleteAccounts } from "@/utils/crudAccouts";
import { createPrices, deletePrices } from "@/utils/crudPrices";

export class ProductModel {
  static getById = async ({ productId }: { productId: number }) => {
    return await prisma.product.findUnique({
      where: { id: productId },
      include: { platform: true, accounts: true, price: true },
    });
  };

  static getAll = async () => {
    return await prisma.product.findMany({
      include: { accounts: true, platform: true, price: true },
    });
  };

  static create = async ({
    platform,
    accounts,
    prices,
  }: ProductInType): Promise<ProductOutType> => {
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

    await prisma.price.createMany({
      data: pricesWithProductId,
    });

    const newPrices = await prisma.price.findMany({
      where: { product_id: newProduct.id },
    });

    const formatDecimalPrices = newPrices.map((price) => ({
      ...price,
      price: parseFloat(price.price.toString()),
    }));

    let newAccounts = null;
    if (accounts) {
      const accountsWithProductAndPlatformId = accounts.map((account) => ({
        ...account,
        platform_id: newPlatform.id,
        product_id: newProduct.id,
      }));

      await prisma.account.createMany({
        data: accountsWithProductAndPlatformId,
      });

      newAccounts = await prisma.account.findMany({
        where: { product_id: newProduct.id },
      });
    }

    const newProductOut = {
      id: newProduct.id,
      platform_id: newPlatform.id,
      platform: newPlatform,
      accounts: newAccounts,
      prices: formatDecimalPrices,
      createdAt: newProduct.createdAt,
    };

    return newProductOut;
  };

  static delete = async ({ product_id }: { product_id: number }) => {
    // delete product one by one
    const product = await prisma.product.findUnique({
      where: {
        id: product_id,
      },
      include: {
        accounts: true,
        price: true,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    await Promise.all(
      product.accounts.map(async (account) => {
        await prisma.account.delete({
          where: {
            id: account.id,
          },
        });
      })
    );

    await Promise.all(
      product.price.map(async (price) => {
        await prisma.price.delete({
          where: {
            id: price.id,
          },
        });
      })
    );

    await prisma.product.delete({
      where: {
        id: product_id,
      },
    });

    await prisma.platform.delete({
      where: {
        id: product_id,
      },
    });

    return { success: true };
  };

  static update = async ({
    product_id,
    product_info,
  }: {
    product_id: number;
    product_info: ProductUpdateInType;
  }) => {
    const {
      platform,
      price: updatePrices,
      accounts: updateAccounts,
    } = product_info;

    const pricesAndaccounts = await prisma.product.findMany({
      where: { id: product_id },
      include: { price: true, accounts: true },
    });

    const { price: oldPrices, accounts: oldAccounts } = pricesAndaccounts[0];

    /* --------  Prices section -------- */
    const formatDecimalOldPrices = oldPrices.map((price) => ({
      ...price,
      price: parseFloat(price.price.toString()),
    }));

    const formatDecimalUpdatePrices = updatePrices.map((price) => ({
      ...price,
      price: parseFloat(price.price.toString()),
    }));

    const {
      newItems: newPrices,
      persistedItems: persistedPrices,
      removedItems: removedPrices,
    } = compareArrays({
      oldArray: formatDecimalOldPrices,
      newArray: formatDecimalUpdatePrices,
    });

    await createPrices(newPrices, product_id);
    await deletePrices(removedPrices);

    /* --------  Accounts section -------- */

    const {
      newItems: newAccounts,
      persistedItems: persistedAccounts,
      removedItems: removedAccounts,
    } = compareArrays({
      oldArray: oldAccounts,
      newArray: updateAccounts,
    });

    await createAccounts(newAccounts, product_id);
    await deleteAccounts(removedAccounts);

    /* --------  Update section -------- */

    const allProductUpdate = await prisma.product.update({
      where: { id: product_id },
      data: {
        platform: {
          update: {
            where: { id: platform.id },
            data: {
              name: platform.name,
              description: platform.description,
            },
          },
        },
        price: persistedPrices
          ? {
              update: persistedPrices.map(
                ({ id, price, role_id }: PriceOutType) => ({
                  where: { id: id },
                  data: {
                    price,
                    role_id,
                  },
                })
              ),
            }
          : undefined,
        accounts: persistedAccounts
          ? {
              update: persistedAccounts.map(
                ({ id, platform_id, product_id, ...rest }: AccountOutType) => ({
                  where: { id },
                  data: rest,
                })
              ),
            }
          : undefined,
      },
      include: { platform: true, accounts: true, price: true },
    });

    return allProductUpdate;
  };
}
