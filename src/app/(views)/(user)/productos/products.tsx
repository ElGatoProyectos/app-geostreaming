import React from "react";
import Delivery from "./delilvery";
import Request from "./request";

const products = () => {
  
  return (
    <div className="flex flex-col gap-8">
      <Request />
      <Delivery />
    </div>
  );
};

export default products;
