const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const initialProducts = [
  {
    price_in_cents: 500,
    price_distributor_in_cents: 200,
    status: "UPON_REQUEST",
    platform: {
      img_url:
        "https://images.ctfassets.net/y2ske730sjqp/5QQ9SVIdc1tmkqrtFnG9U1/de758bba0f65dcc1c6bc1f31f161003d/BrandAssets_Logos_02-NSymbol.jpg?w=940",
      name: "Netflix",
      description:
        "Streaming service with a wide variety of TV shows, movies, anime, documentaries, and more.",
    },
    accounts: [
      {
        is_active: true,
        email: "jasdsad@gmail.com",
        password: "netf6541",
        pin: "1556",
        numb_profiles: 4,
        numb_days_duration: 30,
      },
      {
        is_active: false,
        email: "ana.perez@gmail.com",
        password: "netf1234",
        pin: "1234",
        numb_profiles: 4,
        numb_days_duration: 30,
      },
    ],
  },
  {
    price_in_cents: 1000,
    price_distributor_in_cents: 500,
    status: "UPON_REQUEST",
    platform: {
      img_url:
        "https://greenhouse.hulu.com/app/uploads/sites/12/2023/10/networkID-hulu.png",
      name: "Hulu",
      description:
        "Streaming service offering live and on-demand TV and movies, with and without commercials.",
    },
    accounts: [
      {
        is_active: false,
        email: "maria.hulu@gmail.com",
        password: "hulu9987",
        pin: "5678",
        description:
          "Links de descarga: https://www.google.com/ , https://www.google.com/ , https://www.google.com/ , https://www.google.com/ ",
        numb_profiles: 5,
        numb_days_duration: 30,
      },
      {
        is_active: true,
        email: "john.hulu@gmail.com",
        password: "hulu4321",
        description:
          "Links de descarga: https://www.google.com/ , https://www.google.com/ , https://www.google.com/ , https://www.google.com/ ",
        pin: "8765",
        numb_profiles: 5,
        numb_days_duration: 30,
      },
    ],
  },
  {
    price_in_cents: 2000,
    price_distributor_in_cents: 550,
    status: "IMMEDIATE_DELIVERY",
    platform: {
      img_url:
        "https://www.infobae.com/new-resizer/n1UXX1TKux_6oeaGxLLs7cnLnno=/1200x675/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/5EGT4P4UKRGAZPDR52FKJJW4YU.png",
      name: "Disney+",
      description:
        "Streaming service offering Disney, Pixar, Marvel, Star Wars, and National Geographic content.",
    },
    accounts: [
      {
        is_active: true,
        email: "alice.disney@gmail.com",
        password: "disney4321",
        pin: "1111",
        numb_profiles: 7,
        numb_days_duration: 30,
      },
      {
        is_active: true,
        email: "bob.disney@gmail.com",
        password: "disney5678",
        pin: "2222",
        numb_profiles: 7,
        numb_days_duration: 30,
      },
    ],
  },
  {
    price_in_cents: 3500,
    price_distributor_in_cents: 750,
    status: "IMMEDIATE_DELIVERY",
    platform: {
      img_url:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f5/Amazon_Prime_Video_blue_logo_2.svg/2560px-Amazon_Prime_Video_blue_logo_2.svg.png",
      name: "Amazon Prime Video",
      description:
        "Streaming service with a wide range of popular movies, TV shows, and original content.",
    },
    accounts: [
      {
        is_active: true,
        email: "charles.amazon@gmail.com",
        password: "prime9988",
        pin: "3333",
        numb_profiles: 6,
        numb_days_duration: 30,
      },
      {
        is_active: true,
        email: "diana.amazon@gmail.com",
        password: "prime1234",
        pin: "4444",
        numb_profiles: 6,
        numb_days_duration: 30,
      },
    ],
  },
];

const users = [
  {
    email: "test1@gmail.com",
    full_name: "pedro perez diaz",
    dni: "52668846",
    phone: "111222333",
    password: "123456",
  },
  {
    email: "test2@gmail.com",
    full_name: "Juan martinez",
    dni: "97484661",
    phone: "77788899",
    password: "123456",
  },
];

const admin = [
  {
    email: "admin@test.com",
    password: "123456789",
    full_name: "admin joel",
    phone: "555666111",
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

  for (const product of initialProducts) {
    const newPlatform = await prisma.platform.create({
      data: product.platform,
    });

    const newProduct = await prisma.product.create({
      data: {
        platform_id: newPlatform.id,
        price_distributor_in_cents: product.price_distributor_in_cents,
        price_in_cents: product.price_in_cents,
        status: product.status,
      },
    });

    let newAccounts = null;
    if (product.accounts) {
      const accountsWithProductAndPlatformId = product.accounts.map(
        (account) => ({
          ...account,
          platform_id: newPlatform.id,
          product_id: newProduct.id,
        })
      );

      await prisma.account.createMany({
        data: accountsWithProductAndPlatformId,
      });

      newAccounts = await prisma.account.findMany({
        where: { product_id: newProduct.id },
      });
    }

    const newProductOut = {
      ...newProduct,
      platform: newPlatform,
      accounts: newAccounts,
    };
    await prisma.$disconnect();
    console.log(`Created product with id: ${newProduct.id}`);
    console.log(`Created product: ${newProductOut}`);
  }

  console.log("Seeding finished.");
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
