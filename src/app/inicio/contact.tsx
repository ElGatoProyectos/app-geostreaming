"use client";
import React, { useEffect } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaRegEnvelope } from "react-icons/fa";
import { LuPhoneCall } from "react-icons/lu";
import Aos from "aos";
import "aos/dist/aos.css";
import Link from "next/link";

const contact = () => {
  useEffect(() => {
    Aos.init();
  }, []);
  return (
    <div className=" w-full" id="contact" data-aos="fade-up">
      <div className=" px-4 py-8 md:px-10 max-w-[1440px] mx-auto">
        <h2
          className="text-3xl font-bold uppercase text-[#444444] flex flex-col gap-4 justify-center items-center text-center mb-8"
          data-aos="fade-up"
        >
          Contáctanos<span className="w-12 h-1 bg-[#F2308B]"></span>
        </h2>
        <p className="text-center mb-8" data-aos="fade-up">
          Tienes dudas o ya quieres empezar a trabajar con nosotros. Escríbenos
          o llámanos y te daremos la información necesaria.
        </p>
        <div className="grid grid-cols-1 gap-8 ">
          <div className="grid grid-cols-1 gap-8" data-aos="fade-up">
            {/* <div className="text-center text-[#444444] shadow-box flex flex-col justify-center items-center p-8 bg-white">
              <div className="w-12 h-12 flex items-center justify-center p-2 rounded-full  border-[#F06FAC] border-2 border-dotted bg-white shadow-box mb-4">
                <FaMapMarkerAlt className="text-2xl text-[#F2308B]" />
              </div>
              <h3 className="font-bold text-xl mb-4 text-[#777777]">
                Ubícanos
              </h3>
              <p className="text-sm">
                Argentinos y Pichincha, RIOBAMBA, ECUADOR
              </p>
            </div> */}
            <div className="flex flex-col md:flex-row gap-8">
              <div className="w-full md:w-1/2 text-center text-[#444444] shadow-box flex flex-col justify-center items-center p-8">
                <div className="w-12 h-12 flex items-center justify-center p-2 rounded-full  border-[#F06FAC] border-2 border-dotted bg-white shadow-box mb-4">
                  <FaRegEnvelope className="text-2xl text-[#F2308B]" />
                </div>
                <h3 className="font-bold text-xl mb-4 text-[#777777]">
                  Escríbenos
                </h3>
                <p className="text-sm">ventas@geostreaming.org</p>
              </div>
              <div className="w-full md:w-1/2 text-center text-[#444444] shadow-box flex flex-col justify-center items-center p-8">
                <div className="w-12 h-12 flex items-center justify-center p-2 rounded-full  border-[#F06FAC] border-2 border-dotted bg-white shadow-box mb-4">
                  <LuPhoneCall className="text-2xl text-[#F2308B]" />
                </div>
                <h3 className="font-bold text-xl mb-4 text-[#777777]">
                  Llámanos
                </h3>
                <Link
                  href={"https://wa.link/5hyrwj"}
                  target="_blank"
                  className="text-sm"
                >
                  +593986221088
                </Link>
              </div>
            </div>
          </div>
          {/* <div data-aos="fade-up">
            <form
              action=""
              className="shadow-box p-8 flex flex-col gap-8 text-[#444444] items-center"
            >
              <div className="w-full flex gap-4 justify-between">
                <input
                  type="text"
                  placeholder="Tu nombre"
                  required
                  autoComplete="name"
                  className="w-1/2 p-2 border border-gray-200 outline-none rounded focus:border-[#444] text-[#444]"
                />
                <input
                  type="email"
                  placeholder="Tu email"
                  required
                  autoComplete="email"
                  className="w-1/2 p-2 border border-gray-200 outline-none rounded focus:border-[#444] text-[#444]"
                />
              </div>

              <input
                type="text"
                placeholder="Asunto"
                required
                autoComplete="subject"
                className="w-full p-2 border border-gray-200 outline-none rounded focus:border-[#444] text-[#444]"
              />
              <textarea
                name="message"
                id="messate"
                placeholder="Mensaje"
                className="w-full p-2 border border-gray-200 outline-none rounded focus:border-[#444] text-[#444]"
                rows={5}
              ></textarea>

              <button className="text-white bg-[#F2308B] rounded  px-6 py-2 text-lg hover:bg-[#F06FAC] transition-all duration-300">
                Enviar Mensaje
              </button>
            </form>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default contact;
