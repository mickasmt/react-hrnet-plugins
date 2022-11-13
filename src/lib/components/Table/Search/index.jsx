import PropTypes from "prop-types";
import React, { useState } from "react";

import { ReactComponent as SearchIcon } from "assets/icons/search.svg";

/**
 * Search for Table Component
 * @param {function} onPageChange Function for onChange on search input
 * @returns {React.ReactElement}
 */
function Search({ onSearch }) {
  const [search, setSearch] = useState("");

  const onInputChange = value => {
    setSearch(value);
    onSearch(value);
  };

  return (
    <div className="relative">
      <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
        <SearchIcon className="w-5 h-5 text-gray-500"/>
      </div>
      
      <input
        type="text"
        id="table-search"
        className="block p-2 pl-10 w-80 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
        placeholder="Search for items"
        value={search}
        onChange={e => onInputChange(e.target.value)}
      />
    </div>
  );
}

Search.propTypes = {
  onSearch: PropTypes.func.isRequired,
};
export default Search;