import React, { Suspense, lazy } from "react";
import Login from "./login";
import { Metadata } from "next";

import Loading from "@/app/loading";

export const metadata: Metadata = {
  title: "Ingresar",
};
const page = () => {
  return (
    <div className="md:h-screen w-screen flex justify-center items-center p-4 overflow-y-auto">
      <Suspense fallback={<Loading />}>
        <Login></Login>
      </Suspense>
    </div>
  );
};

export default page;
