import { lazy, Suspense } from "react";

import { Metadata } from "next";
import Loading from "@/app/loading";
import Products from "./products";

const MainLayout = lazy(() => import("@/app/components/layout/mainLayout"));

export const metadata: Metadata = {
  title: "Productos - Admin",
};
const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <MainLayout>
        <Products />
      </MainLayout>
    </Suspense>
  );
};

export default page;
