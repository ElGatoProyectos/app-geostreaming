"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

import { IoMdHome } from "react-icons/io";
import { IoMdCart } from "react-icons/io";
import { IoLogoUsd } from "react-icons/io5";
import { IoMdLogOut } from "react-icons/io";
import { IoMdPersonAdd } from "react-icons/io";

import {
  MdMenuBook,
  MdAccountBalance,
  MdLockReset,
  MdOutlineSwitchAccount,
} from "react-icons/md";

import { FaRegUser, FaUsers } from "react-icons/fa";
import { GiProfit } from "react-icons/gi";
import { RiUserSharedLine } from "react-icons/ri";
import { signOut } from "next-auth/react";

interface SidebarProps {
  isOpen: boolean;
  role: "admin" | "distribuidor" | "consumidor";
}
const Sidebar: React.FC<any> = ({ isOpen, role }) => {
  const pathname = usePathname();

  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(pathname);
  }, [pathname]);

  const sections: any = {
    ADMIN: [
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
            label: "Consumidores",
            icon: <FaUsers className="text-xl" />,
          },
        ],
      },
      {
        title: "Registrar",
        links: [
          {
            href: "/admin/cuentas",
            label: "Cuentas",
            icon: <MdOutlineSwitchAccount className="text-xl" />,
          },
          {
            href: "/admin/productos",
            label: "Productos",
            icon: <IoMdCart className="text-xl" />,
          },
          {
            href: "/admin/bancos",
            label: "Bancos",
            icon: <MdAccountBalance className="text-xl" />,
          },
        ],
      },
      {
        title: "Herramientas",
        links: [
          {
            href: "/admin/perfil",
            label: "Mi Perfil",
            icon: <FaRegUser className="text-xl" />,
          },
          {
            href: "/admin/contrasenia",
            label: "Cambiar contraseña",
            icon: <MdLockReset className="text-xl" />,
          },
        ],
      },
    ],
    USER: [
      {
        title: null,
        links: [
          {
            href: "/home",
            label: "Inicio",
            icon: <IoMdHome className="text-xl" />,
          },
        ],
      },
      {
        title: "Ventas",
        links: [
          {
            href: "/home/productos",
            label: "Productos",
            icon: <IoMdCart className="text-xl" />,
          },
          {
            href: "/home/reportesdeventas",
            label: "Reporte ventas",
            icon: <MdMenuBook className="text-xl" />,
          },
        ],
      },
      {
        title: "Saldo",
        links: [
          {
            href: "/home/creditaciones",
            label: "Acreditar saldo",
            icon: <IoLogoUsd className="text-xl" />,
          },
          {
            href: "/home/reportesdedepositos",
            label: "Reporte deposito",
            icon: <MdMenuBook className="text-xl" />,
          },
        ],
      },
      {
        title: "Herramientas",
        links: [
          {
            href: "/home/perfil",
            label: "Mi Perfil",
            icon: <FaRegUser className="text-xl" />,
          },
          {
            href: "/home/contrasenia",
            label: "Cambiar contraseña",
            icon: <MdLockReset className="text-xl" />,
          },
        ],
      },
    ],
    DISTRIBUTOR: [
      {
        title: null,
        links: [
          {
            href: "/home",
            label: "Inicio",
            icon: <IoMdHome className="text-xl" />,
          },
        ],
      },
      {
        title: "Ventas",
        links: [
          {
            href: "/home/productos",
            label: "Productos",
            icon: <IoMdCart className="text-xl" />,
          },
          {
            href: "/home/reportesdeventas",
            label: "Reporte ventas",
            icon: <MdMenuBook className="text-xl" />,
          },
        ],
      },
      {
        title: "Saldo",
        links: [
          {
            href: "/home/creditaciones",
            label: "Acreditar saldo",
            icon: <IoLogoUsd className="text-xl" />,
          },
          {
            href: "/home/reportesdedepositos",
            label: "Reporte deposito",
            icon: <MdMenuBook className="text-xl" />,
          },
        ],
      },
      {
        title: "Afiliados",
        links: [
          {
            href: "/home/registrarafiliados",
            label: "Registrar",
            icon: <IoMdPersonAdd className="text-xl" />,
          },
          {
            href: "/home/ganancias",
            label: "Ganancias",
            icon: <GiProfit className="text-xl" />,
          },
        ],
      },
      {
        title: "Herramientas",
        links: [
          {
            href: "/home/perfil",
            label: "Mi Perfil",
            icon: <FaRegUser className="text-xl" />,
          },
          {
            href: "/home/contrasenia",
            label: "Cambiar contraseña",
            icon: <MdLockReset className="text-xl" />,
          },
        ],
      },
    ],
  };

  const router = useRouter();
  function handleLogout() {
    signOut();
    // router.push("/ingresar");
  }

  return (
    <div
      className={`scrollbarFit user-select-none bg-white text-[#888] w-[220px] py-4 max-h-[calc(100vh-70px)] h-full fixed top-[70px] border-r z-10 lg:z-0 transition-transform duration-300 overflow-y-auto shadow-[8px_0px_10px_-3px_rgba(0,0,0,0.1)] ${
        isOpen ? "translate-x-0 " : "-translate-x-full lg:translate-x-0 "
      }`}
    >
      <div className="flex flex-col gap-6">
        {sections[role].map((section: any, sectionIndex: number) => (
          <div key={sectionIndex} className="w-full">
            {section.title && (
              <div className="uppercase text-xs mx-8 font-semibold border-b border-gray-200 pb-1">
                {section.title}
              </div>
            )}
            <ul className="mt-2">
              {section.links.map((link: any, linkIndex: any) => (
                <li key={linkIndex}>
                  <Link
                    href={link.href}
                    className={`pl-8 py-3 mr-2 rounded-r-full mb-2 flex gap-4 items-center ${
                      currentPath === link.href
                        ? "bg-[#F2308B] text-white font-semibold"
                        : "hover:bg-[#F2308B] hover:text-white transition-all duration-300 group"
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
        <li>
          <span
            role="button"
            onClick={handleLogout}
            className={`pl-8 py-3 mr-2 rounded-r-full mb-2 flex gap-4 items-center 
                     
                    `}
          >
            <IoMdLogOut className="text-xl" />
            <span className="text-sm capitalize">Cerrar sesion</span>
          </span>
        </li>
      </div>
    </div>
  );
};

export default Sidebar;
