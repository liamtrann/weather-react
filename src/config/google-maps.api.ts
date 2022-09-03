import axios from "axios";
import { LocationResponse } from "../types/types";

export const geocoder = (
  address: string
): Promise<
  | LocationResponse
  | undefined
> => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address
      )}&key=AIzaSyC1pRtzKYbiiDPHtVSFc6mvXQUi2nTG-O8`
    )
    .then((res) => {
      if (res.data.status === "OK") {
        const result = res.data.results[0];
        const location = result.geometry.location;
        const address = result.formatted_address;

        return {
          location,
          address,
        };
      } else if (res.data.error_message) {
        throw new Error(res.data.error_message);
      }
    });
};
