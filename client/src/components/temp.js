import React, { useEffect, useState } from "react";
import {
  getAddressOfCoordinates,
  getCoordinatesOfAddress,
  getWeatherAndForecast,
} from "../api/API";
import Loading from "../common/Loading";
import Warning from "../common/Warning";
import CurrentWeather from "./CurrentWeather";
import DailyWeather from "./DailyWeather";
import { weatherActions } from "../store/WeatherSlice";
import { useSelector, useDispatch } from "react-redux";
import SearchLocation from "../weatherApp/SearchLocation";

const WeatherAndForecast = () => {
  const [address, setAddress] = useState("");
  const [coordinates, setCoordinates] = useState({});
  const [weatherAndForecastInfo, setWeatherAndForecastInfo] = useState({});
  const [locationInfo, setLocationInfo] = useState({});
  const [contentState, setContentState] = useState("blank");

  const dispathFn = useDispatch();

  const location = useSelector((state) => state.weather.searchLocation);
  const isSearchButtonClicked = useSelector(
    (state) => state.weather.isSearchButtonClicked
  );

  useEffect(() => {
    if (isSearchButtonClicked === true) setAddress(location);
    dispathFn(weatherActions.setSearchButtonClicked(false));
  }, [isSearchButtonClicked]);

  const showWarning = () => {
    setContentState("warning");
    //setTimeout(() => setContentState("blank"), 3000);
  };

  useEffect(() => {
    const makeRequest = (position) => {
      setContentState("loading");
      getAddressOfCoordinates(
        position.coords.latitude,
        position.coords.longitude
      )
        .then((res) => {
          setLocationInfo({
            city: res.data.results[0].components.city_district,
            town: res.data.results[0].components.town,
            state: res.data.results[0].components.state_code,
            country: res.data.results[0].components.country_code,
          });
        })
        .then(() =>
          setCoordinates({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
        )
        .catch((error) => showWarning());
    };

    function catchError(err) {
      alert("ERROR(" + err.code + "): " + err.message);
    }

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(makeRequest, catchError);
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  useEffect(() => {
    if (address === "") return;

    setContentState("loading");
    getCoordinatesOfAddress(address)
      .then((res) => {
        if (
          res.data.results.length === 0 ||
          (res.data.results[0].components.city === undefined &&
            res.data.results[0].components.town === undefined)
        ) {
          showWarning();
          return;
        }

        setCoordinates(res.data.results[0].geometry);
        setLocationInfo({
          city: res.data.results[0].components.city,
          town: res.data.results[0].components.town,
          state: res.data.results[0].components.state,
          stateCode: res.data.results[0].components.state_code,
          stateDistrict: res.data.results[0].components.state_district,
          country: res.data.results[0].components.country,
        });
      })
      .catch((error) => showWarning());
  }, [address]);

  useEffect(() => {
    if (Object.keys(coordinates).length === 0) return;

    getWeatherAndForecast(coordinates)
      .then((res) => {
        setWeatherAndForecastInfo(res.data);
        setContentState("weatherAndForecast");
      })
      .catch((error) => showWarning());
  }, [coordinates]);

  //thoughts API
  // fetch("https://type.fit/api/quotes")
  // .then(function (response) {
  //   return response.json();
  // })
  // .then(function (data) {
  //   console.log(data);
  // });

  return (
    <div className="min-h-screen bg-gradient-to-r from-secondary to-secondary-dark">
      {contentState === "loading" ? (
        <Loading />
      ) : contentState === "warning" ? (
        <>
          <SearchLocation locationInfo={locationInfo} />
          <Warning />
        </>
      ) : contentState === "weatherAndForecast" ? (
        <>
          <SearchLocation locationInfo={locationInfo} />
          <CurrentWeather weatherInfo={weatherAndForecastInfo} />
          <DailyWeather weatherInfo={weatherAndForecastInfo} />
        </>
      ) : null}
    </div>
  );
};
export default WeatherAndForecast;
