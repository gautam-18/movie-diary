import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Trash2, Film, Search } from "lucide-react";
import { useMovieContext } from "../context/MovieContext";
import NavBar from "../components/NavBar";
import Logo from "../components/Logo";
import Navigation from "../components/Navigation";
import WatchedMovieList from "../components/WatchedMovieList";
import Summary from "../components/Summary";
import { BackgroundBeams } from "../components/ui/BackgroundBeams";

function WatchlistPage() {
  const { state, actions } = useMovieContext();
  const { watched } = state;

  function handleClearAll() {
    if (
      window.confirm("Are you sure you want to clear your entire watchlist?")
    ) {
      localStorage.removeItem("movieWatchlist");
      actions.loadWatched([]);
    }
  }

  return (
    <div className="relative bg-[#212529] min-h-screen w-full overflow-x-hidden flex flex-col">
      <BackgroundBeams className="inset-0 z-0" />

      <div className="relative z-10 w-full">
        <NavBar>
          <div className="flex flex-col sm:flex-row items-center justify-between w-full gap-3 sm:gap-0">
            <Logo />
            <div className="flex-1 hidden sm:block"></div>
            <Navigation />
          </div>
        </NavBar>
      </div>

      <div className="relative z-10 w-full flex-1 px-2 sm:px-4">
        <div className="w-full max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 sm:mb-8 pt-4">
            <div className="flex items-center gap-3">
              <Heart className="text-pink-500 fill-current" size={24} />
              <h1 className="text-2xl sm:text-3xl font-bold text-white">
                My Watchlist
              </h1>
            </div>

            {watched.length > 0 && (
              <button
                onClick={handleClearAll}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-red-600/20 hover:bg-red-600 text-red-400 hover:text-white rounded-lg transition-all duration-200 border border-red-600/30 hover:border-red-600 text-sm sm:text-base"
              >
                <Trash2 size={16} className="sm:w-[18px] sm:h-[18px]" />
                <span className="hidden xs:inline">Clear All</span>
                <span className="xs:hidden">Clear</span>
              </button>
            )}
          </div>

          {watched.length === 0 ? (
            <div className="text-center text-slate-400 py-12 sm:py-20 px-4">
              <div className="relative mb-6">
                <Heart
                  size={60}
                  className="sm:w-20 sm:h-20 mx-auto mb-6 text-slate-600"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-red-500/20 blur-3xl rounded-full"></div>
              </div>
              <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-white">
                Your watchlist is empty
              </h2>
              <p className="mb-6 sm:mb-8 text-base sm:text-lg text-slate-400">
                Start adding movies you want to watch!
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-xl text-sm sm:text-base"
              >
                <Search size={18} className="sm:w-5 sm:h-5" />
                Browse Movies
              </Link>
            </div>
          ) : (
            <div className="space-y-6 sm:space-y-8 pb-6">
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-700/50 backdrop-blur-sm">
                <Summary watched={watched} />
              </div>

              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-slate-700/50 backdrop-blur-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
                  <h2 className="text-xl sm:text-2xl font-semibold text-white flex items-center gap-2">
                    <Film size={20} className="sm:w-6 sm:h-6" />
                    Your Movies ({watched.length})
                  </h2>
                </div>
                <WatchedMovieList
                  watched={watched}
                  onDeleteWatched={actions.removeWatched}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WatchlistPage;
