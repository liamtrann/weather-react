import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import Map from "./Map";
import Weather from "./Weather";
import { TCenter } from "./types";

function App() {
  const [location, setLocation] = useState<TCenter>();
  const [city, setCity] = useState<string>("");
  const handleLocation = (place: TCenter) => {
    setLocation(place);
  };
  const handleCity = (place: string) => {
    setCity(place);
  };
  return (
    <h1 className="grid md:grid-cols-2 h-screen gap-4">
      <Map setLocation={handleLocation} setCity={handleCity}/>
      <Weather location={location} city={city}/>
    </h1>
  );
}

export default App;
