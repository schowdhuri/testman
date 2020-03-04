import React, { FunctionComponent } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import createMiddleware from "redux-saga";
import { routerMiddleware } from "connected-react-router";

// import * as serviceWorker from './serviceWorker';
import configureStore from "./store"; // eslint-disable-line import/default
import history from "./utils/history";
import createRootReducer from "./reducers";
import sagas from "./sagas";
import App from "./components/App";

import "./css/index.css";

const sagaMiddleware = createMiddleware();
const rootReducer = createRootReducer(history);
const store = configureStore(rootReducer, [
  sagaMiddleware,
  routerMiddleware(history)
]);
sagaMiddleware.run(sagas);

const render = (Component: FunctionComponent) =>
  ReactDOM.render(
    <Provider store={store}>
      <Component />
    </Provider>,
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
