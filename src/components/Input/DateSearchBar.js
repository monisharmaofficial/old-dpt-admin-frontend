import React, { useEffect, useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SearchBar({ searchDate, styleClass, placeholderText, setSearchDate }) {
  const [showDatePicker, setShowDatePicker] = useState(false);

  const updateSearchInput = (value) => {
    setSearchDate(value);
  }

  return (
    <div className={"inline-block " + styleClass}>
      <div className="input-group relative flex flex-wrap items-stretch w-full">
        <input
          type="search"
          value={searchDate}
          placeholder={placeholderText || "Search"}
          onChange={(e) => updateSearchInput(e.target.value)}
          onFocus={() => setShowDatePicker(true)} // Show date picker on input focus
          onBlur={() => setShowDatePicker(false)} // Hide date picker on input blur
          className="input input-sm input-bordered w-full max-w-xs"
        />
        {showDatePicker && (
          <DatePicker
            selected={new Date(searchDate)} // You may need to parse searchDate to a Date object if it's a string
            onChange={(date) => {
            //   setStartDate(date);
              setSearchDate(date.toISOString()); // Update the searchDate when a date is selected
              setShowDatePicker(false); // Hide the date picker
            }}
          />
        )}
      </div>
    </div>
  );
}

export default SearchBar;
