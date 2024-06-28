import { lazy, Suspense } from "react";

import { Metadata } from "next";
import Loading from "@/app/loading";
import Consumers from "./consumer";
import { NextAuthProvider } from "@/context/sesion.context";

const MainLayout = lazy(() => import("@/app/components/layout/mainLayout"));

export const metadata: Metadata = {
  title: "Consumidores - Admin",
};
const page = () => {
  return (
    <NextAuthProvider>
      <Suspense fallback={<Loading />}>
        <MainLayout>
          <Consumers />
        </MainLayout>
      </Suspense>
    </NextAuthProvider>
  );
};

export default page;
