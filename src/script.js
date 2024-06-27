const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const checkingDaysOfAccounts = async () => {
  const result = await prisma.account.updateMany({
    where: {
      is_active: true,
    },
    data: {
      numb_days_duration: {
        decrement: 1,
      },
    },
  });

  console.log(`Actualizados ${result.count} cuentas.`);

  await prisma.$disconnect();
};
checkingDaysOfAccounts();
