import React, { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

//import * as serviceWorker from './serviceWorker';
import history from "./utils/history";
import App from "./components/App";

import "./css/index.css";

const apolloClient = new ApolloClient({
  uri: "/api/graphql"
});

const render = (Component: FunctionComponent) =>
  ReactDOM.render(
    <ApolloProvider client={apolloClient}>
      <Component />
    </ApolloProvider>,
    document.getElementById("root")
  );

render(App);

// if (module.hot) {
//   module.hot.accept('./routes', () => {
//     const NextApp = require('./routes').default;
//     render(NextApp);
//   });
// }

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.unregister();
