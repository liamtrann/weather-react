import axios from "axios";
import { addSyntheticLeadingComment } from "typescript";
import { TCenter } from "../types";
import {
  OBSERVATION_FAIL,
  OBSERVATION_LOADING,
  OBSERVATION_SUCCESS,
} from "./types";

export const getObservation =
  (location: TCenter | undefined) => async (dispatch: any) => {
    if (!location)
      location = {
        lat: 43.653226,
        lng: -79.3831843,
      };
    dispatch({
      type: OBSERVATION_LOADING,
    });
    await axios
      .get(
        `https://weatherapi.pelmorex.com/v1/observation?lat=${location?.lat}&long=${location?.lng}`
      )
      .then((res) =>
        dispatch({
          type: OBSERVATION_SUCCESS,
          payload: res.data,
        })
      )
      .catch((err) => {
        console.log(err);
        dispatch({ type: OBSERVATION_FAIL });
      });
  };
