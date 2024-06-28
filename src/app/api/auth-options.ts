import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import prisma from "@/lib/prisma";
// import { signOut } from "next-auth/react";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "*******",
        },
      },
      async authorize(credentials) {
        if (!credentials) throw new Error("No credentials");

        const adminFound = await prisma.admin.findUnique({
          where: { email: credentials.email },
        });

        if (adminFound) {
          const matchPassword = await bcrypt.compare(
            credentials.password,
            adminFound.password
          );

          if (!matchPassword) throw new Error("Wrong password");
          await prisma.$disconnect();
          return {
            id: adminFound.id.toString(),
            name: adminFound.full_name,
            email: adminFound.email,
            role: "ADMIN",
          };
        }
        const userFound = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!userFound) throw new Error("No user found");

        const matchPassword = await bcrypt.compare(
          credentials.password,
          userFound.password
        );

        if (!matchPassword) throw new Error("Wrong password");
        await prisma.$disconnect();
        return {
          id: userFound.id.toString(),
          name: userFound.full_name,
          email: userFound.email,
          role: userFound.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: any) {
      return { ...token, ...user };
    },
    async session({ session, token }: any) {
      session.user = token;
      return session;
    },
  },
  // pages: {
  //   signIn: "/ingresar",
  //   signOut: "/ingresar",
  // },
};
