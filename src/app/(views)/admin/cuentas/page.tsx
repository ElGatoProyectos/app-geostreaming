import { Metadata } from "next";
import Account from "./account";
import { NextAuthProvider } from "@/context/sesion.context";
import { lazy, Suspense } from "react";
import Loading from "@/app/loading";

const MainLayout = lazy(() => import("@/app/components/layout/mainLayout"));

export const metadata: Metadata = {
  title: "Cuentas - Admin",
};
const page = () => {
  return (
    <NextAuthProvider>
      <Suspense fallback={<Loading />}>
        <MainLayout>
          <Account />
        </MainLayout>
      </Suspense>
    </NextAuthProvider>
  );
};

export default page;
