"use client";
import React from "react";
import { RiUserSharedLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import CountNumber from "@/app/components/countNumber";
import { IoMdCart } from "react-icons/io";
import { MdOutlineAccountBox } from "react-icons/md";

const home = () => {
  const infoCards = [
    {
      title: "Afiliados",
      number: 100,
      icon: <RiUserSharedLine className="text-xl mx-auto" />,
      span: "registrados",
    },
    {
      title: "Consumidores",
      number: 100,
      icon: <FaUsers className="text-xl mx-auto" />,
      span: "registrados",
    },
    {
      title: "Productos",
      number: 100,
      icon: <IoMdCart className="text-xl mx-auto" />,
      span: "disponibles",
    },
    {
      title: "Cuentas",
      number: 100,
      icon: <MdOutlineAccountBox className="text-xl mx-auto" />,
      span: "activas",
    },
  ];

  /* usuario */
  const topAfiliados = [
    { name: "Afiliado 1", avatar: "./user.jpg", ventas: 100, consumidores: 5 },
    { name: "Afiliado 2", avatar: "./user.jpg", ventas: 90, consumidores: 5 },
    { name: "Afiliado 3", avatar: "./user.jpg", ventas: 80, consumidores: 5 },
    { name: "Afiliado 4", avatar: "./user.jpg", ventas: 70, consumidores: 5 },
    { name: "Afiliado 5", avatar: "./user.jpg", ventas: 60, consumidores: 5 },
  ];

  const topProducts = [
    { name: "Producto 1", cantidad: 100 },
    { name: "Producto 2", cantidad: 90 },
    { name: "Producto 3", cantidad: 80 },
    { name: "Producto 4", cantidad: 70 },
    { name: "Producto 5", cantidad: 60 },
  ];

  return (
    <>
      <div className="grid grid-cols-2 2xl:grid-cols-4 gap-6">
        {infoCards.map((card, index) => (
          <div
            key={index}
            className="w-full rounded-lg bg-white p-6 flex items-start justify-between text-[#888] gap-4 shadow-box hover:-translate-y-2 transition-all duration-500 "
          >
            <div className="">
              <h2 className="capitalize mb-4 text-xl">{card.title}</h2>

              <p className="text-3xl  text-[#444] ">
                <CountNumber n={card.number}></CountNumber>
              </p>
              <span className="text-xs lowercase">{card.span}</span>
            </div>

            <div className="bg-[#EEDFFA] rounded-full w-12 h-12 content-center  text-[#F2308B] p-1">
              {card.icon}
            </div>
          </div>
        ))}
      </div>
      {/* tops */}
      <div className="mt-6 grid md:grid-cols-2 gap-6">
        {/* productos */}
        <div className="w-full rounded-lg bg-white p-6  shadow-box  transition-all duration-500">
          <h2 className=" text-xl capitalize mb-4 text-[#444] font-medium">
            Top 5 de productos más vendidos
          </h2>
          <table className="table-auto w-full rounded-md">
            <thead className="bg-[#F3F6F9] font-medium text-[#888] text-sm">
              <tr>
                <td className="p-2">N</td>
                <td className="p-2">Producto</td>
                <td className="p-2">Cantidad</td>
              </tr>
            </thead>
            <tbody>
              {topProducts.map((product, index) => (
                <tr className="text  text-[#666]">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2">{product.name}</td>
                  <td className="p-2">{product.cantidad}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* bancos */}
        <div className="w-full rounded-lg bg-white p-6  shadow-box  transition-all duration-500">
          <h2 className=" text-xl capitalize mb-4 text-[#444] font-medium">
            Top 5 de Bancos más usados
          </h2>
          <table className="table-auto w-full rounded-md">
            <thead className="bg-[#F3F6F9] font-medium text-[#888] text-sm">
              <tr>
                <td className="p-2">N</td>
                <td className="p-2">Banco</td>
                <td className="p-2">Transacciones</td>
              </tr>
            </thead>
            <tbody>
              {topAfiliados.map((afiliado, index) => (
                <tr className="text  text-[#666]">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2 flex items-center gap-2">
                    banco
                  </td>
                  <td className="p-2">100</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* afiliados */}
        <div className="w-full rounded-lg bg-white p-6  shadow-box  transition-all duration-500">
          <h2 className=" text-xl capitalize mb-4 text-[#444] font-medium">
            Top 5 de Afiliados
          </h2>
          <table className="table-auto w-full rounded-md">
            <thead className="bg-[#F3F6F9] font-medium text-[#888] text-sm">
              <tr>
                <td className="p-2">N</td>
                <td className="p-2">Afiliado</td>
                <td className="p-2">Consumidores</td>
                <td className="p-2">ventas</td>
              </tr>
            </thead>
            <tbody>
              {topAfiliados.map((afiliado, index) => (
                <tr className="text  text-[#666]">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2 flex items-center gap-2">
                    <img
                      className="h-6 w-6 object-cover rounded-full inline-block"
                      src={afiliado.avatar}
                      alt={afiliado.name}
                    />
                    {afiliado.name}
                  </td>
                  <td className="p-2">{afiliado.consumidores}</td>
                  <td className="p-2">{afiliado.ventas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
              {/* consumidores */}
        <div className="w-full rounded-lg bg-white p-6  shadow-box  transition-all duration-500">
          <h2 className=" text-xl capitalize mb-4 text-[#444] font-medium">
            Top 5 de consumidores
          </h2>
          <table className="table-auto w-full rounded-md">
            <thead className="bg-[#F3F6F9] font-medium text-[#888] text-sm">
              <tr>
                <td className="p-2">N</td>
                <td className="p-2">Consumidor</td>
                <td className="p-2">Cuentas</td>
                <td className="p-2">Créditos</td>
              </tr>
            </thead>
            <tbody>
              {topAfiliados.map((afiliado, index) => (
                <tr className="text  text-[#666]">
                  <td className="p-2">{index + 1}</td>
                  <td className="p-2 flex items-center gap-2">
                    consumidor
                  </td>
                  <td className="p-2">10</td>
                  <td className="p-2">$ 50.00</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default home;
