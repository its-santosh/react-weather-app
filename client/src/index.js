import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import { Provider } from "react-redux";
import store from "../src/store/index";
import ReactDOM from "react-dom";
import client from "./graphql/index";
import Weather from "./routes/Weather";
import "./style/main.css";

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Switch>
          <Route exact={true} path="/" component={Weather} />
        </Switch>
      </Provider>
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
