import { Metadata } from "next";
import Account from "./account";

import MainLayout from "@/app/components/layout/mainLayout";
import { NextAuthProvider } from "@/context/sesion.context";

export const metadata: Metadata = {
  title: "Cuentas - Admin",
};
const page = () => {
  return (
    <NextAuthProvider>
      <MainLayout>
        <Account />
      </MainLayout>
    </NextAuthProvider>
  );
};

export default page;
