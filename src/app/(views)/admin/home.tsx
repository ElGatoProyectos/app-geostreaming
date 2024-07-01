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
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-6">
        {infoCards.map((card, index) => (
          <div
            key={index}
            className="w-full rounded-lg bg-white p-6 flex items-start justify-between text-[#888] gap-2 shadow-box hover:-translate-y-2 transition-all duration-500 "
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
      <div className="mt-6 grid md:grid-cols-2 xl:grid-cols-2 lg:grid-cols-1 gap-6">
        {/* productos */}
        <div className="w-full rounded-lg bg-white p-6  shadow-box  transition-all duration-500">
          <h2 className=" text-xl capitalize mb-4 text-[#444] font-medium">
            Top 5 productos más vendidos
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-[#F3F6F9] font-medium text-[#888] text-sm">
                <tr>
                  <th className="p-2 text-left">N</th>
                  <th className="p-2 text-left">Producto</th>
                  <th className="p-2 text-center">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product, index) => (
                  <tr key={index} className="text  text-[#666]">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2">{product.name}</td>
                    <td className="p-2 text-center">{product.cantidad}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* bancos */}
        <div className="w-full rounded-lg bg-white p-6  shadow-box  transition-all duration-500">
          <h2 className=" text-xl capitalize mb-4 text-[#444] font-medium">
            Top 5 Bancos más usados
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-[#F3F6F9] font-medium text-[#888] text-sm">
                <tr>
                  <th className="p-2 text-left">N</th>
                  <th className="p-2 text-left">Banco</th>
                  <th className="p-2 text-center">Transacciones</th>
                </tr>
              </thead>
              <tbody>
                {topAfiliados.map((afiliado, index) => (
                  <tr key={index} className="text  text-[#666]">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2 flex flex-wrap items-center gap-2">banco</td>
                    <td className="p-2 text-center">100</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* afiliados */}
        <div className="w-full rounded-lg bg-white p-6  shadow-box  transition-all duration-500">
          <h2 className=" text-xl capitalize mb-4 text-[#444] font-medium">
            Top 5 Afiliados
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-[#F3F6F9] font-medium text-[#888] text-sm">
                <tr>
                  <th className="p-2 text-left">N</th>
                  <th className="p-2 text-left">Afiliado</th>
                  <th className="p-2 text-center">Consumidores</th>
                  <th className="p-2 text-center">ventas</th>
                </tr>
              </thead>
              <tbody>
                {topAfiliados.map((afiliado, index) => (
                  <tr key={index} className="text  text-[#666]">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2 flex flex-wrap items-center gap-2">
                      <img
                        className="h-6 w-6 object-cover rounded-full inline-block"
                        src={afiliado.avatar}
                        alt={afiliado.name}
                      />
                      {afiliado.name}
                    </td>
                    <td className="p-2 text-center">{afiliado.consumidores}</td>
                    <td className="p-2 text-center">{afiliado.ventas}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {/* consumidores */}
        <div className="w-full rounded-lg bg-white p-6  shadow-box  transition-all duration-500">
          <h2 className=" text-xl capitalize mb-4 text-[#444] font-medium">
            Top 5 consumidores
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-[#F3F6F9] font-medium text-[#888] text-sm">
                <tr>
                  <th className="p-2 text-left">N</th>
                  <th className="p-2 text-left">Consumidor</th>
                  <th className="p-2 text-center">Cuentas</th>
                  <th className="p-2 text-center">Créditos</th>
                </tr>
              </thead>
              <tbody>
                {topAfiliados.map((afiliado, index) => (
                  <tr key={index} className="text  text-[#666]">
                    <td className="p-2">{index + 1}</td>
                    <td className="p-2 flex flex-wrap items-center gap-2">
                      <img
                        className="h-6 w-6 object-cover rounded-full inline-block"
                        src={afiliado.avatar}
                        alt={afiliado.name}
                      />
                      consumidor
                    </td>
                    <td className="p-2 text-center">10</td>
                    <td className="p-2 text-center">$ 50.00</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default home;
