import React from "react";
import { Search as SearchIcon } from "lucide-react";
import { useMovieContext } from "../context/MovieContext";

function SearchWithContext() {
  const { state, actions } = useMovieContext();
  const { query } = state;

  return (
    <div className="relative w-full sm:w-[60%] md:w-[50%] lg:w-[40%] xl:w-[30%] min-w-[200px] max-w-[400px]">
      <div className="relative bg-slate-800/50 backdrop-blur-sm border border-slate-600/40 rounded-lg sm:rounded-xl shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 pointer-events-none"></div>

        <div className="relative flex items-center z-10">
          <div className="absolute left-2 sm:left-3 pointer-events-none">
            <SearchIcon
              size={16}
              className="sm:w-[18px] sm:h-[18px] text-slate-400 transition-colors duration-200"
            />
          </div>

          <input
            type="text"
            value={query}
            onChange={(e) => actions.setQuery(e.target.value)}
            placeholder="Search movies..."
            className="w-full pl-8 sm:pl-10 pr-3 sm:pr-4 py-2 sm:py-3 bg-transparent text-white placeholder-slate-400 outline-none font-medium text-sm focus:placeholder-slate-500 transition-all duration-200 z-10 relative"
          />

          <div className="absolute inset-0 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-0 focus-within:opacity-100 pointer-events-none transition-opacity duration-200"></div>
        </div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-[2px] bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 focus-within:w-3/4 pointer-events-none"></div>
      </div>
    </div>
  );
}

export default SearchWithContext;
