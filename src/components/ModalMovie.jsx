/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useState, useEffect, useMemo } from "react";
import MovieList from "./MovieList";
import RecommendationList from "./RecommendationList";
import Pagination from "./Pagination";

import "./styles/ModalMovie.css";

const ModalMovie = ({
  visible,
  setVisible,
  movie_id,
  apiKey,
  setMovieModal,
  setMovieModalId,
  genresMovie,
  recommendationsPage,
  setRecommendationsPage,
  addLikes,
  movie,
  likesVisible,
}) => {
  const rootClasses = ["modalMovie"];
  if (visible) {
    rootClasses.push("active");
  }

  const [movieDetails, setMovieDetails] = useState({});
  const [countrie, setCountrie] = useState();
  const [genres, setGenres] = useState();
  const [companie, setCompanie] = useState();
  const [recommendations, setRecommendations] = useState([]);

  useEffect(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${apiKey}&language=en-US`
    )
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setMovieDetails(data);
        setCountrie(data.production_countries);
        setGenres(data.genres);
        setCompanie(data.production_companies);
      });
  }, [visible]);

  useMemo(() => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${apiKey}&language=en-US&page=1`
    )
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setRecommendations(data.results);
        setRecommendationsPage({
          ...recommendationsPage,
          totalPages: data.total_pages,
        });
      });
  }, [visible]);

  const nextRecommendationsPage = (pageNumber) => {
    fetch(
      `https://api.themoviedb.org/3/movie/${movie_id}/recommendations?api_key=${apiKey}&language=en-US&page=${pageNumber}`
    )
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setRecommendations(data.results);
        setRecommendationsPage({
          ...recommendationsPage,
          currentPage: pageNumber,
        });
      });
  };

  let Countrie,
    Genres,
    Companie,
    Recommendations = [];
  if (countrie && genres && companie && recommendations) {
    Countrie = countrie.map((e) => e.iso_3166_1).join(", ");
    Genres = genres.map((e) => e.name).join(", ");
    Companie = companie.map((e) => e.name).join(", ");
    Recommendations = [...recommendations];
  }

  return (
    <div className={rootClasses.join(" ")} onClick={() => setVisible(false)}>
      <div className="modalMovieContent" onClick={(e) => e.stopPropagation()}>
        <h2 className="modalMovie__title">{movieDetails.title}</h2>
        <div className="modalMovie__details">
          <div style={{ position: "relative" }} className="modalMovie__image">
            {!likesVisible ? <svg
              style={{
                height: "30px",
                cursor: "pointer",
                position: "absolute",
                top: "8px",
                right: "8px",
              }}
              onClick={() => addLikes(movie)}
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
            </svg> : ''}
            {movieDetails.poster_path == null ? (
              <img
                style={{ height: "282.5px" }}
                src={`https://s3-ap-southeast-1.amazonaws.com/upcode/static/default-image.jpg`}
                alt="movie image"
              />
            ) : (
              <img
                src={`https://image.tmdb.org/t/p/w185${movieDetails.poster_path}`}
                alt="movie image"
              />
            )}
          </div>
          <table className="modalMovie__table">
            {movieDetails.tagline ? (
              <tr>
                <td>Tagline:</td>
                <td>{movieDetails.tagline}</td>
              </tr>
            ) : (
              ""
            )}
            {movieDetails.release_date ? (
              <tr>
                <td>Release date:</td>
                <td>{movieDetails.release_date}</td>
              </tr>
            ) : (
              ""
            )}

            {Countrie ? (
              <tr>
                <td>Countrie:</td>
                <td>{Countrie}</td>
              </tr>
            ) : (
              ""
            )}
            {Genres ? (
              <tr>
                <td>Genres:</td>
                <td>{Genres}</td>
              </tr>
            ) : (
              ""
            )}

            {Companie ? (
              <tr>
                <td>Companie:</td>
                <td>{Companie}</td>
              </tr>
            ) : (
              ""
            )}
            {movieDetails.runtime ? (
              <tr>
                <td>Runtime:</td>
                <td>{movieDetails.runtime} min.</td>
              </tr>
            ) : (
              ""
            )}

            {movieDetails.budget || movieDetails.revenue ? (
              <tr>
                <td>
                  {movieDetails.budget ? "Budget" : ""}
                  {movieDetails.revenue && movieDetails.budget ? "/" : ""}
                  {movieDetails.revenue ? "Revenue" : ""}:
                </td>
                <td>
                  {movieDetails.budget ? `${movieDetails.budget}$` : ""}
                  {movieDetails.revenue && movieDetails.budget ? "/" : ""}
                  {movieDetails.revenue ? `${movieDetails.revenue} $` : ""}
                </td>
              </tr>
            ) : (
              ""
            )}
          </table>
        </div>
        {movieDetails.overview ? (
          <div className="">
            <h2 className="modalMovie__title-des">
              About the movie {movieDetails.title}
            </h2>
            <p className="modalMovie__des">{movieDetails.overview}</p>
          </div>
        ) : (
          <h2 className="modalMovie__title-des">The film has no description</h2>
        )}
        {Recommendations.length > 0 ? (
          <RecommendationList
            style={{ padding: "50px 50px" }}
            Modal={"Modal"}
            movies={Recommendations}
            genres={genresMovie}
          />
        ) : (
          ""
        )}

        {recommendationsPage.totalPages > 1 ? (
          <Pagination
            pages={recommendationsPage.totalPages}
            nextPage={nextRecommendationsPage}
            currentPage={recommendationsPage.currentPage}
          />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default ModalMovie;
