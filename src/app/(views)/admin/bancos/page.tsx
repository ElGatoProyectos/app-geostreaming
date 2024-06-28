import { lazy, Suspense } from "react";

import { Metadata } from "next";
import Loading from "@/app/loading";
import Bank from "./bank";

const MainLayout = lazy(() => import("@/app/components/layout/mainLayout"));

export const metadata: Metadata = {
  title: "Bancos - Admin",
};
const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <MainLayout>
        <Bank />
      </MainLayout>
    </Suspense>
  );
};

export default page;
