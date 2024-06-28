"use client";
import { Pagination } from "keep-react";
import { CaretLeft, CaretRight, DotsThree } from "phosphor-react";

export const PaginationComponent: React.FC<{
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}> = ({ currentPage, totalPages, onPageChange }) => {
  const getPaginationNumbers = () => {
    const delta = 2;
    const range = [];
    for (
      let i = Math.max(2, currentPage - delta);
      i <= Math.min(totalPages - 1, currentPage + delta);
      i++
    ) {
      range.push(i);
    }
    if (currentPage - delta > 2) {
      range.unshift("...");
    }
    if (currentPage + delta < totalPages - 1) {
      range.push("...");
    }
    range.unshift(1);
    if (totalPages !== 1) {
      range.push(totalPages);
    }
    return range;
  };

  return (
    <Pagination shape="rounded" className="w-fit mx-0 flex flex-wrap">
      <Pagination.Navigator
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <CaretLeft size={18} />
        Anterior
      </Pagination.Navigator>
      <Pagination.List>
        {getPaginationNumbers().map((pageNumber, index) =>
          typeof pageNumber === "string" ? (
            <span key={index} className="px-2">
              ...
            </span>
          ) : (
            <Pagination.Item
              key={index}
              active={pageNumber === currentPage}
              onClick={() => onPageChange(pageNumber)}
              className={
                pageNumber === currentPage ? "bg-[#F2308B] font-bold text-sm" : "text-sm"
              }
            >
              {pageNumber}
            </Pagination.Item>
          )
        )}
      </Pagination.List>
      <Pagination.Navigator
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Siguiente
        <CaretRight size={18} />
      </Pagination.Navigator>
    </Pagination>
  );
};
