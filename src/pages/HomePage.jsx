import React, { useEffect } from "react";
import NavBar from "../components/NavBar";
import Logo from "../components/Logo";
import SearchWithContext from "../components/SearchWithContext";
import NumResult from "../components/NumResult";
import MovieList from "../components/MovieList";
import MovieDetails from "../components/MovieDetails";
import Navigation from "../components/Navigation";
import { useMovieContext } from "../context/MovieContext";
import { BackgroundBeams } from "../components/ui/BackgroundBeams";

function HomePage() {
  const { state, actions } = useMovieContext();
  const { query, movies, isLoading, error, selectedId, watched } = state;
  const KEY = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    const controller = new AbortController();

    async function fetchMovies() {
      try {
        actions.setLoading(true);
        actions.setError("");
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );
        if (!res.ok)
          throw new Error("Something went wrong with fetching movies");
        const data = await res.json();
        if (data.Response === "False") throw new Error("Movie Not Found");
        actions.setMovies(data.Search);
      } catch (err) {
        if (err.name !== "AbortError") actions.setError(err.message);
      } finally {
        actions.setLoading(false);
      }
    }

    if (query.length < 3) {
      actions.clearMovies();
      return;
    }

    fetchMovies();
    return () => controller.abort();
  }, [query]);

  function handleSelectMovie(id) {
    actions.setSelectedId(id === selectedId ? "" : id);
  }

  function handleCloseMovieDetails() {
    actions.setSelectedId("");
  }

  function handleAddWatched(movie) {
    actions.addWatched(movie);
  }

  return (
    <div className="relative bg-[#212529] min-h-screen w-full overflow-x-hidden flex flex-col">
      <BackgroundBeams className="inset-0 z-0" />

      <div className="relative z-10 w-full">
        <NavBar>
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3 sm:gap-0">
            <Logo />
            <SearchWithContext />
            <div className="flex items-center gap-2 sm:gap-4">
              <NumResult movies={movies} />
              <Navigation />
            </div>
          </div>
        </NavBar>
      </div>

      <div className="relative z-10 flex-1 w-full flex justify-center px-2 sm:px-4">
        <div className="w-full max-w-7xl py-4 sm:py-6">
          {isLoading ? (
            <div className="text-white text-center text-lg sm:text-xl py-20">
              Loading...
            </div>
          ) : error ? (
            <div className="text-red-500 text-center text-lg sm:text-xl py-20">
              {error}
            </div>
          ) : movies.length > 0 ? (
            <MovieList movies={movies} onSelectMovie={handleSelectMovie} />
          ) : (
            <div className="text-center text-slate-400 py-20">
              <div className="text-4xl sm:text-6xl mb-4">🎬</div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-2">
                Search for movies
              </h2>
              <p className="text-sm sm:text-base">
                Type at least 3 characters to start searching
              </p>
            </div>
          )}
        </div>
      </div>

      {selectedId && (
        <MovieDetails
          selectedId={selectedId}
          onAddWatched={handleAddWatched}
          watched={watched}
          onClose={handleCloseMovieDetails}
        />
      )}
    </div>
  );
}

export default HomePage;
