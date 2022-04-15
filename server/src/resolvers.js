// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves books from the "books" array above.
module.exports = {
  Query: {
    getWAF: (_, { input }, { dataSources }) => {
      const data = dataSources.openWeatherAPI.getWAF(input);
      return data;
    },
    getCOA: (_, { address }, { dataSources }) => {
      const data = dataSources.openWeatherAPI.getCOA(address);
      return data;
    },
    getAOC: (_, { input }, { dataSources }) => {
      const data = dataSources.openWeatherAPI.getAOC(input);
      return data;
    },
  },
};
