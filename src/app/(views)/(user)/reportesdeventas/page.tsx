import { lazy, Suspense } from "react";
import { Metadata } from "next";
import Loading from "@/app/loading";
import Reports from "./reports";

const MainLayout = lazy(() => import("@/app/components/layout/mainLayout"));

const roleName = "role";
export const metadata: Metadata = {
  title: " Productos - " + roleName,
};
const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <MainLayout>
        <Reports />
      </MainLayout>
    </Suspense>
  );
};

export default page;
