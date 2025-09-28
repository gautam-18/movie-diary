import React from "react";

function WatchedMovie({ movie, onDeleteWatched }) {
  return (
    <div className="flex flex-row items-center gap-10 p-4">
      <img src={movie.poster} alt="" className="h-17 w-14" />
      <div className="flex flex-col items-center gap-4">
        <h1 className="text-white">{movie.title}</h1>
        <div className="flex flex-row w-[100%] items-center justify-between">
          <p>
            <span className="">⭐️</span>
            <span className="text-white">{movie.imdb}</span>
          </p>
          <p>
            <span>🌟</span>
            <span className="text-white">{movie.userRating}</span>
          </p>
          <p>
            <span>⏳</span>
            <span className="text-white">{movie.runtime}</span>
          </p>
          <button
            onClick={() => {
              onDeleteWatched(movie.imdbID);
            }}
          >
            ❌
          </button>
        </div>
      </div>
    </div>
  );
}

export default WatchedMovie;
