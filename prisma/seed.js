const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

const initialTest = [
  {
    title: "Post 1",
    slug: "post-1",
    content: "Content of post 1",
    author: {
      connectOrCreate: {
        where: {
          email: "jhon@gmail.com",
        },
        create: {
          email: "jhon@gmail.com",
          hashedPassword: "56asd116s5a6d51sa156",
        },
      },
    },
  },
];

const roles = [
  {
    name: "user",
  },
  {
    name: "distributor",
  },
];

const users = [
  {
    email: "test1@gmail.com",
    full_name: "pedro perez diaz",
    dni: "52668846",
    phone: "111222333",
    password: "123456",
    role_id: 1,
  },
  {
    email: "test2@gmail.com",
    full_name: "Juan martinez",
    dni: "97484661",
    phone: "77788899",
    password: "123456",
    role_id: 2,
  },
];

async function main() {
  console.log(`Start seeding...`);
  // await prisma.role.createMany({
  //   data: roles,
  // });

  const usersEncryptedPass = await Promise.all(
    users.map(async (user) => {
      const newPass = await bcrypt.hash(user.password, 10);
      return { ...user, password: newPass };
    })
  );

  await prisma.user.createMany({
    data: usersEncryptedPass,
  });

  //   for (const post of initialTest) {
  //     const newPost = await prisma.post.create({
  //       data: post,
  //     });
  //     console.log(`Created post with id: ${newPost.id}`);
  //   }
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
