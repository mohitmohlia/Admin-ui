import React from "react";
import "./styles.scss";

function Pagination({ pageCount, onPageChange, pageNumber }) {
  return (
    <div className="admin-ui-pagination">
      <button onClick={() => onPageChange(0)}>{"<<"}</button>
      <button
        disabled={pageNumber === 0}
        onClick={() => onPageChange(pageNumber - 1)}
      >
        Previous
      </button>
      {Array(pageCount)
        .fill()
        .map((item, index) => {
          return (
            <button
              className={index === pageNumber ? "hightlight" : ""}
              key={index}
              onClick={() => onPageChange(index)}
              value={index}
            >
              {index}
            </button>
          );
        })}
      <button
        disabled={pageCount === pageNumber + 1}
        onClick={() => onPageChange(pageNumber + 1)}
      >
        Next
      </button>
      <button onClick={() => onPageChange(pageCount - 1)}>{">>"}</button>
    </div>
  );
}

export default Pagination;
