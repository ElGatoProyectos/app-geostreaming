import React, { Suspense, lazy } from "react";
import Login from "./login";
import { Metadata } from "next";

import Loading from "@/app/loading";

export const metadata: Metadata = {
  title: "Ingresar",
};
const page = () => {
  return (
    <Suspense fallback={<Loading />}>
      <div className="md:h-full w-screen flex justify-center items-center p-4 overflow-y-auto">
        <Login></Login>
      </div>
    </Suspense>
  );
};

export default page;
