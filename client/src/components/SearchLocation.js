import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { weatherActions } from "../store/WeatherSlice"; 

const SearchLocation = ({ locationInfo }) => {
  const dispatchFn = useDispatch();

  const location = useSelector((state) => state.weather.SearchLocation);

  function handleInputChange(e) {
    dispatchFn(weatherActions.setLocation(e.target.value));
  }

  function handleButtonClick() {
    dispatchFn(weatherActions.setSearchButtonClicked(true));
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") handleButtonClick();
  }

  return (
    <div className="md:flex w-full bg-secondary-darker md:px-20 px-3 py-2">
      <div className="flex justify-between md:w-80 bg-white w-full bg-opacity-20 space-x-4 rounded-full hover:shadow h-8 px-3">
        <input
          className="bg-transparent md:w-72 text-white focus:outline-none "
          value={location}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          placeholder="Search for location"
        />
        <button className="text-white" onClick={handleButtonClick}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      <div className="flex justify-center items-center text-white text-opacity-80 md:pl-10">
        {locationInfo.city || locationInfo.town}
        {`${" ("}${locationInfo.state}${") "}`}
        {locationInfo.country && locationInfo.country.toUpperCase()}
      </div>
    </div>
  );
};

export default SearchLocation;
