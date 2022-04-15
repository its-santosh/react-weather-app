import React, { useEffect, useState } from "react";
import Loading from "../common/Loading";
import Warning from "../common/Warning";
import CurrentWeather from "./CurrentWeather";
import DailyWeather from "./DailyWeather";
import { weatherActions } from "../store/WeatherSlice";
import { useSelector, useDispatch } from "react-redux";
import SearchLocation from "./SearchLocation";
import { useLazyQuery } from "@apollo/client";
import { GET_COA, GET_WAF, GET_AOC } from "../graphql/queries";

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

  const [getCoordinatesOfAddress] = useLazyQuery(GET_COA, {
    onCompleted: (data) => {
      if (data) {
        if (
          data.getCOA.length === 0 ||
          (data.getCOA[0].components.city === undefined &&
            data.getCOA[0].components.town === undefined)
        ) {
          showWarning();
          return;
        }

        setCoordinates(data.getCOA[0].geometry);
        setLocationInfo({
          city: data.getCOA[0].components.city,
          town: data.getCOA[0].components.town,
          state: data.getCOA[0].components.state,
          stateCode: data.getCOA[0].components.state_code,
          stateDistrict: data.getCOA[0].components.state_district,
          country: data.getCOA[0].components.country,
        });
      }
    },
    onError: (error) => {
      showWarning();
      console.log(error);
    },
  });

  const [getWeatherAndForecast] = useLazyQuery(GET_WAF, {
    onCompleted: (data) => {
      if (data) {
        setWeatherAndForecastInfo(data.getWAF);
        setContentState("weatherAndForecast");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const [getAddressOfCoordinates] = useLazyQuery(GET_AOC, {
    onCompleted: (data) => {
      if (data) {
        setLocationInfo({
          city: data.getAOC[0].components.city,
          town: data.getAOC[0].components.town,
          state: data.getAOC[0].components.state,
          stateCode: data.getAOC[0].components.state_code,
          stateDistrict: data.getAOC[0].components.state_district,
          country: data.getAOC[0].components.country,
        });
      }
    },
    onError: (error) => {
      showWarning();
      console.log(error);
    },
  });

  useEffect(() => {
    if (isSearchButtonClicked === true) setAddress(location);
    dispathFn(weatherActions.setSearchButtonClicked(false));
  }, [isSearchButtonClicked]);

  const showWarning = () => {
    setContentState("warning");
    //setTimeout(() => setContentState("blank"), 3000);
  };

  useEffect(() => {
    setContentState("loading");
    const makeRequest = async (position) => {
      await getAddressOfCoordinates({
        variables: {
          input: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        },
      });

      setCoordinates({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
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
    getCoordinatesOfAddress({
      variables: {
        address: address,
      },
    });
  }, [address]);

  useEffect(() => {
    if (Object.keys(coordinates).length === 0) return;
    setContentState("loading");
    getWeatherAndForecast({
      variables: {
        input: {
          latitude: coordinates.lat,
          longitude: coordinates.lng,
          exclude: "minutely,hourly,alerts",
          units: "metric",
        },
      },
    });
  }, [coordinates]);

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
