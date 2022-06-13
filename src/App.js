import React, { useState, useMemo, useEffect } from "react";
import "./App.css";
import "./components/styles/Global.css";

import Nav from "./components/Nav";
import MovieList from "./components/MovieList";
import Pagination from "./components/Pagination";
import ModalMovie from "./components/ModalMovie";
import Likes from "./components/Likes";
import Header from "./components/Header";

function App() {
  const apiKey = "3b63a23c580d82f2fd5f3fcea2a73e28";

  const [movies, setMovies] = useState([]);
  const [searchMovies, setSearchMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState({ totalPages: 0, currentPage: 1 });
  const [moviePage, setMoviePage] = useState({
    totalPages: 500,
    currentPage: 1,
  });
  const [movieModal, setMovieModal] = useState(false);
  const [movieModalId, setMovieModalId] = useState("");
  const [genres, setGenres] = useState();
  const [recommendationsPage, setRecommendationsPage] = useState({
    totalPages: 0,
    currentPage: 1,
  });
  const [likes, setLikes] = useState([]);
  const [likesVisible, setLikesVisible] = useState(false);
  const [movie, setMovie] = useState({});

  let Genres;
  if (genres) {
    Genres = genres;
  }

  useEffect(() => {
    fetchPosts();
    fetchGenres();
  }, []);

  async function fetchPosts() {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    )
      .then((data) => data.json())
      .then((data) => {
        setMovies(data.results);
        setSearchMovies(data.results);
      });
  }
  async function fetchGenres() {
    fetch(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`
    )
      .then((data) => data.json())
      .then((data) => {
        setGenres(data.genres);
      });
  }
  console.log(Genres);

  const nextPageMovie = (pageNumber) => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=${pageNumber}`
    )
      .then((data) => data.json())
      .then((data) => {
        setSearchMovies(data.results);
        setMoviePage({ ...moviePage, currentPage: pageNumber });
      });
  };

  useMemo(() => {
  
    if (search) {
      fetch(
        `https://api.themoviedb.org/4/search/movie?api_key=${apiKey}&query=${search}`
      )
        .then((data) => data.json())
        .then((data) => {
          console.log(data);
          setSearchMovies(data.results);
          setPage({ ...page, totalPages: data.total_pages});
        });
    } else {
      setSearchMovies(movies);
      nextPageMovie(1)
    }
  }, [search]);

  const nextPage = (pageNumber) => {
    fetch(
      `https://api.themoviedb.org/4/search/movie?api_key=${apiKey}&query=${search}&page=${pageNumber}`
    )
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        setSearchMovies(data.results);
        setPage({ ...page, currentPage: pageNumber });
      });
  };

  const addLikes = (movie) => {
    if (!likes.includes(movie)) setLikes([...likes, movie]);
  };

  const removeLikes = (movie) => {
    setLikes(likes.filter((e) => e.id !== movie.id));
  };

  const PaginationSearch = search && page.totalPages > 1 ? true : false;
  const PaginationMovie = !search ? true : false;
  console.log(Genres);

  return (
    <div className="App">
      <Header setSearch={setSearch} nextPageMovie={nextPageMovie} setLikesVisible={setLikesVisible}/>
      <ModalMovie
      likesVisible={likesVisible}
        addLikes={addLikes}
        movie={movie}
        setMovie={setMovie}
        visible={movieModal}
        setVisible={setMovieModal}
        movie_id={movieModalId}
        apiKey={apiKey}
        setMovieModalId={setMovieModalId}
        genresMovie={Genres}
        recommendationsPage={recommendationsPage}
        setRecommendationsPage={setRecommendationsPage}
      />
      {!likesVisible ? (
        <Nav
          likesVisible={likesVisible}
          setLikesVisible={setLikesVisible}
          movie={movies}
          setMovie={setMovies}
          search={search}
          setSearch={setSearch}
          page={page}
          setPage={setPage}
        />
      ) : (
        ""
      )}

      {!likesVisible ? (
        <MovieList
        search={search}
          movie={movie}
          setMovie={setMovie}
          movies={searchMovies}
          setVisible={setMovieModal}
          setMovieModalId={setMovieModalId}
          genres={Genres}
          setRecommendationsPage={setRecommendationsPage}
          recommendationsPage={recommendationsPage}
          addLikes={addLikes}
          removeLikes={removeLikes}
        />
      ) : (
        <Likes
          setMovie={setMovie}
          likesVisible={likesVisible}
          setLikesVisible={setLikesVisible}
          likes={likes}
          setMovieModal={setMovieModal}
          setMovieModalId={setMovieModalId}
          Genres={Genres}
          setRecommendationsPage={setRecommendationsPage}
          recommendationsPage={recommendationsPage}
          removeLikes={removeLikes}
        />
      )}

      {!likesVisible ? (
        <div className="container">
          {PaginationSearch ? (
            <Pagination
              pages={page.totalPages}
              nextPage={nextPage}
              currentPage={page.currentPage}
            />
          ) : (
            ""
          )}
          {PaginationMovie ? (
            <Pagination
              pages={moviePage.totalPages}
              nextPage={nextPageMovie}
              currentPage={moviePage.currentPage}
            />
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}

      <img src="./img/heart-solid.svg" alt="" />
    </div>
  );
}

export default App;
