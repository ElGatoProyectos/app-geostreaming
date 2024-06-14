"use client";
import { BsBuildings } from "react-icons/bs";
import { BsEmojiLaughing } from "react-icons/bs";
import { BsEmojiWink } from "react-icons/bs";
import { IoBagCheckOutline } from "react-icons/io5";
import { BsEmojiSmile } from "react-icons/bs";
import { BsCashCoin } from "react-icons/bs";
import { BsCart4 } from "react-icons/bs";

import CountNumber from "../components/countNumber";


const about = () => {
  return (
    <div className=" py-[60px] ">
      <div className="relative px-4 md:px-8">
        <div className="section-bg  py-[120px] flex flex-col gap-20">
          <div className="flex gap-8 flex-col text-center">
            <h2 className="text-white text-3xl font-bold">¿Quiénes Somos?</h2>
            <p className="text-white">
              Esta es una plataforma que te proveé de cuentas de varias
              plataformas de entretenimiento, brindamos diferentes servicios
              para distribuidores y consumidores finales, siempre manejándonos
              con un excelente y eficaz servicio al cliente.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-4">
            <div className=" flex flex-col justify-center items-center text-center gap-2 ">
              <BsEmojiLaughing className="text-[#F2308B] text-4xl" />
              <h3 className="text-white font-semibold text-xl capitalize">
                Consumidor Final
              </h3>
              <p className="text-[#848484]">
                Compra la cuenta que más te guste a los precios más bajos del
                mercado.
              </p>
            </div>
            <div className=" flex flex-col justify-center items-center text-center gap-2 px-4">
              <BsEmojiWink className="text-[#F2308B] text-4xl" />
              <h3 className="text-white font-semibold text-xl capitalize">
                Distribuidor
              </h3>
              <p className="text-[#848484]">
                Vende diferentes cuentas de entretenimiento y genera comisiones
                con cada venta que realices.
              </p>
            </div>
            <div className=" flex flex-col justify-center items-center text-center gap-2 px-4">
              <BsBuildings className="text-[#F2308B] text-4xl" />
              <h3 className="text-white font-semibold text-xl capitalize">
                Web Service
              </h3>
              <p className="text-[#848484]">
                Conecta nuestro servicio con tu plataforma mediante una
                tecnología segura y confiable.
              </p>
            </div>
            <div className=" flex flex-col justify-center items-center text-center gap-2 px-4">
              <IoBagCheckOutline className="text-[#F2308B] text-4xl" />
              <h3 className="text-white font-semibold text-xl capitalize">
                Garantía
              </h3>
              <p className="text-[#848484]">
                Todos nuestros productos son originales, teniendo garantías
                durante el tiempo que dure la contratación del servicio
                streaming.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col gap-14 text-[#444444] px-4 md:flex-row  md:flex-wrap md:justify-center">
        <div className="relative shadow-box flex flex-col justify-center items-center py-8 gap-2 bg-white md:w-1/3 ">
          <div className="bg-white w-14 h-14 rounded-full text center shadow-[0px_2px_35px_rgba(0,0,0,0.1);] flex justify-center items-center absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2">
            <BsEmojiSmile className="text-[#F2308B] text-2xl" />
          </div>
          <span className="font-light text-lg">Más de</span>
          <div className="font-bold text-4xl">
            <CountNumber n={300}></CountNumber>
          </div>
          <span className="text-[#848484] text-sm">Clientes felices</span>
        </div>
        <div className="relative shadow-box flex flex-col justify-center items-center py-8 gap-2 bg-white md:w-1/3 ">
          <div className="bg-white w-14 h-14 rounded-full text center shadow-[0px_2px_35px_rgba(0,0,0,0.1);] flex justify-center items-center absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2">
            <BsCashCoin className="text-[#F2308B] text-2xl" />
          </div>
          <span className="font-light text-lg">Más de</span>
          <div className="font-bold text-4xl text-[#0D0D0D]">
            <CountNumber n={2500}></CountNumber>
          </div>
          <span className="text-[#848484] text-sm">Ventas</span>
        </div>
        <div className="relative shadow-box flex flex-col justify-center items-center py-8 gap-2 bg-white md:w-1/3 ">
          <div className="bg-white w-14 h-14 rounded-full text center shadow-[0px_2px_35px_rgba(0,0,0,0.1);] flex justify-center items-center absolute left-1/2 -translate-x-1/2 top-0 -translate-y-1/2">
            <BsCart4 className="text-[#F2308B] text-2xl" />
          </div>
          <span className="font-light text-lg">Más de</span>
          <div className="font-bold text-4xl">
            <CountNumber n={100}></CountNumber>
          </div>
          <span className="text-[#848484] text-sm">Productos</span>
        </div>
      </div>
    </div>
  );
};

export default about;
