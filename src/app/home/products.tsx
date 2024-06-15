import React from "react";
import { Dproducts } from "@/data/Dproducts";
import Link from "next/link";

const Products = () => {
  const DataProducts = Dproducts;
  return (
    <div className="relative"  id="products">
      <div className="section-bg py-[120px] text-white px-4 md:px-10 max-w-[1440px] mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold uppercase flex flex-col gap-4 justify-center items-center">
            Productos <span className="w-12 h-1 bg-[#F2308B]"></span>
          </h2>
          <p className="mt-4">
            Tenemos una gran variedad de productos streaming
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {DataProducts.map((product, indec) => (
            <div className="flex justify-start items-start p-8 gap-4 bg-[#252525] rounded">
              <div className=" flex items-start">
              <img src={product.url} alt={product.name} className="w-[100px] h-auto object-contain" />
              </div>
              
              <div>
                <Link href={'#'} className="text-white text-xl font-bold  hover:underline transition-all duration-300">{product.name}</Link>
                <p className="mt-4">{product.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
