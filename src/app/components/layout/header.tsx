"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { IoNotificationsOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { MdLockReset } from "react-icons/md";
import { FaRegClock } from "react-icons/fa6";


import { BiSolidWallet } from "react-icons/bi";

import Sidebar from "./sidebar";

/* interface User {
  userRole: string;
  username: string;
  userEmail: string;
  userAvatar: string;
} */
const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [perfilOpen, setPerfilOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };
  const togglePerfil = () => {
    setPerfilOpen(!perfilOpen);
    setNotificationOpen(false)
  };
  const toggleNotifications = () => {
    setNotificationOpen(!notificationOpen);
    setPerfilOpen(false);
  };

  const userRole = "admin";
  const username = "Nombre del admin";
  const userEmail = "admin@gmail.com";
  const userAvatar = "/user.jpg";

  return (
    <div className=" user-select-none fixed z-20 top-0 left-0 h-[70px] shadow w-full bg-white text-[#444}">
      <div className="relative flex w-full h-full justify-between px-4 lg:px-8  gap-2">
        <Link href={"/"} className="h-full py-2 content-center ">
          <img
            className="h-full w-auto object-contain "
            src="/logo.png"
            alt="Geostreaming"
            loading="lazy"
          />
        </Link>

        <div className="flex gap-4 lg:gap-8 items-center">
          <button
            className="rounded-full p-2  hover:bg-gray-200 transition-all duration-300 relative"
            onClick={toggleNotifications}
          >
            <IoNotificationsOutline className="text-[#888] text-2xl " />
            <div className="bg-red-500 absolute rounded-full text-white px-[6px] py-0.5 top-0 left-1/2 text-[10px]">
              3
            </div>
            
          </button>
          <Link
            href={"/creditaciones"}
            className=" rounded-full w-fit h-fit px-4 py-2 hover:bg-gray-200 flex items-center gap-2 transition-all duration-300"
          >
            <BiSolidWallet className="text-2xl text-yellow-800 inline-block" />
            <span className="text-[#888] text-lg">$ 21.87</span>
          </Link>
          <div
            className="gap-4 items-center h-full bg-gray-200 p-4 cursor-pointer relative hidden md:flex"
            onClick={togglePerfil}
          >
            <img
              src="/user.jpg"
              alt="user"
              className="h-full w-auto object-cover rounded-full "
              loading="lazy"
            />
            <div>
              <p className="text-sm text-[#444]">{username}</p>
              <p className="text-xs text-[#888]">{userRole}</p>
            </div>
            {/* card profile */}
            {perfilOpen && (
              <div className="absolute top-[65px]  bg-white shadow-cardFloat w-fit right-0 flex flex-col gap-4 pt-8 items-center rounded-md animate-keep-slide-down">
                <img
                  src={userAvatar}
                  alt="user"
                  className="h-20 w-20 object-cover rounded-full shadow "
                  loading="lazy"
                />
                <div>
                  <p className="text-center text-sm text-[#444] mb-1">
                    {username}
                  </p>
                  <p className="text-center text-xs text-[#888]">{userEmail}</p>
                </div>
                <ul>
                  <li>
                    <Link
                      href={"user/perfil"}
                      className="w-full flex gap-4 border-b border-gray-200 px-6 py-2 text-[#888] whitespace-nowrap hover:bg-[#f3f3f9]"
                    >
                      <FaRegUser className="text-xl text-[#F2308B]" /> Mi Perfil
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"user/contrasenia"}
                      className="w-full flex gap-4 border-b border-gray-200 px-6 py-2 text-[#888] whitespace-nowrap hover:bg-[#f3f3f9]"
                    >
                      <MdLockReset className="text-xl text-[#F2308B]" /> Cambiar
                      contraseña
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={"ingresar"}
                      className="w-full flex gap-4 px-6 py-2 text-[#888] whitespace-nowrap hover:bg-[#f3f3f9]"
                    >
                      <IoMdLogOut className="text-xl text-[#F2308B]" /> Cerrar
                      sesión
                    </Link>
                  </li>
                </ul>
              </div>
            )}
          </div>
          <button onClick={toggleMenu} className="lg:hidden">
            <IoMenu className="text-3xl md:text-3xl text-[#888]" />
          </button>
        </div>
        {/* notifications */}
        {notificationOpen && (
              <div className="z-20 absolute top-[50px]  right-4 bg-white shadow-cardFloat w-[90%]   lg:w-[350px] lg:right-[440px] py-8 rounded-md animate-keep-slide-down px-4 text-[#666] text-sm">
                <h2 className="font-semibold">Notificaciones</h2>
                <span className="text-[#888] text-xs">
                  Tienes{" "}
                  <span className="text-[#F2308B] ">2 notificaciones</span> sin
                  leer
                </span>
                <div className="scrollbarFit max-h-[400px] overflow-y-auto pr-2 ">
                  {/* sin leer */}
                  <div className="mb-6">
                    <h3 className="text-left my-2 font-semibold">Sin leer</h3>
                    <div className="flex flex-col gap-4">
                      <div className="text-left rounded-lg px-4 py-2 hover:bg-gray-200 transition-all duration-300 border-b border-[#F2308B]">
                        {/* icono */}
                        <span className=" font-medium capitalize">
                          titulo de notificacion
                        </span>
                        <p className=" text-[#888] mb-2">
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Fuga dolorum repellat ducimus laborum modi
                          facilis.
                        </p>
                        <span className="text-xs text-[#aaa] flex items-center "> <FaRegClock className="inline-block mr-1 " />hace 8s</span>
                      </div>
                    </div>
                  </div>
                  {/* leidas */}
                  <div>
                    <h3 className="text-left my-2">Leidas</h3>
                    <div className="flex flex-col gap-4">
                      <div className="text-left rounded-lg p-4 hover:bg-gray-200 transition-all duration-300 border-b ">
                        <span className=" capitalize">
                          titulo de notificacion
                        </span>
                        <p className=" text-[#888]">
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit. Fuga dolorum repellat ducimus laborum modi
                          facilis.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
      </div>
      <Sidebar isOpen={menuOpen} role={userRole} />
    </div>
  );
};

export default Header;
