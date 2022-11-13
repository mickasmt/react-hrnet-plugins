import PropTypes from "prop-types";
import classNames from "classnames";
import React, { useEffect, useState, useMemo } from "react";

// icons
import { ReactComponent as ArrowRight } from "assets/icons/arrow-right.svg";
import { ReactComponent as ArrowLeft } from "assets/icons/arrow-left.svg";

/**
 * Pagination for Table Component
 * @param {number} total Length of total items
 * @param {number} itemsPerPage Number items display per page
 * @param {number} currentPage index of the current page displayed (default : 1)
 * @param {function} onPageChange Function for onChange on pagination
 * @returns {React.ReactElement}
 */
const Pagination = ({
  total,
  itemsPerPage,
  currentPage = 1,
  onPageChange,
}) => {
  const [totalPages, setTotalPages] = useState(0);
  const [minPerPage, setMinPerPage] = useState(0);
  const [maxPerPage, setMaxPerPage] = useState(0);

  useEffect(() => {
    if (total > 0 && itemsPerPage > 0)
      setTotalPages(Math.ceil(total / itemsPerPage));
      setMinPerPage((currentPage - 1) * itemsPerPage + 1);
      setMaxPerPage((currentPage - 1) * itemsPerPage + itemsPerPage);
  }, [total, itemsPerPage, currentPage]);

  const paginationItems = useMemo(() => {
    const pages = [];

    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <li
          className={classNames(
            "py-2 px-3 leading-tight border cursor-pointer",
            i === currentPage
              ? "text-blue-600 bg-blue-100 border-blue-300 hover:bg-blue-200 hover:text-blue-700"
              : "text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700"
          )}
          key={i}
          onClick={() => onPageChange(i)}
        >
          {i}
        </li>
      );
    }

    return pages;
  }, [totalPages, currentPage, onPageChange]);

  if (totalPages === 0) return null;

  return (
    <nav className="flex justify-between items-center pt-3">
      {/* text */}
      <span className="text-gray-500">
        Showing{" "}
        <span className="font-semibold text-gray-900">
          {minPerPage} to{" "}
          {maxPerPage < total ? maxPerPage : total}
        </span>{" "}
        of <span className="font-semibold text-gray-900">{total}</span> entries
      </span>

      {/* buttons */}
      <ul className="inline-flex items-center -space-x-px">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={classNames(
            "block py-2 px-3 ml-0 cursor-pointer leading-tight",
            "text-gray-500 bg-white rounded-l-lg border border-gray-300",
            "hover:bg-gray-100 hover:text-gray-700",
            "disabled:hover:bg-white disabled:text-gray-300"
          )}
        >
          <span className="sr-only">Previous</span>
          <ArrowLeft className="w-5 h-5" />
        </button>

        {paginationItems}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={classNames(
            "block py-2 px-3 leading-tight cursor-pointer",
            "text-gray-500 bg-white rounded-r-lg border border-gray-300",
            "hover:bg-gray-100 hover:text-gray-700",
            "disabled:hover:bg-white disabled:text-gray-300"
          )}
        >
          <span className="sr-only">Next</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  total: PropTypes.number.isRequired,
  itemsPerPage: PropTypes.number.isRequired,
  currentPage: PropTypes.number,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
