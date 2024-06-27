import React from "react";
import MainLayout from "@/app/components/layout/mainLayout";
import Home from "./home";
import { NextAuthProvider } from "@/context/sesion.context";

const page = () => {
  return (
    <NextAuthProvider>
      <MainLayout>
        <Home></Home>
      </MainLayout>
    </NextAuthProvider>
  );
};

export default page;
