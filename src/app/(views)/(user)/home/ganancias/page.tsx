import { lazy, Suspense } from "react";
import { Metadata } from "next";
import Loading from "@/app/loading";
import Reports from "./earnings";
import { NextAuthProvider } from "@/context/sesion.context";

const MainLayout = lazy(() => import("@/app/components/layout/mainLayout"));

const roleName = "role";
export const metadata: Metadata = {
  title: " Reportes de depósitos - " + roleName,
};
const page = () => {
  return (
    <NextAuthProvider>
      <Suspense fallback={<Loading />}>
        <MainLayout>
          <Reports />
        </MainLayout>
      </Suspense>
    </NextAuthProvider>
  );
};

export default page;
