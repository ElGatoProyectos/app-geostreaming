import prisma from "@/lib/prisma";

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
  await prisma.account.createMany({
    data: accounts,
  });

  await prisma.account.findMany({
    where: { product_id },
  });
}

export async function deleteAccounts(accounts: AccountDeleteProps[]) {
  await Promise.all(
    accounts.map(async (account) => {
      await prisma.account.delete({
        where: {
          id: account.id,
        },
      });
    })
  );
}
