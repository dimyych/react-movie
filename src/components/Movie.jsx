/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import "./styles/Global.css";

const Movie = (props) => {
  let genre = [{ name: "" }];
  if (props.genres) {
    genre = props.genres.filter((e) => e.id == props.genresId[0]);
  }
  if (genre.length == 0) {
    genre = [{ name: "" }];
  }
  return (
    <div
      style={{ position: "relative", zIndex: "0" }}
      className={["movie-card", props.Modal].join(" ")}
    >
      <div style={{ cursor: "pointer" }}>
        <svg
          style={{
            height: "30px",
            cursor: "pointer",
            position: "absolute",
            top: "8px",
            right: "8px",
          }}
          onClick={() => {
            props.addLikes(props.movie);
          }}
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="heart"
          class="svg-inline--fa fa-heart fa-w-16"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            className="like"
            fill="currentColor"
            d="M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z"
          ></path>
        </svg>
        <svg
          style={{
            height: "30px",
            cursor: "pointer",
            position: "absolute",
            top: "8px",
            right: "8px",
          }}
          onClick={() => {
            props.removeLikes(props.movie);
          }}
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="trash"
          class="svg-inline--fa fa-trash fa-w-14"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
          ></path>
        </svg>
      </div>

      <div
        className="movie-card__image"
        onClick={() => {
          props.setVisible(true);
          props.setMovieModalId(props.id);
          props.setMovie(props.movie);
          props.setRecommendationsPage({
            ...props.recommendationsPage,
            currentPage: 1,
          });
          window.scroll({
            top: 0,
            behavior: "smooth",
          });
        }}
      >
        {props.image == null ? (
          <img
            className="none"
            style={{ height: "282.5px" }}
            src={`https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`}
            alt="movie image"
          />
        ) : (
          <img
            src={`https://image.tmdb.org/t/p/w185${props.image}`}
            alt="movie image"
          />
        )}
      </div>
      <h2
        className="movie-card__title"
        onClick={() => {
          props.setVisible(true);
          props.setMovie(props.movie);
          props.setMovieModalId(props.id);
          props.setRecommendationsPage({
            ...props.recommendationsPage,
            currentPage: 1,
          });
        }}
      >
        {props.title}
      </h2>
      <p className="movie-card__text">{genre[0].name}</p>
    </div>
  );
};

export default Movie;
