import React from "react";

function Summary({ watched }) {
  if (!watched || watched.length === 0) {
    return (
      <div className="flex flex-col gap-3 sm:gap-4 w-full">
        <h1 className="text-white tracking-wide text-sm sm:text-lg font-semibold">
          MOVIES YOU WATCHED
        </h1>
        <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
          <div className="flex items-center gap-1 sm:gap-2">
            <span className="text-base sm:text-xl">🎬</span>
            <p className="text-white text-sm sm:text-base font-medium">
              0 movies
            </p>
          </div>
          <div className="flex items-center gap-1 text-white text-sm sm:text-base">
            <span>⭐</span>
            <span>0.0</span>
          </div>
          <div className="flex items-center gap-1 text-white text-sm sm:text-base">
            <span>🌟</span>
            <span>0.0</span>
          </div>
          <div className="flex items-center gap-1 text-white text-sm sm:text-base">
            <span>⏳</span>
            <span>0 min</span>
          </div>
        </div>
      </div>
    );
  }

  const average = (arr) =>
    arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

  const avgImdbRating = average(
    watched.map((movie) => movie.ImdbRating || movie.imdbRating || 0)
  ).toFixed(1);

  const avgRunTime = average(
    watched.map((movie) => {
      const runtime = movie.runtime;
      if (typeof runtime === "string") {
        return parseFloat(runtime) || 0;
      }
      return runtime || 0;
    })
  ).toFixed(0);

  const avgUserRating = average(
    watched.map((movie) => movie.userRating || 0)
  ).toFixed(1);

  return (
    <div className="flex flex-col gap-3 sm:gap-4 w-full">
      <h1 className="text-white tracking-wide text-sm sm:text-lg font-semibold">
        MOVIES YOU WATCHED
      </h1>
      <div className="flex flex-wrap items-center justify-between gap-2 sm:gap-4">
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="text-base sm:text-xl">🎬</span>
          <p className="text-white text-sm sm:text-base font-medium">
            {watched.length} movies
          </p>
        </div>
        <div className="flex items-center gap-1 text-white text-sm sm:text-base">
          <span>⭐</span>
          <span>{avgImdbRating}</span>
        </div>
        <div className="flex items-center gap-1 text-white text-sm sm:text-base">
          <span>🌟</span>
          <span>{avgUserRating}</span>
        </div>
        <div className="flex items-center gap-1 text-white text-sm sm:text-base">
          <span>⏳</span>
          <span>{avgRunTime} min</span>
        </div>
      </div>
    </div>
  );
}

export default Summary;
