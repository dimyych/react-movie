import React from "react";
import "./styles/Global.css";
import "./styles/Nav.css";
import MyInput from "./UI/MyInput/MyInput";
import MyButton from "./UI/button/MyButton";

const Nav = ({
  movies,
  setMovies,
  search,
  setSearch,
  likesVisible,
  setLikesVisible,
  setPage,
  page,
}) => {
  return (
    <nav className="page-section nav">
      <div className="container">
        <svg
          style={{ height: "30px", cursor: "pointer", color: "red" }}
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="heart"
          class="svg-inline--fa fa-heart fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
          onClick={() => setLikesVisible(true)}
        >
          <path
            fill="currentColor"
            d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
          ></path>
        </svg>
        <form onSubmit={(e) => e.preventDefault()} className="nav__search">
          <img
            className="nav__search-img"
            src={
              process.env.PUBLIC_URL +
              "https://www.pngall.com/wp-content/uploads/8/Vector-Search.png"
            }
            alt=""
          />
          <MyInput
            value={search}
            onChange={(e) => {
              setSearch(e.target.value.trimStart());
              setPage({ ...page, currentPage: 1 });
            }}
            placeholder="Search movie"
            type="text"
          />
        </form>
      </div>
    </nav>
  );
};

export default Nav;
