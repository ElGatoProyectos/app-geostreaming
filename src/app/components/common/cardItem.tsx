"use client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

interface Props {
  isNew?: boolean;
  id: number;
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
  const [balance, setBalance]  = useState<number | null>(null)
  const session = useSession();
  
  const openModal = () => {
    const info: CardInfo = {
      id: props.id,
      title: props.title,
      account_number: props.account_number,
      url: props.url,
    };
    props.onOpenModal(props.title, info);
  };

  const fetchBalance = async () => {
    const response = await axios.get(`/api/user/${session.data?.user.id}`);
    const balanceDollars = parseFloat((response.data.balance_in_cents / 100).toFixed(2));
    setBalance(balanceDollars);
  };

  useEffect(() => {
    if(session.status === 'authenticated'){
      fetchBalance();
    }
  }, [session]);

  const productPrice =
  session.data?.user.role === "DISTRIBUTOR"
    ? (props.price_distributor_in_cents! / 100).toFixed(2)
    : (props.price_in_cents! / 100).toFixed(2);


  return (
    <div className="flex flex-col justify-center items-center   w-full rounded-2xl px-4 py-8 relative overflow-y-auto h-full">
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
          {props.account_holder ? `${props.account_holder?.toUpperCase()}`
            : `$ ${productPrice}`}
        </span>
        {props.type && (
          <span className="text-[#888]">{props.type.toUpperCase()}</span>
        )}
      </div>
      <button
        className="text-white bg-[#F2308B] rounded-full  px-4 py-1  hover:bg-[#F06FAC] transition-all duration-300 mt-4 capitalize disabled:bg-[#E3ABC6]"
        onClick={openModal}
        disabled={balance !== null && balance < parseFloat(productPrice)}
      >
        {props.btn}
      </button>

    </div>
  );
};

export default CardItem;
