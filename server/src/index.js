const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema");
const resolvers = require("./resolvers");
require("dotenv").config();

const OpenWeatherAPI = require("./data-sources/OpenWeatherAPI");

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    openWeatherAPI: new OpenWeatherAPI(),
  }),
  introspection: process.NODE_ENV === "production" ? false : true,
  playground: process.NODE_ENV === "production" ? false : true,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
