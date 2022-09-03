import React, { useState, useEffect, useMemo } from "react";

import {
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";

import { TbTemperatureCelsius } from "react-icons/tb";
import { TWeatherDataDisplay } from "../types/types";
import { getObservation } from "../actions/observationAction";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { defaultWeather } from "../config/defaultValue";
import { returnIcon } from "../icons";

const Weather = () => {
  const [weather, setWeather] = useState<TWeatherDataDisplay>(defaultWeather);
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: any) => state.Observation.data);
  const locationData = useAppSelector((state: any) => state.Location);

  // fetch the data
  useEffect(() => {
    if (locationData.loading || locationData.errorMsg) return;
    dispatch(getObservation(locationData.geoLocation.location));
    console.log(locationData)
    console.log(data)

  }, [locationData]);

  const fillWeather = (data: any) => {
    if (!data) return
    const { relativeHumidity, temperature, time, visibility, wind, pressure } =
      data;
    setWeather({
      relativeHumidity: relativeHumidity,
      temperature: temperature,
      time: new Date(time.utc),
      visibility: visibility,
      wind: wind,
      pressure: pressure,
    });
  };

  useMemo(() => fillWeather(data), [data]);

  return (
    <div className="m-auto">
      <div className=" bg-sky-500 text-white rounded-[32px] py-12 px-6">
        <div>
          <div className="flex items-center gap-x-5">
            <div className="text-[44px] md:text-[87px]">
              {returnIcon(weather.temperature)}
            </div>
            <div>
              <div className="text-xl md:text-2xl font-semibold w-40">
                {locationData.geoLocation.address ?? "Toronto"}
              </div>
              <div>
                {weather.time.getUTCDate()}/{weather.time.getUTCMonth() + 1}/
                {weather.time.getUTCFullYear()}
              </div>
            </div>
          </div>
          <div className="my-20">
            <div className="flex justify-center items-center">
              <div className="text-[72px] md:[text-[144px] leading-none font-light">
                {weather.temperature}
              </div>
              <div className="text-2xl md:text-4xl">
                <TbTemperatureCelsius />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-x-2">
              <div className="text-[20px]">
                <BsEye />
              </div>
              <div>
                Visibility <span className="ml-2">{weather.visibility} km</span>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="text-[20px]">
                <BsWind />
              </div>
              <div>
                Wind <span className="ml-2">{weather.wind.speed} m/s</span>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="text-[20px]">
                <BsWater />
              </div>
              <div>
                Humidity <span className="ml-2">{weather.relativeHumidity}</span>
              </div>
            </div>
            <div className="flex items-center gap-x-2">
              <div className="text-[20px]">
                <BsThermometer />
              </div>
              <div>
                Pressure <span className="ml-2">{weather.pressure.value}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
