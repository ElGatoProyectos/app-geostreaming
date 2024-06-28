import React from "react";
import MainLayout from "@/app/components/layout/mainLayout";
import Counts from "./account";
import { NextAuthProvider } from "@/context/sesion.context";
const page = () => {
  return (
    <NextAuthProvider>
      <MainLayout>
        <Counts />
      </MainLayout>
    </NextAuthProvider>
  );
};

export default page;
