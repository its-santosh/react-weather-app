const { gql } = require("apollo-server");

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.
  type Query {
    getWAF(input: WeatherInput): WeatherData
    getCOA(address: String): [GeometryResult]
    getAOC(input: WeatherInput): [GeometryResult]
  }

  type GeometryResult {
    formatted: String
    geometry: Geometry
    components: Components
  }

  type Components {
    _category: String
    _type: String
    continent: String
    country: String
    country_code: String
    state: String
    state_code: String
    state_district: String
    city : String
    town : String
  }

  type Geometry {
    lat: Float
    lng: Float
  }

  input WeatherInput {
    latitude: Float
    longitude: Float
    units: String
    exclude: String
  }

  type WeatherData {
    lat: Float
    lon: Float
    timezone: String
    timezone_offset: Int
    current: CurrentWeather
    daily: [DailyWeather]
  }

  type CurrentWeather {
    dt: Int
    sunrise: Int
    sunset: Int
    temp: Float
    feels_like: Float
    pressure: Int
    humidity: Int
    dew_point: Float
    uvi: Int
    clouds: Int
    visibility: Int
    wind_speed: Float
    wind_deg: Int
    wind_gust: Float
    weather: [Weather]
  }

  type Weather {
    id: Int
    main: String
    description: String
    icon: String
  }

  type DailyWeather {
    dt: Int
    sunrise: Int
    sunset: Int
    moonrise: Int
    moonset: Int
    moon_phase: Float
    pressure: Int
    humidity: Int
    dew_point: Float
    wind_speed: Float
    wind_deg: Int
    wind_gust: Float
    clouds: Int
    pop: Float
    uvi: Float
    temp: Temperature
    feels_like: FeelsLike
    weather: [Weather]
  }

  type FeelsLike {
    day: Float
    night: Float
    eve: Float
    morn: Float
  }

  type Temperature {
    day: Float
    min: Float
    max: Float
    night: Float
    eve: Float
    morn: Float
  }
`;

module.exports = typeDefs;
