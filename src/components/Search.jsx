import React from "react";

function Search({ value, onChange }) {
  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        id="search"
        type="text"
        placeholder="Type a name to search..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

export default Search;

