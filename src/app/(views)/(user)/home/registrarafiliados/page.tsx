import { lazy, Suspense } from "react";
import { Metadata } from "next";
import Loading from "@/app/loading";
import Register from "./register";
import { NextAuthProvider } from "@/context/sesion.context";

const MainLayout = lazy(() => import("@/app/components/layout/mainLayout"));

const roleName = "role";
export const metadata: Metadata = {
  title: "Registrar Afiliados - " + roleName,
};
const page = () => {
  return (
    <NextAuthProvider>
      <Suspense fallback={<Loading />}>
        <MainLayout>
          <Register />
        </MainLayout>
      </Suspense>
    </NextAuthProvider>
  );
};

export default page;
