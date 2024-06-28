import { lazy, Suspense } from "react";

import { Metadata } from "next";
import Loading from "@/app/loading";
import Plataformas from "./platform";
import { NextAuthProvider } from "@/context/sesion.context";

const MainLayout = lazy(() => import("@/app/components/layout/mainLayout"));

export const metadata: Metadata = {
  title: "Plataformas - Admin",
};
const page = () => {
  return (
    <NextAuthProvider>
      <Suspense fallback={<Loading />}>
        <MainLayout>
          <Plataformas />
        </MainLayout>
      </Suspense>
    </NextAuthProvider>
  );
};

export default page;
