import axios from "axios";
import { LOCATION_FAIL, LOCATION_LOADING, LOCATION_SUCCESS } from "./types";

export const getLocation = (address: string) => async (dispatch: any) => {
  dispatch({
    type: LOCATION_LOADING,
  });
  await axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=AIzaSyC1pRtzKYbiiDPHtVSFc6mvXQUi2nTG-O8`
    )
    .then((res) => {
      const result = res.data.results[0];
      const location = result.geometry.location;
      const address = result.formatted_address;

      dispatch({
        type: LOCATION_SUCCESS,
        payload: { location: location, address: address },
      });
    })
    .catch((err) => {
      console.log(err);
      dispatch({ type: LOCATION_FAIL });
    });
};
