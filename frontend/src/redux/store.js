import {applyMiddleware, compose, createStore} from "redux";
import rootReducer from "./reducers";
import thunk from "redux-thunk";
import {ENVIRONMENT, LOCAL} from "../utils/environment";

const DEBUG_REDUX = ENVIRONMENT === LOCAL;

let store;
if (! DEBUG_REDUX) {
    store = createStore(rootReducer, applyMiddleware(thunk));
} else {
    const composeEnhancers =
        typeof window === 'object' &&
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
            window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
                // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
            }) : compose;

    const enhancer = composeEnhancers(
        applyMiddleware(thunk),
        // other store enhancers if any
    );
    store = createStore(rootReducer, enhancer);
}

export default store;