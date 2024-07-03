import { lazy, Suspense } from "react";
import { Metadata } from "next";
import Loading from "@/app/loading";
import Products from "./platform";
import { NextAuthProvider } from "@/context/sesion.context";

const MainLayout = lazy(() => import("@/app/components/layout/mainLayout"));

export const metadata: Metadata = {
  title: " Productos",
};
const page = () => {
  return (
    <NextAuthProvider>
      <Suspense fallback={<Loading />}>
        <MainLayout>
          <Products />
        </MainLayout>
      </Suspense>
    </NextAuthProvider>
  );
};

export default page;
