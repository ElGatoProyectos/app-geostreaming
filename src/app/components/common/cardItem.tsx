import React from "react";

interface Props {
  isNew?: boolean;
  title: string;
  url: string;
  description?: string;
  type?: string;
  consumer_price?: string;
  distributors_price?: string;
  account_number?: string;
  account_holder?: string;
  btn: string;
  onOpenModal: (title: string, info: CardInfo) => void;
}
interface CardInfo {
  title: string;
  url?: string;
  account_number?: string;
}

const CardItem: React.FC<Props> = (props) => {
  const openModal = () => {
    const info: CardInfo = {
      title: props.title,
      account_number: props.account_number,
      url: props.url,
    };
    props.onOpenModal(props.title, info);
  };

  return (
    <div className="flex flex-col justify-center items-center shadow-cardItem rounded-xl px-4 py-8 relative">
      {props.isNew && (
        <span className="absolute top-0 left-0 -translate-y-1/2 bg-green-600 px-4 py-1 rounded-r-xl rounded-tl-xl font-semibold text-white">
          Nuevo
        </span>
      )}

      <img
        src={props.url}
        alt="logo producto"
        className=" w-24 h-24 object-contain mb-3"
      />
      <div className="text-center flex flex-col">
        <h3 className="text-[#277FF2] font-semibold uppercase mb-2">
          {props.title}
        </h3>
        <p
          className={`capitalize  text-gray-600 mb-4 ${
            props.description ? "text-sm" : ""
          }`}
        >
          {props.description
            ? props.description.toLocaleLowerCase()
            : `Nº. ${props.account_number}`}
        </p>
        <span
          className={`text-[#277FF2] ${props.consumer_price ? "text-xl" : ""} `}
        >
          {/* validar rol de consumidor o distribuidor */}
          {props.consumer_price
            ? `$ ${props.consumer_price}`
            : `${props.account_holder?.toUpperCase()}`}
        </span>
        {props.type && (
          <span className="text-[#888]">{props.type.toUpperCase()}</span>
        )}
      </div>
      <button className="text-white bg-[#F2308B] rounded  px-4 py-1  hover:bg-[#F06FAC] transition-all duration-300 mt-4 capitalize" onClick={openModal}>
        {props.btn} 
      </button>
    </div>
  );
};

export default CardItem;
