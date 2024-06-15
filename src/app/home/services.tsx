"use client";
import { BsBuildings } from "react-icons/bs";
import { BsEmojiLaughing } from "react-icons/bs";
import { BsEmojiWink } from "react-icons/bs";
import { RiCheckDoubleLine } from "react-icons/ri";
import { useState } from "react";

interface Service {
  name: string;
  nameService: string;
  url: string;
  items: string[];
  description: string;
}

const services = () => {
  const dServices: Service[] = [
    {
      name: "Servicio para Consumidores Finales.",
      nameService: "Consumidor Final",
      url: "https://www.sitiospremium.com/imagenes/interfazexterna/tabs-2.jpg",
      items: [
        "Compra al precio más bajo del mercado.",
        "Entrega inmediata dependiendo el stock.",
        "Las credenciales de la cuenta que compres son personales y te llegan a tu correo o Whatsapp.",
      ],
      description:
        "Pasa los fines de semana en compañía de tu familia o amigos disfrutando de las mejores películas, canales o series que brinda cada una de las plataformas de streaming que tenemos disponible.",
    },
    {
      name: "Servicio para distribuidores",
      nameService: "Distribuidor",
      url: "https://sitiospremium.com/imagenes/interfazexterna/tabs-1.jpg",
      items: [
        "Vende cada uno de nuestros productos al mejor costo de distribución que puedes encontrar.",
        "Genera ganancias ilimitadas con cada venta que realices.",
        "Ofrece más productos en tu negocio y no dejes de tener nuevos clientes.",
      ],
      description:
        "Si tienes una tienda, farmacia, cyber o cualquier tipo de negocio contáctanos y ofrece cuentas de entretenimiento para que obtengas más ganancias.",
    },
    {
      name: "Servicio Web Service",
      nameService: "Web Service",
      url: "https://sitiospremium.com/imagenes/interfazexterna/tabs-3.png",
      items: [
        "Conecta tu plataforma con la nuestra bajo los estándares más seguros.",
        "Evita realizar ventas manuales.",
        " Aumenta tu cartera de productos.",
      ],
      description:
        "Si tienes una plataforma y necesitas nuestro servicio automático, contáctate con nosotros y distribuye nuestros servicios de una manera más segura..",
    },
  ];

  const [selectedService, setSelectedService] = useState<Service>(dServices[0]);

  const handleServiceClick = (service: Service) => {
    setSelectedService(service);
  };

  return (
    <div id="services">
      <div className="flex flex-col gap-8 px-4 md:px-10 max-w-[1440px] mx-auto">
        <div>
          <ul className="flex gap-8 w-4/5 mx-auto lg:w-[60%] text-[#444444]">
            {dServices.map((service, index) => (
              <li
                key={index}
                className={`w-1/3 border border-gray-300 group hover:border-gray-200 transition-all duration-300  ${
                  selectedService.name === service.name
                    ? "bg-[#F2308B] text-white"
                    : ""
                } `}
                onClick={() => handleServiceClick(service)}
              >
                <div className="w-full p-4 flex md:py-8 justify-center items-center">
                  {index === 0 && (
                    <BsEmojiLaughing
                      className={`text-3xl transition-all duration-300 ${
                        selectedService.name === service.name
                          ? "text-white"
                          : "group-hover:text-[#F2308B]"
                      }`}
                    />
                  )}
                  {index === 1 && (
                    <BsEmojiWink
                      className={`text-3xl transition-all duration-300 ${
                        selectedService.name === service.name
                          ? "text-white"
                          : "group-hover:text-[#F2308B]"
                      }`}
                    />
                  )}
                  {index === 2 && (
                    <BsBuildings
                      className={`text-3xl transition-all duration-300 ${
                        selectedService.name === service.name
                          ? "text-white"
                          : "group-hover:text-[#F2308B]"
                      }`}
                    />
                  )}
                  <span
                    className={`capitalize text-xl hidden lg:inline ml-2 transition-all duration-300 ${
                      selectedService.name === service.name
                        ? "text-white"
                        : "group-hover:text-[#F2308B]"
                    }`}
                  >
                    {service.nameService}
                  </span>
                </div>
              </li>
            ))}

{/*             <li className="w-1/3 border border-gray hover:border-gray-200 transition-all duration-300-300 group ">
              <button className="w-full p-4 flex md:py-8 justify-center items-center lg:gap-2">
                <BsEmojiWink className="text-3xl group-hover:text-[#F2308B] transition-all duration-300" />
                <span className=" capitalize text-xl hidden lg:inline ml-2 group-hover:text-[#F2308B] transition-all duration-300">
                  distribuidor
                </span>
              </button>
            </li>
            <li className="w-1/3 border border-gray-300 group hover:border-gray-200 transition-all duration-300 ">
              <button className="w-full p-4 flex md:py-8 justify-center items-center">
                <BsBuildings className="text-3xl group-hover:text-[#F2308B]  transition-all duration-300" />
                <span className=" capitalize text-xl hidden lg:inline ml-2 group-hover:text-[#F2308B] transition-all duration-300">
                  web service
                </span>
              </button>
            </li> */}
          </ul>
        </div>
        <div className=" flex flex-col lg:flex-row-reverse lg:gap-8">
          {/* img */}
          <img
            className="h-[500px] object-cover w-full"
            src={selectedService.url}
            alt="consumidores finales"
          />
          <div className="flex flex-col gap-4 mt-4 text-[#444444]">
            {/* title */}
            <h3 className="text-[1.5rem] font-semibold ">
              {selectedService.name}
            </h3>
            <ul>
              {selectedService.items.map((item, index) => (
               <li className="mb-4">
                <RiCheckDoubleLine className="text-[#F2308B] text-xl inline-block" />
                <span>{item}</span>
              </li> 
              ))}
              
             {/*  <li className="mb-4">
                <RiCheckDoubleLine className="text-[#F2308B] text-xl inline-block" />
                <span>Entrega inmediata dependiendo el stock.</span>
              </li>
              <li className="mb-4">
                <RiCheckDoubleLine className="text-[#F2308B] text-xl inline-block" />
                <span>
                  Las credenciales de la cuenta que compres son personales y te
                  llegan a tu correo o Whatsapp.
                </span>
              </li> */}
            </ul>
            <p>
              {/* description */}
              {selectedService.description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default services;
