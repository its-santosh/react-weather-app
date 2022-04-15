import BaseLayout from "../layout/BaseLayout";
import WeatherAndForecast from "../components/index.js";

const Weather = () => {
  return (
    <BaseLayout pageType="WeatherApp">
      <div className="h-full">
        <WeatherAndForecast />
      </div>
    </BaseLayout>
  );
};
export default Weather;
