
import { Metadata } from "next";
import Platform from "./patform";

import MainLayout from "@/app/components/layout/mainLayout";

export const metadata: Metadata = {
  title: "Categorias - Admin",
};
const page = () => {
  return (
      <MainLayout>
        <Platform />
      </MainLayout>
  );
};

export default page;
