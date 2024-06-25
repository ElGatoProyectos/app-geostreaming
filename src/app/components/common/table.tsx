"use client";
import React, { useState, useMemo, useEffect } from "react";
import { Badge, Button, Table } from "keep-react";
import { CaretUp, CaretDown } from "phosphor-react";
import { PaginationComponent } from "@/app/components/common/pagination";
import ActionButton from "./ActionButton";
import { BsPencilFill } from "react-icons/bs";
import { FaTrash } from "react-icons/fa6";

interface TableProps {
  columns: Array<{ Header: string; accessor: string }>;
  data: any[];
  showActions?: boolean;
  download?: boolean;
  addRecord?: boolean;
  title: string;
  onAdd?: () => void;
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
}

const TableComponent: React.FC<TableProps> = ({
  columns,
  data,
  showActions = false,
  download = false,
  addRecord = false,
  title,
  onAdd,
  onEdit,
  onDelete,
}) => {
  const [filteredData, setFilteredData] = useState(data);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [selectedRows, setSelectedRows] = useState<Set<number>>(new Set());
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: string;
  } | null>(null);

  useEffect(() => {
    setFilteredData(
      data.filter((item) =>
        columns?.some((column) =>
          item[column.accessor]
            ?.toString()
            .toLowerCase()
            .includes(search.toLowerCase())
        )
      )
    );
  }, [data, search, columns]);

  const sortedData = useMemo(() => {
    if (sortConfig !== null) {
      return [...filteredData].sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "ascending" ? 1 : -1;
        }
        return 0;
      });
    }
    return filteredData;
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * rowsPerPage;
    return sortedData.slice(startIndex, startIndex + rowsPerPage);
  }, [sortedData, currentPage, rowsPerPage]);

  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const requestSort = (key: string) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const getClassNamesFor = (key: string) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === key ? sortConfig.direction : undefined;
  };

  /* modal */
  const openModal = () => {
    if (onAdd) {
      onAdd();
    }
  };

  return (
    <div className="bg-white px-8 py-8 shadow-box rounded-xl">
      <div className=" flex flex-col ">
        <div className="flex items-center gap-5 mb-8">
          <h2 className="text-[#F2308B] capitalize text-xl font-semibold">
            {title}
            <Badge className="text-[#888] text-xs px-4 py-2 ml-4 bg-purple-50 cursor-default user-select-none">
              {data.length} Registros
            </Badge>
          </h2>
        </div>
        <div className="flex flex-col-reverse  md:flex-row  items-end md:items-center justify-between gap-5 mb-4">
          <select
            value={rowsPerPage}
            onChange={(e) => setRowsPerPage(Number(e.target.value))}
            className="block w-20 py-2 pl-2 pr-8 leading-tight text-sm text-gray-700 border-gray-300 rounded-md shadow-sm focus:outline-none focus:border-purple-500 focus:ring focus:ring-purple-300 focus:ring-opacity-50"
          >
            {[10, 20, 50].map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
          <div className="flex gap-4">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Buscar ..."
              className="block w-full px-4 py-2 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-purple-300 focus:border-purple-500 max-w-[400px]"
            />
            {download ? (
              <button className="text-sm bg-[#F2308B] text-white capitalize whitespace-nowrap hover:bg-[#F06FAC]">
                Descargar reporte
              </button>
            ) : (
              <ActionButton onClick={openModal}>Agregar</ActionButton>
            )}
          </div>
        </div>
      </div>
      <Table
        showCheckbox={false}
        showBorder={false}
        showBorderPosition="right"
        striped={true}
        hoverable={true}
      >
        <Table.Head className="w-full">
          {columns.map((column) => (
            <Table.HeadCell
              key={column.accessor}
              onClick={() => requestSort(column.accessor)}
            >
              <div className="flex items-center cursor-pointer">
                <p className="text-sm font-semibold text-metal-400 ">
                  {column.Header}
                </p>
                {getClassNamesFor(column.accessor) === "ascending" && (
                  <CaretUp size={15} />
                )}
                {getClassNamesFor(column.accessor) === "descending" && (
                  <CaretDown size={15} />
                )}
              </div>
            </Table.HeadCell>
          ))}
          {showActions && <Table.HeadCell>Acciones</Table.HeadCell>}
        </Table.Head>
        <Table.Body className="divide-gray-25 divide-y">
          {paginatedData.length > 0 ? (
            paginatedData.map((row, rowIndex) => (
              <Table.Row key={rowIndex} className="bg-white">
                {columns.map((column) => (
                  <Table.Cell key={column.accessor}>
                    {row[column.accessor]}
                  </Table.Cell>
                ))}
                {showActions && (
                  <Table.Cell>
                    <div className="flex items-center gap-2">
                      <Button
                        className="rounded content-center text-white px-1 py-1 bg-[#5BC0DE] w-8 h-8 hover:bg-[#80DCF8]"
                        onClick={() => onEdit && onEdit(row)}
                      >
                        <BsPencilFill className="text-white mx-auto " />
                      </Button>
                      <Button
                        className="rounded content-center text-white px-1 py-1 bg-red-500 w-8 h-8 hover:bg-red-300"
                        onClick={() => onDelete && onDelete(row)}
                      >
                        <FaTrash className="text-white mx-auto " />
                      </Button>
                    </div>
                  </Table.Cell>
                )}
              </Table.Row>
            ))
          ) : (
            <Table.Cell colSpan={columns.length + (showActions ? 2 : 1)}>
              No se encontraron coincidencias
            </Table.Cell>
          )}
        </Table.Body>
      </Table>
      <div className="flex flex-col gap-4 sm:flex-row items-center justify-between mt-4">
        <span className="text-sm text-[#888]">
          Página{" "}
          <strong>
            {currentPage} de {totalPages}
          </strong>
        </span>
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>
    </div>
  );
};

export default TableComponent;
