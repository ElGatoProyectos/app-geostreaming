import { PrismaClient } from "@prisma/client";
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
async function main() {
  //   console.log(`Start seeding...`);
  //   for (const post of initialTest) {
  //     const newPost = await prisma.post.create({
  //       data: post,
  //     });
  //     console.log(`Created post with id: ${newPost.id}`);
  //   }
  //   console.log("Seeding finished.");
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
