import {
  AccountOutType,
  ProductInType,
  ProductOutType,
  ProductUpdateInType,
} from "@/types/product";
import { compareArrays } from "@/utils/compare-arrays";
import { createAccounts, deleteAccounts } from "@/utils/crudAccouts";
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

export class ProductModel {
  static getById = async ({ productId }: { productId: number }) => {
    const productFound = await prismaClient.product.findUnique({
      where: { id: productId },
      include: { platform: true, accounts: true },
    });
    await prismaClient.$disconnect();
    return productFound;
  };

  static getAll = async () => {
    const products = await prismaClient.product.findMany({
      include: { accounts: true, platform: true },
    });
    await prismaClient.$disconnect();
    return products;
  };

  static create = async ({
    platform,
    accounts,
    price_distributor_in_cents,
    price_in_cents,
    status,
  }: ProductInType): Promise<ProductOutType> => {
    const newPlatform = await prismaClient.platform.create({
      data: platform,
    });

    const newProduct = await prismaClient.product.create({
      data: {
        platform_id: newPlatform.id,
        price_in_cents,
        price_distributor_in_cents,
        status: status,
      },
    });

    let newAccounts = null;
    if (accounts) {
      const accountsWithProductAndPlatformId = accounts.map((account) => ({
        ...account,
        platform_id: newPlatform.id,
        product_id: newProduct.id,
      }));

      await prismaClient.account.createMany({
        data: accountsWithProductAndPlatformId,
      });

      newAccounts = await prismaClient.account.findMany({
        where: { product_id: newProduct.id },
      });
    }

    const newProductOut = {
      ...newProduct,
      platform: newPlatform,
      accounts: newAccounts,
    };
    await prismaClient.$disconnect();
    return newProductOut;
  };

  static delete = async ({ product_id }: { product_id: number }) => {
    // delete product one by one
    const product = await prismaClient.product.findUnique({
      where: {
        id: product_id,
      },
      include: {
        accounts: true,
      },
    });

    if (!product) {
      throw new Error("Product not found");
    }

    await Promise.all(
      product.accounts.map(async (account) => {
        await prismaClient.account.delete({
          where: {
            id: account.id,
          },
        });
      })
    );

    await prismaClient.product.delete({
      where: {
        id: product_id,
      },
    });

    await prismaClient.platform.delete({
      where: {
        id: product_id,
      },
    });

    await prismaClient.$disconnect();

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
      price_distributor_in_cents,
      price_in_cents,
      accounts: updateAccounts,
      status,
    } = product_info;

    const Accounts = await prismaClient.product.findMany({
      where: { id: product_id },
      include: { accounts: true },
    });

    const { accounts: oldAccounts } = Accounts[0];

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

    const allProductUpdate = await prismaClient.product.update({
      where: { id: product_id },
      data: {
        price_distributor_in_cents,
        price_in_cents,
        status,
        platform: {
          update: {
            where: { id: platform.id },
            data: {
              name: platform.name,
              description: platform.description,
            },
          },
        },
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
      include: { platform: true, accounts: true },
    });

    await prismaClient.$disconnect();

    return allProductUpdate;
  };
}
