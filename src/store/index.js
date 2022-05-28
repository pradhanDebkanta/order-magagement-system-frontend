import { compose, applyMiddleware, createStore } from "redux";
import thunk  from "redux-thunk";
import rootReducer from "./reducers";

const middleWires = [thunk];
const configureStore = (preloadedState) => {
    // basic setup

    // const store = createStore(
    //     rootReducer,
    //     compose(
    //         applyMiddleware(...middleWires),
    //         typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    //     )
    // );

    // advance setup
    const composeEnhancers = typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
        window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        }) : compose;
    const enhancer = composeEnhancers(
        applyMiddleware(...middleWires),
    );
    const store = createStore(rootReducer, preloadedState, enhancer);
    return store;
}

const store = configureStore();

export default store;