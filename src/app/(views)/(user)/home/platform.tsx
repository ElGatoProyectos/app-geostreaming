import React from "react";
import Delivery from "./delivery";
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
