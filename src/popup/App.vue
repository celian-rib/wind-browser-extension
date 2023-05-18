<template>
  <div class="appContainer">
    <location-input-form
      :loading="true"
      :visible="currentCityData == null"
      :onSearch="onSearch"
    />
    <weather-view
      :visible="currentCityData != null"
      :cityData="currentCityData"
      :closeView="clearSearch"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import API from "@/api";
import LocationInputForm from "@/popup/views/HomeView.vue";
import WeatherView, { CityData } from "@/popup/views/WeatherView.vue";
import { getStorage, setStorage, removeStorage } from "@/utils/storage";
import { HibouAPI } from "@/api/types";

export default defineComponent({
  name: "App",
  data() {
    return {
      currentCityData: null as null | CityData,
      loading: false,
    };
  },
  async beforeMount() {
    const lastCityData: HibouAPI.CitySearchItem | null = await getStorage("lastCityData");
    if (lastCityData == null) return;
    this.loadWeatherData(lastCityData);
    console.log("Loaded city data from storage");
  },
  methods: {
    async loadWeatherData(cityData: HibouAPI.CitySearchItem) {
      const weatherData = await API.getWeatherForecast(cityData.geolocation);

      this.currentCityData = {
        weatherForecastItems: weatherData.list,
        cityInfos: cityData,
      };

      setStorage("lastCityData", cityData);
    },
    async onSearch(city: string) {
      try {
        this.loading = true;
        const citySearchResult = await API.postCitySearch(city);
        if (citySearchResult?.items?.length < 1)
          throw new Error("No city found");

        const cityData = citySearchResult.items[0];
        if (cityData?.geolocation == null) throw new Error("No city found");

        this.loadWeatherData(cityData);
      } catch (error) {
        console.error("Search error", error);
        this.currentCityData = null;
      } finally {
        this.loading = false;
      }
    },
    clearSearch() {
      this.currentCityData = null;
      removeStorage("lastCityData");
    },
  },
  components: {
    LocationInputForm,
    WeatherView,
  },
});
</script>

<style>
:root {
  --popup-width: 400px;
  --popup-height: 600px;

  --color-primary: #7bc0f2;
  --color-dark-grey: #6a718a;
  --color-light-grey: #e2ecf9;
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

.appContainer {
  width: var(--popup-width);
  height: var(--popup-height);
  background: linear-gradient(219.79deg, #84bce4 14.88%, #3da0e8 54.94%);

  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
