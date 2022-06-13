/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";

const Recommendation = (props) => {
    let genre=[{name:''}]
  if(props.genres){genre = props.genres.filter((e) => e.id == props.genresId[0]);}
  if(genre.length == 0){
    genre=[{name:''}];
  }
  console.log(genre);
  return (
    <div className={["movie-card", props.Modal].join(" ")} key={props.id}>
      <div className="movie-card__image">
        {props.image == null ? (
          <img
            className="none"
            style={{ height: "132.5px" }}
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
      <h2 className="movie-card__title">{props.title}</h2>
      <p className="movie-card__text">{genre[0].name}</p>
    </div>
  );
};

export default Recommendation;
