import React, { useState } from "react";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  return (
    <div>
      <form class="flex items-center justify-around ">
        <input
          class="border-2 border-gray"
          type="text"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button>Search</button>
      </form>
    </div>
  );
};

export default Search;
