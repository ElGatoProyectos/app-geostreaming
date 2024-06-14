"use client";
import Link from "next/link";
import React, { useState } from "react";

const navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <div className="fixed z-10 top-0 left-0 h-[60px] shadow w-screen bg-white  ">
      <div className="h-full w-full px-4 md:px-8 gap- py-2  flex justify-between items-center max-w-[1440px] mx-auto">
        <Link href={"/"} className="h-full">
          <img
            className="h-full w-auto object-contain"
            src="/logo2.png"
            alt="Geostreaming"
          />
        </Link>
        <div className="flex gap-4 md:gap-4">
          <Link
            href={"../users/register"}
            className="bg-[#F2308B] rounded text-white text-sm md:text-base px-3 md:px-4 py-1 md:py-2"
          >
            Regístrate
          </Link>
          <Link
            href={"../users/login"}
            className="bg-[#F2308B] rounded text-white text-sm md:text-base px-3 md:px-4 py-1 md:py-2"
          >
            Ingresa
          </Link>

          <button onClick={toggleMenu}>
            <svg
              className="w-5 h-5 md:w-8 md:h-8"
              width="100%"
              height="100%"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_5_11)">
                <path
                  d="M18.75 17.5H1.25001C0.559623 17.5 0 16.9403 0 16.25C0 15.5597 0.559623 15 1.25001 15H18.75C19.4404 15 20 15.5597 20 16.25C20 16.9403 19.4404 17.5 18.75 17.5Z"
                  fill="black"
                />
                <path
                  d="M18.75 11.25H1.25001C0.559623 11.25 0 10.6904 0 10C0 9.30968 0.559623 8.75002 1.25001 8.75002H18.75C19.4404 8.75002 20 9.30964 20 10C20 10.6904 19.4404 11.25 18.75 11.25Z"
                  fill="black"
                />
                <path
                  d="M18.75 4.99999H1.25001C0.559623 4.99999 0 4.44036 0 3.74998C0 3.05959 0.559623 2.49997 1.25001 2.49997H18.75C19.4404 2.49997 20 3.05959 20 3.74998C20 4.44036 19.4404 4.99999 18.75 4.99999Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_5_11">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
        </div>
      </div>

      {/* submenues */}
      {menuOpen && (
        <div className="fixed top-0 left-0 w-screen  h-screen z-50 bg-black bg-opacity-90  pt-14 px-4 pb-4 overflow-hidden ">
          <button onClick={toggleMenu} className="absolute top-5 right-5 ">
            <svg
              width="14"
              height="14"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_6_55)">
                <path
                  d="M1.03344 20.0001C0.769987 20.0001 0.506538 19.8998 0.306377 19.6982C-0.0954524 19.2963 -0.0954524 18.6449 0.306377 18.2431L18.2481 0.301372C18.6499 -0.100457 19.3014 -0.100457 19.7032 0.301372C20.105 0.703201 20.105 1.35467 19.7032 1.75675L1.76175 19.6982C1.56008 19.8986 1.29664 20.0001 1.03344 20.0001Z"
                  fill="white"
                />
                <path
                  d="M18.9764 20.0001C18.7129 20.0001 18.4497 19.8998 18.2493 19.6982L0.306377 1.75675C-0.0954524 1.35467 -0.0954524 0.703201 0.306377 0.301372C0.708206 -0.100457 1.35967 -0.100457 1.76175 0.301372L19.7032 18.2431C20.105 18.6449 20.105 19.2963 19.7032 19.6982C19.5015 19.8986 19.2383 20.0001 18.9764 20.0001Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_6_55">
                  <rect width="20" height="20" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </button>
          <div className="w-full h-full flex flex-col gap-4 bg-white p-6">
            <ul className=" flex flex-col gap-4 font-primarySemibold">
              <li className="text-[#F2308B] hover:text-[#F2308B] transition-all duration-300">
                Inicio
              </li>
              <li className=" hover:text-[#F2308B] transition-all duration-300">
                Nosotros
              </li>
              <li className=" hover:text-[#F2308B] transition-all duration-300">
                Servicios
              </li>
              <li className=" hover:text-[#F2308B] transition-all duration-300">
                Productos
              </li>
              <li className=" hover:text-[#F2308B] transition-all duration-300">
                Contáctanos
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default navigation;
