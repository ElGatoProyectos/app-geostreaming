
import { Metadata } from "next";
import Category from "./category";

import MainLayout from "@/app/components/layout/mainLayout";

export const metadata: Metadata = {
  title: "Categorias - Admin",
};
const page = () => {
  return (
      <MainLayout>
        <Category />
      </MainLayout>
  );
};

export default page;
