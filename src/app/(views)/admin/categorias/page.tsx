import { lazy, Suspense } from "react";

import { Metadata } from "next";
import Loading from "@/app/loading";
import Category from "./category";

const MainLayout = lazy(() => import("@/app/components/layout/mainLayout"));

export const metadata: Metadata = {
  title: "Categorias - Admin",
};
const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <MainLayout>
        <Category />
      </MainLayout>
    </Suspense>
  );
};

export default page;
