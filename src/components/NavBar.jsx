import React from "react";

function NavBar({ children }) {
  return (
    <div className="relative w-full px-2 sm:px-4 py-2 sm:py-4">
      <div className="relative bg-gradient-to-r from-slate-900/90 via-slate-800/90 to-slate-900/90 backdrop-blur-xl border border-slate-700/50 rounded-xl sm:rounded-2xl shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-blue-600/10 rounded-xl sm:rounded-2xl blur-xl pointer-events-none"></div>

        <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-blue-500/20 opacity-50 pointer-events-none"></div>
        <div className="absolute inset-[1px] rounded-xl sm:rounded-2xl bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 pointer-events-none"></div>

        <div className="relative flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0 px-3 sm:px-8 py-3 sm:py-4">
          <div className="absolute inset-0 opacity-5 pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12"></div>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between w-full gap-3 sm:gap-0">
            {children}
          </div>
        </div>

        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-16 sm:w-32 h-[1px] bg-gradient-to-r from-transparent via-blue-400/60 to-transparent pointer-events-none"></div>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-blue-600/5 rounded-2xl sm:rounded-3xl blur-2xl transform scale-110 pointer-events-none"></div>
    </div>
  );
}

export default NavBar;
