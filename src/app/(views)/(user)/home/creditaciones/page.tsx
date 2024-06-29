import React from "react";
import Counts from "./creditaciones";
import { NextAuthProvider } from "@/context/sesion.context";
import { lazy, Suspense } from "react";

import { Metadata } from "next";
import Loading from "@/app/loading";

const MainLayout = lazy(() => import("@/app/components/layout/mainLayout"));

export const metadata: Metadata = {
  title: "Creditaciones",
};
const page = () => {
  return (
    <NextAuthProvider>
      <Suspense fallback={<Loading />}>
        <MainLayout>
          <Counts />
        </MainLayout>
      </Suspense>
    </NextAuthProvider>
  );
};

export default page;
