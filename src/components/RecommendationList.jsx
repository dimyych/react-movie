/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import Recommendation from "./Recommendation";
import "./styles/Global.css";

const RecommendationList = (props) => {
 
  return (
    <div className="movieList">
      <h2 className="movieList">Recommendation:</h2>
        <div className="movieList__item">
          {props.movies.map((movie, i) => {
            return <Recommendation Modal={props.Modal} id={movie.id} image={movie.poster_path} title={movie.title} genres={props.genres} genresId={movie.genre_ids}/>
          })}
        </div>
      
    </div>
  );
};

export default RecommendationList;

// Modal={props.Modal} key={i} image={movie.poster_path} title={movie.title} release_date={movie.release_date} setVisible={props.setVisible} setMovieModalId={props.setMovieModalId}  id={movie.id}
