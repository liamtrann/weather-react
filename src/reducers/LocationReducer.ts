import {
    LOCATION_FAIL,
    LOCATION_LOADING,
    LOCATION_SUCCESS,
  } from "../actions/types";
  import { IAction, LocationResponse } from "../types/types";
  
  const initialState = {
    geoLocation: {},
    loading: false,
  };
  
  interface IState {
    geoLocation: LocationResponse | {};
  }
  
  const LocationReducer = (state: IState = initialState, action: IAction) => {
    switch (action.type) {
      case LOCATION_LOADING:
        return {
          ...state,
          loading: true,
          errorMsg: "",
        };
      case LOCATION_FAIL:
        return {
          ...state,
          loading: false,
          errorMsg: "unable to get LOCATION",
        };
      case LOCATION_SUCCESS:
        return {
          ...state,
          loading: false,
          geoLocation: action.payload,
          errorMsg: "",
        };
      default:
        return state;
    }
  };
  
  export default LocationReducer;
  