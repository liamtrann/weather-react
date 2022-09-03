import axios from 'axios';

/**
 * Extract the city from geocoder results.
 * @param addressComponents The geocoder address component.
 * @returns The city as a string.
 */
const getCity = (addressComponents: { long_name: string; types: string[] }[]): string => {
  const types = ['locality', 'administrative_area_level_3', 'administrative_area_level_2'];
  const components = addressComponents.filter((component) =>
    component.types.some((type) => types.includes(type)),
  );

  if (components.length > 0) return components[0].long_name;
  return '';
};

/**
 * Convert address string to geocoded information.
 * @param address The address string.
 * @returns Geocoder information about the address' location.
 */
export const geocoder = (
  address: string,
): Promise<
  | {
      location: {
        lat: number;
        lng: number;
      };
      address: string;
      latitude: number;
      longitude: number;
      city: string;
    }
  | undefined
> => {
  return axios
    .get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
        address,
      )}&key=AIzaSyC1pRtzKYbiiDPHtVSFc6mvXQUi2nTG-O8`,
    )
    .then((res) => {
      if (res.data.status === 'OK') {
        const result = res.data.results[0];
        const location = result.geometry.location;
        const address = result.formatted_address;
        const latitude = location.lat;
        const longitude = location.lng;
        const city = getCity(result.address_components);

        return {
          location,
          address,
          latitude,
          longitude,
          city,
        };
      } else if (res.data.error_message) {
        throw new Error(res.data.error_message);
      }
    });
};
