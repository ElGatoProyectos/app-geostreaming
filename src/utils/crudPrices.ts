import prisma from "@/lib/prisma";

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
  await prisma.price.createMany({
    data: prices,
  });

  await prisma.price.findMany({
    where: { product_id },
  });
}

export async function deletePrices(prices: PriceDeleteProps[]) {
  await Promise.all(
    prices.map(async (price) => {
      await prisma.price.delete({
        where: {
          id: price.id,
        },
      });
    })
  );
}
