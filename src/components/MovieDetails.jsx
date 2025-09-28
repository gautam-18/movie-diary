import React, { useEffect, useState, useRef } from "react";
import { X, Star, Calendar, Clock, User, Film } from "lucide-react";

function MovieDetails({ selectedId, onAddWatched, watched, onClose }) {
  const KEY = "696ad85d";
  const sidebarRef = useRef(null);
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId);
  const [movie, setMovie] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const {
    Title: title,
    Year: year,
    Poster: poster,
    Runtime: runtime,
    imdbRating: imdb,
    Plot: plot,
    Released: released,
    Actors: actor,
    Director: director,
    Genre: genre,
  } = movie;

  function handleAdd() {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      ImdbRating: Number(imdb),
      imdbRating: Number(imdb),
      runtime: runtime?.split(" ")[0] || "N/A",
      userRating: 0,
    };
    onAddWatched(newWatchedMovie);
  }

  useEffect(() => {
    function handleClickOutside(event) {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  useEffect(() => {
    async function getMovieDetails() {
      try {
        setIsLoading(true);
        const res = await fetch(
          `http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`
        );
        const data = await res.json();
        setMovie(data);
      } catch (error) {
        console.error("Error fetching movie details:", error);
      } finally {
        setIsLoading(false);
      }
    }

    if (selectedId) {
      getMovieDetails();
    }
  }, [selectedId]);

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] flex justify-end">
        <div
          ref={sidebarRef}
          className="w-full max-w-md h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl border-l border-slate-700/50 flex items-center justify-center"
        >
          <div className="flex flex-col items-center gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-400"></div>
            <p className="text-slate-300">Loading movie details...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] flex justify-end animate-in fade-in duration-300">
      <div
        ref={sidebarRef}
        className="w-full max-w-md h-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 shadow-2xl border-l border-slate-700/50 overflow-y-auto animate-in slide-in-from-right duration-300"
      >
        <div className="sticky top-0 bg-slate-900/90 backdrop-blur-sm border-b border-slate-700/50 p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold text-white">Movie Details</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-all duration-200 hover:scale-110"
          >
            <X size={20} />
          </button>
        </div>

        <div className="relative">
          {poster && poster !== "N/A" && (
            <div
              className="absolute inset-0 opacity-20 blur-xl"
              style={{
                backgroundImage: `url(${poster})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          )}

          <div className="relative p-6 flex gap-4">
            {poster && poster !== "N/A" ? (
              <img
                src={poster}
                alt={title}
                className="w-32 h-48 object-cover rounded-xl shadow-2xl border border-slate-700/50"
              />
            ) : (
              <div className="w-32 h-48 bg-slate-700 rounded-xl flex items-center justify-center">
                <Film className="text-slate-500" size={40} />
              </div>
            )}

            <div className="flex-1 space-y-3">
              <h1 className="text-xl font-bold text-white leading-tight">
                {title || "Unknown Title"}
              </h1>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-slate-300">
                  <Calendar size={16} />
                  <span className="text-sm">{released || year || "N/A"}</span>
                </div>

                {runtime && (
                  <div className="flex items-center gap-2 text-slate-300">
                    <Clock size={16} />
                    <span className="text-sm">{runtime}</span>
                  </div>
                )}

                {genre && (
                  <div className="flex flex-wrap gap-1">
                    {genre.split(", ").map((g, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-md border border-blue-500/30"
                      >
                        {g}
                      </span>
                    ))}
                  </div>
                )}

                {imdb && (
                  <div className="flex items-center gap-2">
                    <Star className="text-yellow-400 fill-current" size={16} />
                    <span className="text-yellow-400 font-semibold">
                      {imdb}
                    </span>
                    <span className="text-slate-400 text-sm">IMDb</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="px-6 pb-6">
          {!isWatched ? (
            <button
              onClick={handleAdd}
              className="w-full py-3 px-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-blue-500/25"
            >
              Add to Watchlist
            </button>
          ) : (
            <div className="w-full py-3 px-4 bg-green-500/20 text-green-300 font-semibold rounded-xl text-center border border-green-500/30">
              ✓ Already in your watchlist
            </div>
          )}
        </div>

        <div className="px-6 pb-6 space-y-6">
          {plot && plot !== "N/A" && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                Plot
              </h3>
              <p className="text-slate-300 leading-relaxed text-sm bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                {plot}
              </p>
            </div>
          )}

          {actor && actor !== "N/A" && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-2">
                <User size={16} />
                Cast
              </h3>
              <p className="text-slate-300 text-sm bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                {actor}
              </p>
            </div>
          )}

          {director && director !== "N/A" && (
            <div className="space-y-2">
              <h3 className="text-sm font-semibold text-slate-300 uppercase tracking-wider">
                Director
              </h3>
              <p className="text-slate-300 text-sm bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                {director}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MovieDetails;
