import React, { Suspense, lazy } from "react";
import { Metadata } from "next";
import Loading from "@/app/loading";
const Register = lazy(() => import("./register"));

export const metadata: Metadata = {
  title: "Regístrate",
};
const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="md:h-full w-screen flex justify-center items-center p-4 overflow-y-auto ">
        <Register></Register>
      </div>
    </Suspense>
  );
};

export default page;
