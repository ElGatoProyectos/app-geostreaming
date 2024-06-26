import React, { Suspense, lazy } from "react";
import { Metadata } from "next";
import Loading from "@/app/loading";
const Register = lazy(() => import("./register"));

export const metadata: Metadata = {
  title: "Regístrate",
};
const page = () => {
  return (
    <div className="md:h-screen w-screen flex justify-center items-center p-4 overflow-y-auto">
      <Suspense fallback={<Loading />}>
        <Register></Register>
      </Suspense>
    </div>
  );
};

export default page;
