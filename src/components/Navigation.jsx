import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Heart, Search, Home } from "lucide-react";
import { useMovieContext } from "../context/MovieContext";

function Navigation() {
  const location = useLocation();
  const { state } = useMovieContext();
  const { watched } = state;
  const isWatchlistPage = location.pathname === "/watchlist";

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      <Link
        to="/"
        className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg transition-all duration-200 font-medium text-xs sm:text-sm ${
          !isWatchlistPage
            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
            : "bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white border border-slate-600/30"
        }`}
      >
        <Search size={14} className="sm:w-4 sm:h-4" />
        <span className="hidden xs:inline">Search</span>
      </Link>

      <Link
        to="/watchlist"
        className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-1.5 sm:py-2 rounded-md sm:rounded-lg transition-all duration-200 font-medium text-xs sm:text-sm relative ${
          isWatchlistPage
            ? "bg-gradient-to-r from-pink-600 to-red-600 text-white shadow-lg"
            : "bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white border border-slate-600/30"
        }`}
      >
        <Heart size={14} className="sm:w-4 sm:h-4" />
        <span className="hidden xs:inline">Watchlist</span>
        {watched.length > 0 && (
          <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-[10px] sm:text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center font-bold">
            {watched.length > 99 ? "99+" : watched.length}
          </span>
        )}
      </Link>
    </div>
  );
}

export default Navigation;
