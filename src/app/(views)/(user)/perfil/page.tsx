import { lazy, Suspense } from "react";

import { Metadata } from "next";
import Loading from "@/app/loading";
import Profile from "./profile";

const MainLayout = lazy(() => import("@/app/components/layout/mainLayout"));

export const metadata: Metadata = {
  title: "Perfil",
};

const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <MainLayout>
        <Profile />
      </MainLayout>
    </Suspense>
  );
};

export default page;
