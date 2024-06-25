import React, { Suspense, lazy } from "react";
import Loading from "@/app/loading";
import Home from "./home";

const page = () => {
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <Home></Home>
      </Suspense>
    </div>
  );
};

export default page;
