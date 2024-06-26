import { lazy, Suspense } from "react";
import { Metadata } from "next";
import Loading from "@/app/loading";
import Register from "./register";

const MainLayout = lazy(() => import("@/app/components/layout/mainLayout"));

const roleName = "role";
export const metadata: Metadata = {
  title: " Afiliados - " + roleName,
};
const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <MainLayout>
        <Register />
      </MainLayout>
    </Suspense>
  );
};

export default page;
