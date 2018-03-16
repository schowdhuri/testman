import { createStore, applyMiddleware, compose } from "redux";

export default function configureStore(reducer, sagaMiddleware) {
    const store = createStore(reducer, {}, compose(
          applyMiddleware(sagaMiddleware),
          window.devToolsExtension ? window.devToolsExtension() : f => f
    ));
    return store;
}
