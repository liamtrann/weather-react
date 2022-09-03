export type TCenter = {
  lat: number;
  lng: number;
};
export type TMap = {
  setLocation: (e: TCenter) => void;
  setCity: (e: string) => void;
};

export type TWeather = {
  location: TCenter | undefined;
  city: string;
};

export type ObservationReponse = {
  time: {
    local: string;
    utc: string;
  };
  weatherCode: {
    value: string;
  };
  temperature: number;
  dewPoint: number;
  feelsLike: number;
  wind: {
    direction: string;
    speed: number;
    gust: number;
  };
  relativeHumidity: number;
  pressure: {
    value: number;
    trend: number;
  };
  visibility: number;
  ceiling: number;
};

export type TWeatherDataDisplay = {
  temperature: number;
  wind: {
    direction: string;
    speed: number;
    gust: number;
  };
  relativeHumidity: number;
  pressure: { value: number; trend: number };
  visibility: number;
  time: { local: string; utc: string };
};

export interface IAction {
  type: string;
  payload?: any;
}
