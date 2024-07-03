const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const initialBanks = [
  {
    bank_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTglLyEuBFP1w0fLXQnQp0XSEf9pzIkSxJK6Q&s",
    name: "Jose perez mendoza",
    number: "7777888899999",
    bank: "Pichincha",
    type: "CORRIENTE",
  },
  {
    bank_url:
      "https://yt3.googleusercontent.com/1il06CSbBwwG5lyybUYa6KnisWtswkvFPK9y2C92R3Vp5hd6rCdTBYD-TGKGAQt9V6FMMSXsxw=s900-c-k-c0x00ffffff-no-rj",
    name: "Jose perez mendoza",
    number: "55556666111122",
    bank: "BCP",
    type: "CORRIENTE",
  },
  {
    bank_url:
      "https://pbs.twimg.com/profile_images/1607365667950305283/HpdPjItg_400x400.jpg",
    name: "Jose perez mendoza",
    number: "55556666111122",
    bank: "INTERBANK",
    type: "CORRIENTE",
  },
];

const initialAccounts = [
  {
    email: "jasdsad@gmail.com",
    password: "netf6541",
    description: "description www.google.com",
    pin: "1556",
    status: "NOT_BOUGHT",
    platform_id: 1, // harcodeado
    number_profiles: 2,
  },
  {
    email: "ana.perez@gmail.com",
    password: "netf1234",
    description: "description www.google.com",
    pin: "1234",
    status: "NOT_BOUGHT",
    platform_id: 1, // harcodeado
    number_profiles: 2,
  },
  {
    email: "maria.hulu@gmail.com",
    password: "hulu9987",
    description: "description www.google.com",
    pin: "7563",
    status: "NOT_BOUGHT",
    platform_id: 1, // harcodeado
    number_profiles: 2,
  },
  {
    email: "joh432u@gmail.com",
    password: "hulu4321",
    description: "description www.google.com",
    pin: "9181",
    status: "NOT_BOUGHT",
    platform_id: 2, // harcodeado
    number_profiles: 3,
  },
  {
    email: "joh432u@gmail.com",
    password: "hulu4321",
    description: "description www.google.com",
    pin: "9181",
    status: "NOT_BOUGHT",
    platform_id: 2, // harcodeado
    number_profiles: 3,
  },
  {
    email: "joh432u@gmail.com",
    password: "hulu4321",
    description: "description www.google.com",
    pin: "9181",
    status: "NOT_BOUGHT",
    platform_id: 2, // harcodeado
    number_profiles: 3,
  },
  {
    email: "joh432u@gmail.com",
    password: "hulu4321",
    description: "description www.google.com",
    pin: "9181",
    status: "NOT_BOUGHT",
    platform_id: 2, // harcodeado
    number_profiles: 3,
  },
  {
    email: "joh432u@gmail.com",
    password: "hulu4321",
    description: "description www.google.com",
    pin: "9181",
    status: "NOT_BOUGHT",
    platform_id: 2, // harcodeado
    number_profiles: 3,
  },
  {
    email: "jsffdslu@gmail.com",
    password: "hulu4321",
    description: "description www.google.com",
    pin: "9181",
    status: "NOT_BOUGHT",
    platform_id: 4, // harcodeado
    number_profiles: 4,
  },
  {
    email: "heheheu@gmail.com",
    password: "hulu4321",
    description: "description www.google.com",
    pin: "9181",
    status: "NOT_BOUGHT",
    platform_id: 3, // harcodeado
    number_profiles: 1,
  },
  {
    email: "heheheu@gmail.com",
    password: "hulu4321",
    description: "description www.google.com",
    pin: "9181",
    status: "NOT_BOUGHT",
    platform_id: 3, // harcodeado
    number_profiles: 1,
  },
  {
    email: "heheheu@gmail.com",
    password: "hulu4321",
    description: "description www.google.com",
    pin: "9181",
    status: "NOT_BOUGHT",
    platform_id: 3, // harcodeado
    number_profiles: 1,
  },
  {
    email: "heheheu@gmail.com",
    password: "hulu4321",
    description: "description www.google.com",
    pin: "9181",
    status: "NOT_BOUGHT",
    platform_id: 3, // harcodeado
    number_profiles: 1,
  },
  {
    email: "heheheu@gmail.com",
    password: "hulu4321",
    description: "description www.google.com",
    pin: "9181",
    status: "NOT_BOUGHT",
    platform_id: 3, // harcodeado
    number_profiles: 1,
  },
];

const initialPlatforms = [
  {
    img_url:
      "https://images.ctfassets.net/y2ske730sjqp/5QQ9SVIdc1tmkqrtFnG9U1/de758bba0f65dcc1c6bc1f31f161003d/BrandAssets_Logos_02-NSymbol.jpg?w=940",
    name: "NETFLIX INTERNACIONAL COMPLETA 1 MES",
    description: "descripcion obligada o opcional?",
    days_duration: 30,
    price_in_cents: 1250,
    price_distributor_in_cents: 1100,
    status: "UPON_REQUEST",
  },
  {
    img_url:
      "https://images.ctfassets.net/y2ske730sjqp/5QQ9SVIdc1tmkqrtFnG9U1/de758bba0f65dcc1c6bc1f31f161003d/BrandAssets_Logos_02-NSymbol.jpg?w=940",
    name: "1 PERFIL ORIGINAL NETFLIX 1 MES",
    description: "descripcion obligada o opcional?",
    days_duration: 30,
    price_in_cents: 250,
    price_distributor_in_cents: 350,
    status: "IMMEDIATE_DELIVERY",
  },
  {
    img_url:
      "https://images.ctfassets.net/y2ske730sjqp/5QQ9SVIdc1tmkqrtFnG9U1/de758bba0f65dcc1c6bc1f31f161003d/BrandAssets_Logos_02-NSymbol.jpg?w=940",
    name: "MAX INTERNACIONAL COMPLETA 1 MES",
    description: "descripcion obligada o opcional?",
    days_duration: 30,
    price_in_cents: 300,
    price_distributor_in_cents: 400,
    status: "IMMEDIATE_DELIVERY",
  },
  {
    img_url:
      "https://images.ctfassets.net/y2ske730sjqp/5QQ9SVIdc1tmkqrtFnG9U1/de758bba0f65dcc1c6bc1f31f161003d/BrandAssets_Logos_02-NSymbol.jpg?w=940",
    name: "1 PERFIL MAX 1 MES",
    description: "descripcion obligada o opcional?",
    days_duration: 30,
    price_in_cents: 180,
    price_distributor_in_cents: 140,
    status: "IMMEDIATE_DELIVERY",
  },
  {
    img_url:
      "https://images.ctfassets.net/y2ske730sjqp/5QQ9SVIdc1tmkqrtFnG9U1/de758bba0f65dcc1c6bc1f31f161003d/BrandAssets_Logos_02-NSymbol.jpg?w=940",
    name: "AMAZON PRIME VIDEO COMPLETA 1 MES",
    description: "descripcion obligada o opcional?",
    days_duration: 30,
    price_in_cents: 400,
    price_distributor_in_cents: 350,
    status: "IMMEDIATE_DELIVERY",
  },
];

const users = [
  {
    email: "test1@gmail.com",
    full_name: "pedro perez diaz",
    dni: "52668846",
    phone: "111222333",
    country_code: "+42",
    password: "123456",
    balance_in_cents: 10000,
  },
  {
    email: "test2@gmail.com",
    full_name: "Juan martinez",
    dni: "97484661",
    phone: "77788899",
    country_code: "+85",
    password: "123456",
    balance_in_cents: 20000,
    role: "DISTRIBUTOR",
  },
];

const admin = [
  {
    email: "admin@test.com",
    password: "123456789",
    full_name: "admin joel",
    phone: "555666111",
    country_code: "+51",
  },
];

async function main() {
  console.log(`Start seeding...`);

  const adminEncryptedPass = await Promise.all(
    admin.map(async (admin) => {
      const newPass = await bcrypt.hash(admin.password, 10);
      return { ...admin, password: newPass };
    })
  );

  await prisma.admin.createMany({
    data: adminEncryptedPass,
  });

  const usersEncryptedPass = await Promise.all(
    users.map(async (user) => {
      const newPass = await bcrypt.hash(user.password, 10);
      return { ...user, password: newPass };
    })
  );

  await prisma.user.createMany({
    data: usersEncryptedPass,
  });

  // for (const platform of initialPlatforms) {
  //   const newPlatform = await prisma.platform.create({
  //     data: platform,
  //   });

  //   await prisma.$disconnect();
  //   console.log(`Created platform with id: ${newPlatform.id}`);
  // }

  // for (const account of initialAccounts) {
  //   const newAccount = await prisma.account.create({
  //     data: account,
  //   });
  //   console.log(`Created account with id: ${newAccount.id}`);
  // }
  // console.log("Seeding finished.");

  for (const bank of initialBanks) {
    const newBank = await prisma.bank.create({
      data: bank,
    });
    console.log(`Created Bank with id: ${newBank.id}`);
  }
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
