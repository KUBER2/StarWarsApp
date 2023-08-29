import React, { useState, useEffect, useCallback } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getMoviesHandler = useCallback(() => {
    setIsLoading(true);
    fetch("https://swapi.dev/api/films/")
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((movies) => {
        console.log(movies);
        let transformedMovies = movies.results.map((m) => {
          return {
            id: m.episode_id,
            title: m.title,
            openingText: m.opening_crawl,
            releaseDate: m.release_date,
          };
        });
        setMovies(transformedMovies);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    getMoviesHandler();
  }, [getMoviesHandler]);

  return (
    <React.Fragment>
      <section>
        <button onClick={getMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {!isLoading && movies.length > 0 && <MoviesList movies={movies} />}
        {isLoading && <p>Loading ...</p>}
        {!isLoading && movies.length === 0 && <p>Mo movies</p>}
      </section>
    </React.Fragment>
  );
}

export default App;
