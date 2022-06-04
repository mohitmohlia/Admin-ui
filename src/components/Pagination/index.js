import React from "react";
import "./styles.scss";

function Pagination({ pageCount, onPageChange, pageNumber }) {
  return (
    <div className="admin-ui-pagination">
      <button onClick={() => onPageChange(0)}>{"<<"}</button>
      <button
        onClick={() => onPageChange(pageNumber - 1)}
        disabled={pageNumber === 0}
      >
        Previous
      </button>
      {Array(pageCount)
        .fill()
        .map((item, index) => {
          return (
            <button
              key={index}
              value={index}
              onClick={() => onPageChange(index)}
              className={index === pageNumber ? "hightlight" : ""}
            >
              {index}
            </button>
          );
        })}
      <button
        onClick={() => onPageChange(pageNumber + 1)}
        disabled={pageCount === pageNumber + 1}
      >
        Next
      </button>
      <button onClick={() => onPageChange(pageCount - 1)}>{">>"}</button>
    </div>
  );
}

export default Pagination;
