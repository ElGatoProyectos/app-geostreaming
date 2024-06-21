import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

interface AccountCreateProps {
  product_id: number;
  platform_id: number;
  is_active: boolean;
  email: string;
  password: string;
  pin: string;
  numb_profiles: number;
  numb_days_duration: number;
  status: string;
  createdAt: string;
}

interface AccountDeleteProps extends AccountCreateProps {
  id: number;
}

export async function createAccounts(
  accounts: AccountCreateProps[],
  product_id: number
) {
  await prismaClient.account.createMany({
    data: accounts,
  });

  await prismaClient.account.findMany({
    where: { product_id },
  });
}

export async function deleteAccounts(accounts: AccountDeleteProps[]) {
  await Promise.all(
    accounts.map(async (account) => {
      await prismaClient.account.delete({
        where: {
          id: account.id,
        },
      });
    })
  );
}
