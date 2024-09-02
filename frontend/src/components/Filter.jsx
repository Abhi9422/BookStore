import React, { useState } from "react";

const Filter = ({ onFilterChange }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [filters, setFilters] = useState({
    fiveStars: false,
    latest: false,
    action: false,
    comics: false,
    horror: false,
    history: false,
    romance: false,
  });

  const toggleFilterBar = () => {
    setIsVisible(!isVisible);
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));

    onFilterChange(name, checked);
  };

  return (
    <div className="relative w-full sm:w-64 h-auto shadow-lg bg-gray-100 p-4 rounded-md overflow-hidden">
      {/* Toggle Button for Small Screens */}
      <button
        className="block sm:hidden w-full bg-gray-700 text-white px-4 py-2 rounded-md mb-2"
        onClick={toggleFilterBar}
      >
        {isVisible ? "Hide Filters" : "Show Filters"}
      </button>

      {/* Filter Options */}
      <div
        className={`${
          isVisible ? "block" : "hidden"
        } sm:block h-full overflow-auto`}
      >
        <h3 className="text-lg font-semibold mb-4">Filter Options</h3>
        <div className="space-y-2">
          {Object.entries(filters).map(([key, value]) => (
            <label key={key} className="flex items-center space-x-2 text-sm">
              <input
                type="checkbox"
                name={key}
                checked={value}
                onChange={handleCheckboxChange}
                className="form-checkbox"
              />
              <span className="text-gray-800 capitalize">{key.replace(/([A-Z])/g, ' $1').toLowerCase()}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Filter;
