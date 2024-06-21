import { PrismaClient } from "@prisma/client";
const prismaClient = new PrismaClient();

interface PriceCreateProps {
  role_id: number;
  price: string | number;
  product_id: number;
}

interface PriceDeleteProps extends PriceCreateProps {
  id: number;
}

export async function createPrices(
  prices: PriceCreateProps[],
  product_id: number
) {
  await prismaClient.price.createMany({
    data: prices,
  });

  await prismaClient.price.findMany({
    where: { product_id },
  });
}

export async function deletePrices(prices: PriceDeleteProps[]) {
  await Promise.all(
    prices.map(async (price) => {
      await prismaClient.price.delete({
        where: {
          id: price.id,
        },
      });
    })
  );
}
