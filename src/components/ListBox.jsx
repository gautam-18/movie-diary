import React from "react";

function ListBox({ children }) {
  return (
    <div className="w-full h-screen bg-[#2B3035] overflow-y-auto p-3 lg:w-1/2">
      {children}
    </div>
  );
}

export default ListBox;
