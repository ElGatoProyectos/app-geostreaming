import { lazy, Suspense } from "react";

import { Metadata } from "next";
import Loading from "@/app/loading";
import { NextAuthProvider } from "@/context/sesion.context";
import Document from "./document";

const MainLayout = lazy(() => import("@/app/components/layout/mainLayout"));

export const metadata: Metadata = {
  title: "Documentación - Admin",
};

const page = () => {
  return (
    <NextAuthProvider>
      <Suspense fallback={<Loading />}>
        <MainLayout>
         <Document/>
        </MainLayout>
      </Suspense>
    </NextAuthProvider>
  );
};

export default page;
