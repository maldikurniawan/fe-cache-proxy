import React, { Fragment } from "react";

// components
import ReactPaginate from "react-paginate";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { HiOutlineDotsHorizontal } from "react-icons/hi";

const Pagination = ({ handlePageClick, pageCount, limit, setLimit }) => {
  return (
    <Fragment>
      <div className="sm:flex justify-between items-center mt-4">
        <div className="flex items-center">
          <select
            value={limit}
            className="flex justify-center px-1 bg-white dark:bg-gray-800 text-xs text-black dark:text-gray-100 border border-gray-300 dark:border-gray-600 rounded-md h-7 outline-none"
            onChange={(e) => setLimit(parseInt(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <div className="ml-1 text-xs text-gray-700 dark:text-gray-300">
            {pageCount} entries
          </div>
        </div>
        <ReactPaginate
          className="flex justify-center mt-4 sm:mt-0 sm:justify-end text-black dark:text-gray-100"
          pageLinkClassName="bg-white dark:bg-gray-800 text-xs text-black dark:text-gray-100 border border-gray-300 dark:border-gray-600 mx-1 w-7 h-7 flex rounded-md justify-center items-center outline-none"
          activeLinkClassName="border border-gray-900 dark:border-gray-100 bg-gray-100 dark:bg-gray-700"
          previousLinkClassName="bg-white dark:bg-gray-800 text-xs border border-gray-300 dark:border-gray-600 mr-1 w-7 h-7 flex rounded-md justify-center items-center"
          nextLinkClassName="bg-white dark:bg-gray-800 text-xs border border-gray-300 dark:border-gray-600 w-7 ml-1 h-7 flex rounded-md justify-center items-center"
          breakLinkClassName="bg-white dark:bg-gray-800 text-xs border border-gray-300 dark:border-gray-600 w-7 mx-1 h-7 flex rounded-md justify-center items-center"
          disabledLinkClassName="text-gray-300 dark:text-gray-500"
          breakLabel={<HiOutlineDotsHorizontal />}
          renderOnZeroPageCount={null}
          previousLabel={<MdKeyboardArrowLeft />}
          nextLabel={<MdKeyboardArrowRight />}
          pageCount={Math.ceil(pageCount / limit)}
          onPageChange={(e) => handlePageClick(e)}
          marginPagesDisplayed={1}
          pageRangeDisplayed={2}
        />
      </div>
    </Fragment>
  );
};

export default Pagination;
