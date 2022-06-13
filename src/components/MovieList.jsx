import React from "react";
import Movie from "./Movie";
import "./styles/MovieList.css";
import "./styles/Global.css";

const MovieList = (props) => {
  let whileEmpty;
  if (props.movies.length == 0) {
    if (props.likesVisible) {
      whileEmpty = <h2 className="whileEmpty">While empty...</h2>;
    } else {
      whileEmpty = <h2 className="whileEmpty">Empty...</h2>;
    }
  }

  return (
    <div className="movieList">
      <div className="container">
        {props.search == 0 && !props.likesVisible ? (
          <h2
            style={{
              marginTop: "-25px",
              marginBottom: "25px",
              fontSize: "26px",
            }}
            className="whileEmpty"
          >
            Popular:
          </h2>
        ) : (
          ""
        )}
        <div className="movieList__item">
          {whileEmpty}
          {props.movies.map((movie, i) => {
            return (
              <Movie
                setMovie={props.setMovie}
                movie={movie}
                addLikes={props.addLikes}
                removeLikes={props.removeLikes}
                Modal={props.Modal}
                key={i}
                image={movie.poster_path}
                title={movie.title}
                release_date={movie.release_date}
                setVisible={props.setVisible}
                setMovieModalId={props.setMovieModalId}
                id={movie.id}
                genres={props.genres}
                genresId={movie.genre_ids}
                setRecommendationsPage={props.setRecommendationsPage}
                recommendationsPage={props.recommendationsPage}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
