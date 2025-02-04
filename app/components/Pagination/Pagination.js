import React from "react";
import ReactPaginate from "react-paginate";
import Style from "./Pagination.module.scss";
import IconChevron from "../icon/dropdownchevron.svg"

const Pagination = ({
  pageCount,
  onPageChange,
  forcePage,
}) => {
  return (
    <div className="d-flex justify-content-between py-0 px-2 m-0">

      <div className={Style.wrapper__pagination}>
        <ReactPaginate
          pageCount={pageCount}
          onPageChange={onPageChange}
          forcePage={forcePage}
          containerClassName={"pagination"}
          previousClassName={"page-item previous"}
          nextClassName={"page-item next"}
          pageClassName={"page-item"}
          disabledClassName={"page-item disabled"}
          activeClassName={"page-item active disabled"}
          pageLinkClassName={"page-link"}
          previousLinkClassName={"page-link"}
          nextLinkClassName={"page-link"}
          previousLabel={<IconChevron className="rotate-[90deg]" />}
          nextLabel={<IconChevron className="rotate-[-90deg]" />}
        />
      </div>
    </div>
  );
};

export default Pagination;
