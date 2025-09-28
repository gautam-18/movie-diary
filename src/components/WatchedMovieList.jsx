import React from "react";
import WatchedMovie from "./WatchedMovie";
function WatchedMovieList({ watched, onDeleteWatched }) {
  return (
    <div>
      {watched.map((movie) => (
        <WatchedMovie
          movie={movie}
          key={movie.imdbID}
          onDeleteWatched={onDeleteWatched}
        />
      ))}
    </div>
  );
}

export default WatchedMovieList;
