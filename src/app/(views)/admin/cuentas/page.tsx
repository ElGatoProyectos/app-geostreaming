import { lazy, Suspense } from "react";

import { Metadata } from "next";
import Loading from "@/app/loading";
import Account from "./accounts";

const MainLayout = lazy(() => import("@/app/components/layout/mainLayout"));

export const metadata: Metadata = {
  title: "Cuentas - Admin",
};
const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <MainLayout>
        <Account />
      </MainLayout>
    </Suspense>
  );
};

export default page;
