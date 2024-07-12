"use client";
import React, { useEffect, useState } from "react";
import { RiUserSharedLine } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import CountNumber from "@/app/components/countNumber";
import { IoMdCart } from "react-icons/io";
import { MdOutlineAccountBox } from "react-icons/md";
import axios from "axios";
import { styled } from "@mui/system";
import {
  TablePagination,
  tablePaginationClasses as classes,
} from "@mui/base/TablePagination";
import FirstPageRoundedIcon from "@mui/icons-material/FirstPageRounded";
import LastPageRoundedIcon from "@mui/icons-material/LastPageRounded";
import ChevronLeftRoundedIcon from "@mui/icons-material/ChevronLeftRounded";
import ChevronRightRoundedIcon from "@mui/icons-material/ChevronRightRounded";

const home = () => {
  const [data, setData] = useState<any>({});
  const [products, setProducts] = useState<any>({});
  const [afiliados, setAfiliados] = useState<any>({});
  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [userRoleCount, setUserRoleCount] = useState<number>(0);
  const [platformCount, setPlatformCount] = useState<number>(0);
  const [notBoughtAccounts, setNotBoughtAccounts] = useState<number>(0);

  const [productsPage, setProductsPage] = useState(0);
  const [productsRowsPerPage, setProductsRowsPerPage] = useState(5);
  const [afiliadosPage, setAfiliadosPage] = useState(0);
  const [afiliadosRowsPerPage, setAfiliadosRowsPerPage] = useState(5);

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/dashboard");
      console.log(response.data)
      const sortedProducts = response.data.productosMasVendidos.sort(
        (a: any, b: any) => b._count.Account - a._count.Account
      );
      /* setProducts(sortedProducts); */
      /* setProducts(response.data.productosMasVendidos); */
      const sortedAfiliados = response.data.topAfiliados.sort(
        (a: any, b: any) =>
          b.Cuantos_usuarios_tienen_el_Ref_id -
          a.Cuantos_usuarios_tienen_el_Ref_id
      );
      setAfiliados(sortedAfiliados);
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAllData = async () => {
    try {
      const [userResponse, platformResponse, accountsResponse] =
        await Promise.all([
          axios.get("/api/user"),
          axios.get("/api/platform"),
          axios.get("/api/account"),
        ]);

      const usersWithRefId = userResponse.data.filter(
        (user: any) => user.ref_id
      ).length;
      const usersWithUserRole = userResponse.data.filter(
        (user: any) => user.role === "USER"
      ).length;
      const platformsCount = platformResponse.data.length;
      const notBoughtAccountsCount = accountsResponse.data.filter(
        (account: any) => account.status === "NOT_BOUGHT"
      ).length;
      setProducts(platformResponse.data);
      console.log(platformResponse.data)
      setTotalUsers(usersWithRefId);
      setUserRoleCount(usersWithUserRole);
      setPlatformCount(platformsCount);
      setNotBoughtAccounts(notBoughtAccountsCount);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  useEffect(() => {
    fetchData();
    fetchAllData();
  }, []);

  const infoCards = [
    {
      title: "Afiliados",
      number: totalUsers,
      icon: <RiUserSharedLine className="text-xl mx-auto" />,
      span: "registrados",
    },
    {
      title: "Consumidores",
      number: userRoleCount,
      icon: <FaUsers className="text-xl mx-auto" />,
      span: "registrados",
    },
    {
      title: "Productos",
      number: platformCount,
      icon: <IoMdCart className="text-xl mx-auto" />,
      span: "disponibles",
    },
    {
      title: "Cuentas",
      number: notBoughtAccounts,
      icon: <MdOutlineAccountBox className="text-xl mx-auto" />,
      span: "activas",
    },
  ];

  /* paginacion */

  const handleProductsPageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setProductsPage(newPage);
  };

  const handleProductsRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProductsRowsPerPage(parseInt(event.target.value, 10));
    setProductsPage(0);
  };

  const handleAfiliadosPageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setAfiliadosPage(newPage);
  };

  const handleAfiliadosRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setAfiliadosRowsPerPage(parseInt(event.target.value, 10));
    setAfiliadosPage(0);
  };

  const CustomTablePagination = styled(TablePagination)`
    & .${classes.toolbar} {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 8px;
      color: #888;
      padding: 4px 0;

      @media (min-width: 768px) {
        flex-direction: row;
        align-items: center;
      }
    }

    & .${classes.selectLabel} {
      margin: 0;
    }

    & .${classes.select} {
      border: 1px solid #eee;
      border-radius: 5px;
    }

    & .${classes.displayedRows} {
      margin: 0;

      @media (min-width: 768px) {
        margin-left: auto;
      }
    }

    & .${classes.spacer} {
      display: none;
    }

    & .${classes.actions} {
      display: flex;
      gap: 0.25rem;
    }
    & .${classes.actions} button {
      background-color: #f0f0f0;
      border-radius: 4px;
      padding: 0 4px;
    }
  `;
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
            Resumen de plataformas
          </h2>
          <div className="overflow-x-auto max-h-[800px] overflow-y-auto">
            <table className="w-full table-auto">
              <thead className="bg-[#F3F6F9] font-medium text-[#888] text-sm">
                <tr>
                  <th className="p-2 text-left">N</th>
                  <th className="p-2 text-left">Plataforma</th>
                  <th className="p-2 text-center">Cantidad</th>
                </tr>
              </thead>
              <tbody>
                {products.length > 0 ? (
                  products
                    .slice(
                      productsPage * productsRowsPerPage,
                      productsRowsPerPage === -1
                        ? products.length
                        : productsPage * productsRowsPerPage +
                            productsRowsPerPage
                    )
                    .map((product: any, index: number) => (
                      <tr key={index} className="text  text-[#666]">
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">{product.name}</td>
                        <td className="p-2 text-center">
                          {product.Account?product.Account.length:0}
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={3} className="p-2 text-[#666]">
                      Sin plataformas
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <CustomTablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "Todos", value: -1 },
                    ]}
                    colSpan={3}
                    count={products.length}
                    rowsPerPage={productsRowsPerPage}
                    page={productsPage}
                    onPageChange={handleProductsPageChange}
                    onRowsPerPageChange={handleProductsRowsPerPageChange}
                    labelRowsPerPage="Filas"
                    slotProps={{
                      select: {
                        "aria-label": "rows per page",
                      },
                      actions: {
                        showFirstButton: true,
                        showLastButton: true,
                        slots: {
                          firstPageIcon: FirstPageRoundedIcon,
                          lastPageIcon: LastPageRoundedIcon,
                          nextPageIcon: ChevronRightRoundedIcon,
                          backPageIcon: ChevronLeftRoundedIcon,
                        },
                      },
                    }}
                  />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
        {/* afiliados */}
        <div className="w-full rounded-lg bg-white p-6  shadow-box  transition-all duration-500">
          <h2 className=" text-xl capitalize mb-4 text-[#444] font-medium">
            Resumen de usuarios
          </h2>
          <div className="overflow-x-auto max-h-[800px] overflow-y-auto">
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
                    .slice(
                      afiliadosPage * afiliadosRowsPerPage,
                      afiliadosRowsPerPage === -1
                        ? afiliados.length
                        : afiliadosPage * afiliadosRowsPerPage +
                            afiliadosRowsPerPage
                    )
                    .map((afiliado: any, index: number) => (
                      <tr key={index} className="text  text-[#666]">
                        <td className="p-2">{index + 1}</td>
                        <td className="p-2">{afiliado.Nombre_del_afiliador}</td>
                        <td className="p-2 text-center">
                          {afiliado.Cuantos_usuarios_tienen_el_Ref_id !==
                          undefined
                            ? afiliado.Cuantos_usuarios_tienen_el_Ref_id
                            : 0}
                        </td>
                      </tr>
                    ))
                ) : (
                  <tr>
                    <td colSpan={3} className="p-2 text-[#666]">
                      Sin usuarios afiliados
                    </td>
                  </tr>
                )}
              </tbody>
              <tfoot>
                <tr>
                  <CustomTablePagination
                    rowsPerPageOptions={[
                      5,
                      10,
                      25,
                      { label: "Todos", value: -1 },
                    ]}
                    colSpan={3}
                    count={afiliados.length}
                    rowsPerPage={afiliadosRowsPerPage}
                    page={afiliadosPage}
                    onPageChange={handleAfiliadosPageChange}
                    onRowsPerPageChange={handleAfiliadosRowsPerPageChange}
                    labelRowsPerPage="Filas"
                    slotProps={{
                      select: {
                        "aria-label": "rows per page",
                      },
                      actions: {
                        showFirstButton: true,
                        showLastButton: true,
                        slots: {
                          firstPageIcon: FirstPageRoundedIcon,
                          lastPageIcon: LastPageRoundedIcon,
                          nextPageIcon: ChevronRightRoundedIcon,
                          backPageIcon: ChevronLeftRoundedIcon,
                        },
                      },
                    }}
                  />
                </tr>
              </tfoot>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default home;
