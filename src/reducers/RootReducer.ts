import { combineReducers } from "redux";
import LocationReducer from "./LocationReducer";
import ObservationReducer from "./ObservationReducer";

const RootReducer = combineReducers({
  Observation: ObservationReducer,
  Location: LocationReducer,
});

export default RootReducer;
