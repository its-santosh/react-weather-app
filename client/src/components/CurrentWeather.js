import React from "react";
import moment from "moment";
import Quote from "./Quote";

const LabelValue = ({ label, value }) => {
  return (
    <div className="flex flex-col">
      <p className="text-sm text-white text-opacity-80 ">{label}</p>
      <p>{value}</p>
    </div>
  );
};

const CurrentWeather = ({ weatherInfo }) => {
  return (
    <section className="md:flex text-white pt-5 pb-4 md:px-20 px-3 w-full md:space-x-5 space-y-5 md:space-y-0">
      <div className="weather-sunny rounded-lg px-4 py-5 md:w-3/5 w-full">
        <div className="text-md font-semibold">CURRENT WEATHER</div>
        <div className="text-xs text-white text-opacity-70">
          {moment.unix(weatherInfo.current.dt).format("llll")}
        </div>
        <div className="flex items-center -ml-3">
          <img
            className="w-28"
            src={
              "https://openweathermap.org/img/wn/" +
              weatherInfo.current.weather[0].icon +
              ".png"
            }
            alt={weatherInfo.current.weather[0].description}
          />

          <div className="text-6xl font-base -mt-2">
            {Math.round(weatherInfo.current.temp)}
            <span>
              <sup className="text-4xl">°C</sup>
            </span>
          </div>
          <div className="pl-10">
            <p className="font-semibold text-md">
              {weatherInfo.current.weather[0].description}
            </p>
            <div className="text-white text-opacity-80">
              FEELS LIKE :
              <span className="text-white">
                {` ${weatherInfo.current.feels_like}°`}{" "}
              </span>
            </div>
          </div>
        </div>
        <div className="pb-8">
          The high will be
          <span> {weatherInfo.daily?.[0]?.temp?.max}°</span>
        </div>
        <div className="grid grid-col md:grid-cols-7 grid-cols-3 gap-y-3">
          <LabelValue
            label="SUNRISE"
            value={moment.unix(weatherInfo.current.sunrise).format("LT")}
          />
          <LabelValue
            label="SUNSET"
            value={moment.unix(weatherInfo.current.sunset).format("LT")}
          />
          <LabelValue
            label="HUMIDITY"
            value={`${weatherInfo.current.humidity}%`}
          />
          <LabelValue
            label="WIND"
            value={`${Math.round(weatherInfo.current.wind_speed * 3.6)} km/h`}
          />
          <LabelValue
            label="PRESSURE"
            value={`${weatherInfo.current.pressure} hPa`}
          />
          <LabelValue label="DEW POINT" value={weatherInfo.current.dew_point} />
          <LabelValue label="CLOUDS" value={`${weatherInfo.current.clouds}%`} />
        </div>
      </div>
      <div className="quote flex justify-center items-center rounded-lg px-4 py-5 md:w-2/5 w-full ">
        <Quote />
      </div>
    </section>
  );
};
export default CurrentWeather;
