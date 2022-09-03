import React, { useState, useEffect, useMemo } from "react";

// import axios
import axios from "axios";

// import icons
import {
  IoMdSunny,
  IoMdRainy,
  IoMdCloudy,
  IoMdSnow,
  IoMdThunderstorm,
  IoMdSearch,
} from "react-icons/io";

import {
  BsCloudHaze2Fill,
  BsCloudDrizzleFill,
  BsEye,
  BsWater,
  BsThermometer,
  BsWind,
} from "react-icons/bs";

import { TbTemperatureCelsius } from "react-icons/tb";
import { TCenter, TWeather, TWeatherDataDisplay } from "./types";
import { getObservation } from "./actions/observationAction";
import { useAppDispatch, useAppSelector } from "./app/hooks";

const defaultWeather = {
  relativeHumidity: 69,
  temperature: 23,
  time: { local: "2022-09-02T22:05", utc: "2022-09-03T02:05" },
  visibility: 14,
  wind: { direction: "E", speed: 19, gust: 29 },
  pressure: { value: 102, trend: 1 },
};

const Weather = ({ location, city }: TWeather) => {
  const [weather, setWeather] = useState<TWeatherDataDisplay>(defaultWeather);
  const dispatch = useAppDispatch();
  const data = useAppSelector((state: any) => state.Observation.data);

  const fetchData = (location: TCenter | undefined) => {
    dispatch(getObservation(location));
  };
  // fetch the data
  useEffect(() => {
    fetchData(location);
  }, [location]);

  const fillWeather = (data: any) => {
    const { relativeHumidity, temperature, time, visibility, wind, pressure } =
      data;
    setWeather({
      relativeHumidity: relativeHumidity,
      temperature: temperature,
      time: time,
      visibility: visibility,
      wind: wind,
      pressure: pressure,
    });
  };

  useMemo(() => fillWeather(data), [data]);

  const responseIcon = new Map([
    ["Clouds", <IoMdCloudy />],
    ["Haze", <BsCloudHaze2Fill />],
    ["Rain", <IoMdRainy className="text-[#31cafb]" />],
    ["Clear", <IoMdSunny className="text-[#ffde33]" />],
    ["Drizzle", <BsCloudDrizzleFill className="text-[#31cafb]" />],
    ["Snow", <IoMdSnow className="text-[#31cafb]" />],
    ["Thunderstorm", <IoMdThunderstorm />],
  ]);

  const returnIcon = (icon: string) => {
    return responseIcon.get(icon);
  };

  // date object
  const date = new Date();
  console.log(city);
  return (
    <div className="m-auto">
      <div className=" bg-sky-500 text-white rounded-[32px] py-12 px-6">
        <div>
          <div className="flex items-center gap-x-5">
            <div className="text-[44px] md:text-[87px]">
              {returnIcon("Rain")}
            </div>
            <div>
              <div className="text-xl md:text-2xl font-semibold">
                {city ? city : "Toronto"}
              </div>
              <div>
                {date.getUTCDate()}/{date.getUTCMonth() + 1}/
                {date.getUTCFullYear()}
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
                Visibility <span className="ml-2">20 km</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Weather;
