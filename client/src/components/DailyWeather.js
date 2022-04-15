import React from "react";
import moment from "moment";
import { WiHumidity, WiWindy } from "weather-icons-react";

const DailyWeather = ({ weatherInfo }) => {
  
  let dailyWeatherList = weatherInfo.daily;

  return (
    <React.Fragment>
      <section className="text-white md:px-20 px-3 pb-5">
        <div className="text-md text-white font-semibold mb-2">
          7 DAY FORECAST
        </div>
        <div className="grid grid-col md:grid-cols-7 grid-cols-2 justify-between gap-x-6 gap-y-6 font-normal">
          {dailyWeatherList.map((daily, idx) => {
            if (idx !== 0) {
              return (
                <div
                  key={idx}
                  className="w-full bg-white bg-opacity-10 hover:bg-opacity-20 cursor-pointer flex flex-col items-center rounded-lg p-4 space-y-1"
                >
                  <p>
                    {moment.unix(daily.dt).format("llll").split(",")[0]}
                    {", "}
                    <span>
                      {moment.unix(daily.dt).format("llll").split(",")[1]}
                    </span>
                  </p>
                  <img
                    className="h-16 w-16"
                    src={
                      "https://openweathermap.org/img/wn/" +
                      daily.weather[0].icon +
                      ".png"
                    }
                    alt={daily.weather[0].description}
                  />
                  <p className="">
                    {Math.round(daily.temp.max)}
                    <span>
                      <sup className="">°</sup>
                    </span>
                    {" / "}
                    {Math.round(daily.temp.min)}
                    <span>
                      <sup className="">°</sup>
                    </span>
                  </p>
                  <p className="flex space-x-1">
                    <WiHumidity size="24" color="" />
                    <span>{daily.humidity}%</span>
                  </p>
                  <p className="flex space-x-1">
                    <WiWindy size="24" color="" />
                    <span>{Math.round(daily.wind_speed * 3.6)} km/h</span>
                  </p>
                </div>
              );
            }
          })}
        </div>
      </section>
    </React.Fragment>
  );
};
export default DailyWeather;
