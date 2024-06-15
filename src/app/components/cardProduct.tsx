import React from "react";

interface Props {
  isNew: boolean;
  title: string;
  url: string;
  description: string;
  consumer_price: string;
}

const CardProduct: React.FC<Props> = (props) => {
  return (
    <div className="flex flex-col justify-center items-center shadow-box rounded-xl p-4 relative">
      {props.isNew && (
        <span className="absolute top-0 left-0 -translate-y-1/2 bg-green-600 px-4 py-1 rounded-r-xl rounded-tl-xl font-semibold text-white">
          Nuevo
        </span>
      ) }

      <img
        src={props.url}
        alt="logo producto"
        className=" w-24 h-24 object-contain mb-3"
      />
      <div className="text-center ">
        <h3 className="text-[#277FF2] font-semibold uppercase mb-2">
          {props.title}
        </h3>
        <p className="text-sm lowercase  text-gray-400 mb-4">
          {props.description}
        </p>
        <span className="text-[#277FF2] text-xl ">$ {props.consumer_price}</span>
      </div>
      <button className="text-white bg-[#F2308B] rounded  px-4 py-1  hover:bg-[#F06FAC] transition-all duration-300 mt-4">
        Comprar
      </button>
    </div>
  );
};

export default CardProduct;
