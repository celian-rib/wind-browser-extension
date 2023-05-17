<template>
  <location-input-form v-if="currentCityData == null" :onSearch="onSearch" />
  <p v-else>{{ currentCityData?.cityInfos.title ?? "loading..." }}</p>
</template>

<script lang="ts">
import LocationInputForm from "@/components/LocationInputForm.vue";
import API from "@/api";
import { HibouAPI, OpenWeatherAPI } from '@/api/api';

type CityData = {
  weatherForecastItems: OpenWeatherAPI.WeatherForecastItem[];
  cityInfos: HibouAPI.CitySearchItem;
};

export default {
  name: "App",
  data: () => ({
    currentCityData: null as null | CityData,
  }),
  methods: {
    async onSearch(city: string) {
      try {
        const citySearchResult = await API.postCitySearch(city);
        if (citySearchResult?.items?.length < 1) throw new Error("No city found");
  
        const cityData = citySearchResult.items[0];
        if (cityData?.geolocation == null) throw new Error("No city found");
  
        const weatherData = await API.getWeatherForecast(cityData.geolocation);
        this.currentCityData = {
          weatherForecastItems: weatherData.list,
          cityInfos: cityData
        };
      } catch (error) {
        console.error('Search error', error);
        this.currentCityData = null;
      }
    },
  },
  components: {
    LocationInputForm,
  },
};
</script>

<style>
:root {
  --popup-width: 400px;
  --popup-height: 500px;
}

html {
  width: var(--popup-width);
  height: var(--popup-height);
}

body {
  width: var(--popup-width);
  height: var(--popup-height);
  margin: 0;
  padding: 0;
  border: 0;
  font-family: sans-serif;
}
</style>
