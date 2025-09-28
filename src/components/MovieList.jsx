import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Movie from "./Movie";

function MovieList({ movies, onSelectMovie }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 py-6">
      {movies?.map((movie, idx) => (
        <div
          key={movie.imdbID}
          className="relative group block p-2 h-full w-full"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <AnimatePresence>
            {hoveredIndex === idx && (
              <motion.span
                className="absolute inset-0 h-full w-full bg-neutral-200 dark:bg-[#1D2440] block rounded-3xl"
                layoutId="hoverBackground"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: 1,
                  transition: { duration: 0.15 },
                }}
                exit={{
                  opacity: 0,
                  transition: { duration: 0.15, delay: 0.2 },
                }}
              />
            )}
          </AnimatePresence>

          <div className="rounded-2xl h-full w-full overflow-hidden bg-[#2B3035] border border-transparent dark:border-white/20 group-hover:border-slate-700 relative z-20">
            <Movie movie={movie} onSelectMovie={onSelectMovie} />
          </div>
        </div>
      ))}
    </div>
  );
}

export default MovieList;
