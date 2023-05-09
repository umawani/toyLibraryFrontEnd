import { combineReducers } from "redux";
import userReducer from "./userReducer";
import productReducer from "./productReducer";
import bookingHistoryReducer from "./bookingHistoryReducer";

const rootReducer = combineReducers({ userReducer, productReducer, bookingHistoryReducer });

export default rootReducer;
