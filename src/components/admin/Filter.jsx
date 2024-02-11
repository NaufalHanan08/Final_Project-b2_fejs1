import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";

const Filter = ({ onFilterChange, onSearch }) => {
  const [filterType, setFilterType] = useState("DESC");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchText, setSearchText] = useState("");

  const handleFilterChange = (value) => {
    setFilterType(value);
    onFilterChange(value);
  };

  const toggleSearch = () => {
    setIsSearchActive(!isSearchActive);
    setSearchText("");
    onSearch("");
  };

  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    onSearch(text);
  };

  return (
    <div className="flex items-center space-x-4 justify-between bg-gray-800 p-4">
      <div className="flex items-center space-x-2">
        <select
          id="filterDropdown"
          value={filterType}
          onChange={(e) => handleFilterChange(e.target.value)}
          className="py-2 px-4 rounded-md text-sm bg-teal-600 text-white outline-none font-semibold"
        >
          <option value="ASC">ASC</option>
          <option value="DESC">DESC</option>
        </select>
      </div>

      <div className="cursor-pointer flex flex-row-reverse items-center gap-2">
        <FontAwesomeIcon
          icon={faSearch}
          onClick={toggleSearch}
          className="text-white text-lg cursor-pointer"
        />
        {isSearchActive && (
          <div className="relative">
            <input
              type="text"
              value={searchText}
              onChange={handleSearchChange}
              placeholder="Search..."
              className="border outline-none p-2 rounded-md text-sm text-black"
            />
          </div>
        )}
      </div>
    </div>
  );
};

Filter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default Filter;