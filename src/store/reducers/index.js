import { combineReducers } from "redux";
import auth from "./auth";
import orderDetails from "./orderDetails";

const rootReducer = combineReducers(
    {
        auth,
        orderDetails
    }
);
export default rootReducer;