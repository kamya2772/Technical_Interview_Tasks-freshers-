import React from "react";

function Search({ searchTerm, onSearchChange }) {
  return (
    <input
      type="text"
      placeholder="Search User..."
      value={searchTerm}
      onChange={onSearchChange}
      className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-base flex-grow min-w-[200px]"
    />
  );
}

export default Search;
