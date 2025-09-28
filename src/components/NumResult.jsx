import React from "react";

function NumResult({ movies }) {
  return (
    <div className="hidden sm:block">
      <h1 className="text-base sm:text-lg md:text-xl text-white font-medium">
        Found {movies.length} results
      </h1>
    </div>
  );
}

export default NumResult;
