import React from "react";

function Movie({ movie, onSelectMovie, index, hovered, setHovered }) {
  return (
    <div
      onClick={() => onSelectMovie(movie.imdbID)}
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={`relative rounded-lg overflow-hidden h-80 w-full transition-all duration-300 ease-out cursor-pointer 
        ${hovered !== null && hovered !== index ? "blur-sm scale-[0.98]" : ""}`}
    >
      <img
        src={movie.Poster}
        alt={movie.Title}
        className="object-cover absolute inset-0 w-full h-full"
      />

      <div
        className={`absolute inset-0 bg-black/50 flex flex-col items-start justify-end p-4 transition-opacity duration-300 
          ${hovered === index ? "opacity-100" : "opacity-0"}`}
      >
        <h1 className="text-white font-semibold text-lg mb-1">{movie.Title}</h1>
        <div className="flex items-center text-gray-300 text-sm">
          <span className="mr-1">🗓</span>
          <span>{movie.Year}</span>
        </div>
      </div>
    </div>
  );
}

export default Movie;
