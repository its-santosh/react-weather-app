const { RESTDataSource } = require("apollo-datasource-rest");

class OpenWeatherAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = process.env.OPEN_WEATHER_BASE_URI;
  }

  async getWAF(input) {
    const response = await this.get("", {
      lat: input.latitude,
      lon: input.longitude,
      exclude: input.exclude,
      appid: process.env.OPEN_WEATHER_APP_ID,
      units: input.units,
    });
    return response;
  }

  async getCOA(address) {
    const response = await this.get(process.env.OPEN_CAGE_GEOCODE_URI, {
      key: process.env.OPEN_WEATHER_KEY,
      q: address,
      language: process.env.OPEN_CAGE_GEOCODE_LANGUAGE,
    });
    return response?.results;
  }

  async getAOC(input) {
    const response = await this.get(process.env.OPEN_CAGE_GEOCODE_URI, {
      key: process.env.OPEN_WEATHER_KEY,
      q: `${input.latitude}+${input.longitude}`,
      language: process.env.OPEN_CAGE_GEOCODE_LANGUAGE,
    });
    return response?.results;
  }
}

module.exports = OpenWeatherAPI;
