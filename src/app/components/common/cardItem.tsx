import React from "react";

interface Props {
  isNew?: boolean;
  id:  number;
  title: string;
  url: string;
  description?: string;
  type?: string;
  price_in_cents?: number;
  price_distributor_in_cents?: number;
  account_number?: string;
  account_holder?: string;
  btn: string;
  onOpenModal: (title: string, info: CardInfo) => void;
}
interface CardInfo {
  id: number;
  title: string;
  url?: string;
  account_number?: string;
}

const CardItem: React.FC<Props> = (props) => {
  const openModal = () => {
    const info: CardInfo = {
      id: props.id,
      title: props.title,
      account_number: props.account_number,
      url: props.url,
    };
    props.onOpenModal(props.title, info);
  };
  /* consultar */
  return (
    <div className="flex flex-col justify-center items-center shadow-cardItem rounded-full w-full md:w-[40%] xl:w-[25%] aspect-square px-4 py-8 relative overflow-y-auto">
      {props.isNew && (
        <span className="absolute top-0 left-0 -translate-y-1/2 bg-green-600 px-4 py-1 rounded-r-xl rounded-tl-xl font-semibold text-white">
          Nuevo
        </span>
      )}

      <img
        src={props.url}
        alt="logo producto"
        className=" rounded-full aspect-square w-24 h-24 object-cover mb-3"
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
          className={`text-[#277FF2] ${props.price_in_cents ? "text-xl" : ""} `}
        >
          {/* validar rol de consumidor o distribuidor */}
          {props.price_in_cents
            ? `$ ${props.price_in_cents}`
            : `${props.account_holder?.toUpperCase()}`}
        </span>
        {props.type && (
          <span className="text-[#888]">{props.type.toUpperCase()}</span>
        )}
      </div>
      <button className="text-white bg-[#F2308B] rounded-full  px-4 py-1  hover:bg-[#F06FAC] transition-all duration-300 mt-4 capitalize" onClick={openModal}>
        {props.btn} 
      </button>
    </div>
  );
};

export default CardItem;
