import React, { useState } from "react";
import "./App.css";
import { geocoder } from "./google-maps.api";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { TMap, TCenter } from "./types";

function Map({ setLocation, setCity }: TMap) {
  const [geocoderError, setGeocoderError] = useState<any>(null);
  const [rawAddress, setRawAddress] = useState<string>("");
  const [center, setCenter] = useState<TCenter>({
    lat: 43.653226,
    lng: -79.3831843,
  });
  const [address, setAddress] = useState<string>("");
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyC1pRtzKYbiiDPHtVSFc6mvXQUi2nTG-O8",
  });
  const handleFindLocationClick = () => {
    if (!rawAddress) {
      setGeocoderError("Address is required to find location.");
      return;
    }
    setGeocoderError(null);
    geocoder(rawAddress)
      .then((res) => {
        if (res) {
          const { address, location } = res;
          setAddress(address);
          setCity(address);
          setLocation(location);
          setCenter(location);
        }
      })
      .catch((err) => {
        console.log(err);
        setGeocoderError(err.message);
      });
  };
  return (
    <div className="m-auto">
      <div className="w-full flex">
        <input
          type="text"
          className="block p-2 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 mr-2"
          placeholder="Search a city"
          onChange={(e) => setRawAddress(e.target.value)}
        />
        <button
          onClick={handleFindLocationClick}
          className="w-40 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white border border-blue-500 hover:border-transparent rounded"
        >
          Find City
        </button>
      </div>

      <div className="w-full h-80 mt-5">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={{ width: "100%", height: "100%" }}
            center={center}
            zoom={10}
          >
            <Marker position={center} />
          </GoogleMap>
        ) : null}
        {address && <p className="text-black-600 mt-5 font-bold">{address}</p>}
        {geocoderError && <p className="text-red-600 mt-5">{geocoderError}</p>}
      </div>
    </div>
  );
}

export default Map;
