/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import "./styles/Global.css";
import "./styles/Pagination.css";

const Pagination = (props) => {
  const pageLinks = [];

  if (props.pages > 8 && props.currentPage < props.pages - 8) {
    for (let i = props.currentPage; i <= props.currentPage + 8; i++) {
      if (i <= props.pages) {
        let active = props.currentPage == i ? "active" : "";

        pageLinks.push(
          <li
            className={`waves-effect ${active}`}
            key={i}
            onClick={() => props.nextPage(i)}
          >
            <a href="#">{i}</a>
          </li>
        );
      }
    }
  } else if (props.pages > 8 && props.currentPage >= props.pages - 8) {
    for (let i = props.pages - 8; i <= props.pages + 8; i++) {
      if (i <= props.pages) {
        let active = props.currentPage == i ? "active" : "";

        pageLinks.push(
          <li
            className={`waves-effect ${active}`}
            key={i}
            onClick={() => props.nextPage(i)}
          >
            <a href="#">{i}</a>
          </li>
        );
      }
    }
  } else {
    for (let i = 1; i <= props.pages; i++) {
      let active = props.currentPage == i ? "active" : "";

      pageLinks.push(
        <li
          className={`waves-effect ${active}`}
          key={i}
          onClick={() => props.nextPage(i)}
        >
          <a href="#">{i}</a>
        </li>
      );
    }
  }

  return (
      <ul className="pagination">
        {props.currentPage > 1 ? (
          <li
            className={`waves-effect`}
            onClick={() => props.nextPage(props.currentPage - 1)}
          >
            <a href="#">Prev</a>
          </li>
        ) : (
          ""
        )}
        {props.currentPage > 1 && props.pages > 8 ? (
          <li
            className={`waves-effect onFirst`}
            onClick={() => props.nextPage(1)}
          >
            <a href="#">1</a>
          </li>
        ) : (
          ""
        )}
        {props.currentPage > 2 && props.pages > 8 ? <li className={`waves-effect1`}>...</li> : ""}
        {pageLinks}
        {props.currentPage < props.pages - 9 ? (
          <li className={`waves-effect1`}>...</li>
        ) : (
          ""
        )}
        {props.currentPage < props.pages - 8 ? (
          <li
            className={`waves-effect`}
            onClick={() => props.nextPage(props.pages)}
          >
            <a href="#">{props.pages}</a>
          </li>
        ) : (
          ""
        )}
        {props.currentPage < props.pages ? (
          <li
            className={`waves-effect`}
            onClick={() => props.nextPage(props.currentPage + 1)}
          >
            <a href="#">Next</a>
          </li>
        ) : (
          ""
        )}
      </ul>
  );
};

export default Pagination;
