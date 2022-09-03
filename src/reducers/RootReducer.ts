import { combineReducers } from "redux";
import ObservationReducer from "./ObservationReducer";

const RootReducer = combineReducers({
  Observation: ObservationReducer,
});

export default RootReducer;
