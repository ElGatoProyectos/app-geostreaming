"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import { IoMdHome } from "react-icons/io";
import { IoMdCart } from "react-icons/io";
import { IoLogoUsd } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { IoMdPersonAdd } from "react-icons/io";

import {
  MdMenuBook,
  MdOutlineCategory,
  MdAccountBalance,
  MdLockReset,
} from "react-icons/md";

import { FaRegUser, FaUsers } from "react-icons/fa";
import { GiProfit } from "react-icons/gi";
import { RiUserSharedLine } from "react-icons/ri";

interface SidebarProps {
  isOpen: boolean;
  role: "admin" | "distribuidor" | "consumidor";
}
const Sidebar: React.FC<SidebarProps> = ({ isOpen, role }) => {
  const pathname = usePathname();

  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const sections = {
    admin: [
      {
        title: null,
        links: [
          {
            href: "/admin",
            label: "Inicio",
            icon: <IoMdHome className="text-xl" />,
          },
        ],
      },
      {
        title: "Usuarios",
        links: [
          {
            href: "/admin/distribuidores",
            label: "Distribuidores",
            icon: <RiUserSharedLine className="text-xl" />,
          },
          {
            href: "/admin/consumidores",
            label: "Condumidores",
            icon: <FaUsers className="text-xl" />,
          },
        ],
      },
      {
        title: "Registrar",
        links: [
          {
            href: "/admin/categorias",
            label: "Categorias",
            icon: <MdOutlineCategory className="text-xl" />,
          },
          {
            href: "/admin/productos",
            label: "Productos",
            icon: <IoMdCart className="text-xl" />,
          },
          {
            href: "/admin/cuentas",
            label: "Cuentas",
            icon: <MdAccountBalance className="text-xl" />,
          },
        ],
      },
      {
        title: "Herramientas",
        links: [
          {
            href: "../user/perfil",
            label: "Mi Perfil",
            icon: <FaRegUser className="text-xl" />,
          },
          {
            href: "../user/contrasenia",
            label: "Cambiar contraseña",
            icon: <MdLockReset className="text-xl" />,
          },
          {
            href: "/ingresar",
            label: "Cerrar sesión",
            icon: <IoMdLogOut className="text-xl" />,
          },
        ],
      },
    ],
    consumidor: [
      {
        title: null,
        links: [
          {
            href: "/user",
            label: "Inicio",
            icon: <IoMdHome className="text-xl" />,
          },
        ],
      },
      {
        title: "Ventas",
        links: [
          {
            href: "/user/productos",
            label: "Productos",
            icon: <IoMdCart className="text-xl" />,
          },
          {
            href: "/user/reportesdeventas",
            label: "Reporte ventas",
            icon: <MdMenuBook className="text-xl" />,
          },
        ],
      },
      {
        title: "Saldo",
        links: [
          {
            href: "/user/creditaciones",
            label: "Acreditar saldo",
            icon: <IoLogoUsd className="text-xl" />,
          },
          {
            href: "/user/reportesdedepositos",
            label: "Reporte deposito",
            icon: <MdMenuBook className="text-xl" />,
          },
        ],
      },
      {
        title: "Herramientas",
        links: [
          {
            href: "user/perfil",
            label: "Mi Perfil",
            icon: <FaRegUser className="text-xl" />,
          },
          {
            href: "../user/contrasenia",
            label: "Cambiar contraseña",
            icon: <MdLockReset className="text-xl" />,
          },
          {
            href: "/ingresar",
            label: "Cerrar sesión",
            icon: <IoMdLogOut className="text-xl" />,
          },
        ],
      },
    ],
    distribuidor: [
      {
        title: null,
        links: [
          {
            href: "/user",
            label: "Inicio",
            icon: <IoMdHome className="text-xl" />,
          },
        ],
      },
      {
        title: "Ventas",
        links: [
          {
            href: "/user/productos",
            label: "Productos",
            icon: <IoMdCart className="text-xl" />,
          },
          {
            href: "/user/reportesdeventas",
            label: "Reporte ventas",
            icon: <MdMenuBook className="text-xl" />,
          },
        ],
      },
      {
        title: "Saldo",
        links: [
          {
            href: "/user/creditaciones",
            label: "Acreditar saldo",
            icon: <IoLogoUsd className="text-xl" />,
          },
          {
            href: "/user/reportesdedepositos",
            label: "Reporte deposito",
            icon: <MdMenuBook className="text-xl" />,
          },
        ],
      },
      {
        title: "Afiliados",
        links: [
          {
            href: "/user/registrarafiliados",
            label: "Registrar",
            icon: <IoMdPersonAdd className="text-xl" />,
          },
          {
            href: "/user/ganancias",
            label: "Ganancias",
            icon: <GiProfit className="text-xl" />,
          },
        ],
      },
      {
        title: "Herramientas",
        links: [
          {
            href: "user/perfil",
            label: "Mi Perfil",
            icon: <FaRegUser className="text-xl" />,
          },
          {
            href: "../user/contrasenia",
            label: "Cambiar contraseña",
            icon: <MdLockReset className="text-xl" />,
          },
          {
            href: "/ingresar",
            label: "Cerrar sesión",
            icon: <IoMdLogOut className="text-xl" />,
          },
        ],
      },
    ],
  };

  return (
    <div
      className={`bg-[#F2308B] w-[220px] py-4 max-h-[calc(100vh-100px)] h-full fixed top-[100px] z-50 text-white transition-transform duration-300 overflow-y-auto ${
        isOpen
          ? "translate-x-0 shadow-sidebar "
          : "-translate-x-full lg:translate-x-0 shadow-none "
      }`}
    >
      <div className="flex flex-col gap-6">
        {sections[role].map((section, sectionIndex) => (
          <div key={sectionIndex} className="w-full">
            {section.title && (
              <div className="uppercase text-xs mx-8 font-semibold border-b border-[#F06FAC] pb-1">
                {section.title}
              </div>
            )}
            <ul className="mt-2">
              {section.links.map((link, linkIndex) => (
                <li key={linkIndex}>
                  <Link
                    href={link.href}
                    className={`pl-8 py-3 mr-2 rounded-r-full mb-2 flex gap-4 items-center ${
                      currentPath === link.href
                        ? "bg-white text-[#277FF2] font-semibold"
                        : "hover:bg-white hover:text-[#277FF2] transition-all duration-300 group"
                    }`}
                  >
                    {link.icon}
                    <span className="text-sm capitalize">{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sidebar;
