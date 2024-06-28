import { lazy, Suspense } from "react";

import { Metadata } from "next";
import Loading from "@/app/loading";
import ChangePassword from "./changepassword";
import { NextAuthProvider } from "@/context/sesion.context";

const MainLayout = lazy(() => import("@/app/components/layout/mainLayout"));

export const metadata: Metadata = {
  title: "Cambiar Contraseña",
};

const page = () => {
  return (
    <NextAuthProvider>
      <Suspense fallback={<Loading />}>
        <MainLayout>
          <ChangePassword />
        </MainLayout>
      </Suspense>
    </NextAuthProvider>
  );
};

export default page;
