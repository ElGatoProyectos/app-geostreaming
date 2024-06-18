"use client";
import Link from "next/link";
import React, { useState } from "react";
import { IoMenu } from "react-icons/io5";
import { MdNotificationsActive } from "react-icons/md";
import Sidebar from "./sidebar";


const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  /* role segun sesion */
  const userRole = "admin";

  return (
    <div className="fixed z-10 top-0 left-0 h-[100px] shadow w-full bg-[#277FF2] ">
      <div className="flex w-full h-full justify-between px-4 lg:px-8  gap-2">
        <Link href={"/"} className="h-full md:py-3 content-center ">
          <img
            className="h-[60px] md:h-full w-auto object-contain "
            src="/logo-blanco.png"
            alt="Geostreaming"
          />
        </Link>
        <div className="flex gap-4 lg:gap-12 py-6 items-center">
          <button className="border border-white rounded py-2 px-1 shadow-xl shadow-white hover:scale-75 transition-all duration-300">
            <MdNotificationsActive className="text-white text-xl md:text-3xl" />
          </button>
          <div>
            <ul className="text-white text-sm ">
              <li>
                Usuario: <span>{userRole}</span>
              </li>
              <li className="">
                Rol: <span>Consumidor</span>
              </li>
              <li className="text-sm lg:text-xl">
                Saldo: $<span> 0.00</span>
              </li>
            </ul>
          </div>
          <img
            src="/user.jpg"
            alt="user"
            className="h-full w-auto object-cover rounded-full hidden lg:block"
          />
          <button onClick={toggleMenu} className="lg:hidden">
          <IoMenu className="text-3xl md:text-5xl text-white"/>
          </button>
          
        </div>
      </div>
      <Sidebar isOpen={menuOpen} role={userRole} />
    </div>
  );
};

export default Header;
