import { applyMiddleware, compose, legacy_createStore as createStore } from "redux";

import reducers from '../reducers';
import authMiddleware from "../middlewares/authMiddleware";

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;

const enhancers = composeEnhancers(
  applyMiddleware(
    authMiddleware,
  ),
);

const store = createStore(reducers, enhancers);

export default store;