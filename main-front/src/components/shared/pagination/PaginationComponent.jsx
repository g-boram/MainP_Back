import "./Pagination.css"; // 스타일 추가
import ReactPaginate from "react-paginate";
import { useSelector } from "react-redux";

const PaginationComponent = ({ onPageChange }) => {
  const { statusFilter, totalPages, filterTotalPages } = useSelector((state) => state.boardList);

  return (
    <ReactPaginate
      pageCount={statusFilter === "ALL" ? totalPages : filterTotalPages}
      onPageChange={(data) => onPageChange(data.selected)}
      marginPagesDisplayed={2}
      pageRangeDisplayed={5}
      containerClassName={"pagination"}
      activeClassName={"active"}
      previousLabel={"<"}
      nextLabel={">"}
      breakLabel={"..."}
    />
  );
};

export default PaginationComponent;
