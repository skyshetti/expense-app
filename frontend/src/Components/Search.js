import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";

//
const Search = props => {
  const { getSearchData } = props;
  const [searchTerm, setSearch] = useState("");

  const handleChange = e => {
    setSearch(e.target.value);
  };

  //
  return (
    <div>
      <form>
        <input type='text' value={searchTerm} onChange={handleChange} />
      </form>
    </div>
  );
};

export default Search;
