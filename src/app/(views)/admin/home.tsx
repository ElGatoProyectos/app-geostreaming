"use client";
import React, { useEffect, useState } from "react";
import { RiUserSharedLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import CountNumber from "@/app/components/countNumber";
import { IoMdCart } from "react-icons/io";
import { MdOutlineAccountBox } from "react-icons/md";
import axios from "axios";

const home = () => {
  const [data, setData] = useState<any>({});
  const [products, setProducts] = useState<any>({});
  const [afiliados, setAfiliados] = useState<any>({});
  const fetchData = async () => {
    const response = await axios.get("/api/dashboard");
    setProducts(response.data.productosMasVendidos);
    setAfiliados(response.data.topAfiliados);
    setData(response.data);
  };
  useEffect(() => {
    fetchData();
  }, []);

  const infoCards = [
    {
      title: "Afiliados",
      number: data.afiliados,
      icon: <RiUserSharedLine className="text-xl mx-auto" />,
      span: "registrados",
    },
    {
      title: "Consumidores",
      number: data.consumidores,
      icon: <FaUsers className="text-xl mx-auto" />,
      span: "registrados",
    },
    {
      title: "Productos",
      number: data.cantidadDeProductos,
      icon: <IoMdCart className="text-xl mx-auto" />,
      span: "disponibles",
    },
    {
      title: "Cuentas",
      number: data.cuentasDeVenta,
      icon: <MdOutlineAccountBox className="text-xl mx-auto" />,
      span: "activas",
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-4 gap-8">
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
      <div className="mt-8 grid md:grid-cols-2 xl:grid-cols-2 lg:grid-cols-1 gap-8">
        {/* productos */}
        <div className="w-full rounded-lg bg-white p-6  shadow-box  transition-all duration-500">
          <h2 className=" text-xl capitalize mb-4 text-[#444] font-medium">
            Productos
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
                {products.length > 0 ? (
                  products.slice(0, 15).map((product: any, index: number) => (
                    <tr key={index} className="text  text-[#666]">
                      <td className="p-2">{index + 1}</td>
                      <td className="p-2">{product.name}</td>
                      <td className="p-2 text-center">
                        {product._count.Account !== undefined
                          ? product._count.Account
                          : 0}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} className="p-2 text-[#666]">
                      Sin productos
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
        {/* afiliados */}
        <div className="w-full rounded-lg bg-white p-6  shadow-box  transition-all duration-500">
          <h2 className=" text-xl capitalize mb-4 text-[#444] font-medium">
            Usuarios
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full table-auto">
              <thead className="bg-[#F3F6F9] font-medium text-[#888] text-sm">
                <tr>
                  <th className="p-2 text-left">N</th>
                  <th className="p-2 text-left">Usuario</th>
                  <th className="p-2 text-center">N de afiliados</th>
                  {/* <th className="p-2 text-center">Ventas</th> */}
                </tr>
              </thead>
              <tbody>
                {afiliados.length > 0 ? (
                  afiliados
                    .slice(0, 15)
                    .map((afiliados: any, index: number) => (
                      <tr key={index} className="text  text-[#666]">
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">
                          {afiliados.Nombre_del_afiliador}
                        </td>
                        <td className="p-2 text-center">
                          {afiliados.Cuantos_usuarios_tienen_el_Ref_id}
                        </td>
                        {/* <td className="p-2 text-center">{afiliados.Ventas_del_afiliador}</td> */}
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={3} className="p-2 text-[#666]">
                      Sin afiliados
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default home;
