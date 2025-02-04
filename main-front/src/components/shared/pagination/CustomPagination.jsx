import "./CustomPagination.css"; // 스타일을 위한 CSS
import React from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import { setPage } from "../../../reduxSlice/paginationSlice";

const CustomPagination = () => {
  const dispatch = useDispatch();

  const { currentPage, itemsPerPage, totalItems } = useSelector((state) => state.pagination);

  const pageCount = Math.ceil(totalItems / itemsPerPage);

  const handlePageClick = (event) => {
    dispatch(setPage(event.selected));
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel="Next >"
      onPageChange={handlePageClick}
      pageRangeDisplayed={5}
      pageCount={pageCount}
      forcePage={currentPage}
      previousLabel="< Previous"
      containerClassName="pagination"
      activeClassName="active"
    />
  );
};
export default CustomPagination;
