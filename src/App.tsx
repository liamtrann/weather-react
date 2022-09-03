import React, { useState } from "react";
import "./App.css";
import Weather from "./components/Weather";
import Map from "./components/Map";

function App() {

  return (
    <h1 className="grid md:grid-cols-2 h-screen gap-4 mt-5">
      <Map />
      <Weather />
    </h1>
  );
}

export default App;
