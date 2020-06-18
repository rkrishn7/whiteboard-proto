// Root Reducer

import rootReducer from "reducers";

// Redux

import { createStore, applyMiddleware } from "redux";

import logger from "redux-logger";

export default createStore(
    rootReducer,
    applyMiddleware(logger)
);

