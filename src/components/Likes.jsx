import React from "react";
import MovieList from "./MovieList";
import "./styles/Global.css";
import "./styles/Likes.css";

const Likes = ({
  likes,
  setMovieModal,
  setMovieModalId,
  Genres,
  setRecommendationsPage,
  recommendationsPage,
  addLikes,
  removeLikes,
  likesVisible,
  setLikesVisible,
  setMovie,
}) => {
  console.log(likes);
  return (
    <div className="Likes">
      <div className="Likes__back" onClick={()=>setLikesVisible(false)}>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="arrow-up"
          class="svg-inline--fa fa-arrow-up fa-w-14"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M34.9 289.5l-22.2-22.2c-9.4-9.4-9.4-24.6 0-33.9L207 39c9.4-9.4 24.6-9.4 33.9 0l194.3 194.3c9.4 9.4 9.4 24.6 0 33.9L413 289.4c-9.5 9.5-25 9.3-34.3-.4L264 168.6V456c0 13.3-10.7 24-24 24h-32c-13.3 0-24-10.7-24-24V168.6L69.2 289.1c-9.3 9.8-24.8 10-34.3.4z"
          ></path>
        </svg>
        <h2>Back</h2>
      </div>
      <MovieList
      likesVisible={likesVisible}
      setMovie={setMovie}
        movies={likes}
        setVisible={setMovieModal}
        setMovieModalId={setMovieModalId}
        genres={Genres}
        setRecommendationsPage={setRecommendationsPage}
        recommendationsPage={recommendationsPage}
        addLikes={addLikes}
        removeLikes={removeLikes}
      />
    </div>
  );
};

export default Likes;
