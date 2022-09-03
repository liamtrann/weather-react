import {
  OBSERVATION_FAIL,
  OBSERVATION_LOADING,
  OBSERVATION_SUCCESS,
} from "../actions/types";
import { IAction, ObservationReponse } from "../types/types";

const initialState = {
  observation: {},
  loading: false,
};

interface IState {
  observation: ObservationReponse | {};
}

const ObservationReducer = (state: IState = initialState, action: IAction) => {
  switch (action.type) {
    case OBSERVATION_LOADING:
      return {
        ...state,
        loading: true,
        errorMsg: "",
      };
    case OBSERVATION_FAIL:
      return {
        ...state,
        loading: false,
        errorMsg: "unable to get observation",
      };
    case OBSERVATION_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        errorMsg: "",
      };
    default:
      return state;
  }
};

export default ObservationReducer;
