export namespace HibouAPI {
  interface Geolocation {
    lon: number;
    lat: number;
  }

  interface Region {
    id: string;
    title: string;
    countryId: string;
  }

  interface Country {
    id: string;
    title: string;
    code: string;
    selectableForMobility: boolean;
  }

  interface CitySearchItem {
    id: string;
    title: string;
    postalcode: string;
    geolocation: Geolocation;
    region: Region;
    country: Country;
    countryId: string;
    regionId: string;
    departmentId: string;
    titleAndPostalcode: string;
  }

  interface CitySearchResponse {
    items: CitySearchItem[];
    total: number;
  }
}

export namespace OpenWeatherAPI {
  interface WeatherForecastItem {
    dt: number;
    main: {
      temp: number;
      feels_like: number;
      temp_min: number;
      temp_max: number;
      pressure: number;
      sea_level: number;
      grnd_level: number;
      humidity: number;
      temp_kf: number;
    };
    weather: {
      id: number;
      main: string;
      description: string;
      icon: string;
    }[];
    clouds: {
      all: number;
    };
    wind: {
      speed: number;
      deg: number;
      gust: number;
    };
    visibility: number;
    pop: number;
    sys: {
      pod: string;
    };
    dt_txt: string;
  }

  interface WeatherForecast {
    cod: string;
    message: number;
    cnt: number;
    list: WeatherForecastItem[];
  }
}
