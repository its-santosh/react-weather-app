import { gql } from "@apollo/client";

export const GET_WAF = gql`
  query getWAF($input: WeatherInput) {
    getWAF(input: $input) {
      lat
      lon
      timezone
      timezone_offset
      current {
        dt
        sunrise
        sunset
        temp
        feels_like
        pressure
        humidity
        dew_point
        uvi
        clouds
        visibility
        wind_speed
        wind_deg
        wind_gust
        weather {
          id
          main
          description
          icon
        }
      }
      daily {
        dt
        sunrise
        sunset
        moonrise
        moonset
        moon_phase
        pressure
        humidity
        dew_point
        wind_speed
        wind_deg
        wind_gust
        clouds
        pop
        uvi
        temp {
          day
          min
          max
          night
          eve
          morn
        }
        feels_like {
          day
          night
          eve
          morn
        }
        weather {
          id
          main
          description
          icon
        }
      }
    }
  }
`;

export const GET_AOC = gql`
  query getAOC($input: WeatherInput) {
    getAOC(input: $input) {
      formatted
      geometry {
        lat
        lng
      }
      components {
        _category
        _type
        continent
        country
        country_code
        state
        state_code
        state_district
      }
    }
  }
`;

export const GET_COA = gql`
  query getCOA($address: String) {
    getCOA(address: $address) {
      formatted
      geometry {
        lat
        lng
      }
      components {
        _category
        _type
        continent
        country
        country_code
        state
        state_code
        state_district
        city
        town
      }
    }
  }
`;
