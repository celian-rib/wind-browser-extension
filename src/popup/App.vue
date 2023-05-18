<template>
  <div class="appContainer">
    <home-view
      :loading="true"
      :visible="currentCityData == null"
      :onSearch="onSearch"
    />
    <weather-view
      :visible="currentCityData != null"
      :cityData="currentCityData"
      :closeView="clearSearch"
    />
    <div v-if="error != null" class="errorContainer">
      <p>{{ error }}</p>
    </div>
  </div>
</template>

<script lang="ts">
import API from "@/api";
import { defineComponent } from "vue";
import HomeView from "@/popup/views/HomeView.vue";
import WeatherView, { CityData } from "@/popup/views/WeatherView.vue";
import { getStorage, setStorage, removeStorage } from "@/utils/storage";
import { HibouAPI } from "@/api/types";

export default defineComponent({
  name: "App",
  data() {
    return {
      currentCityData: null as null | CityData,
      loading: false,
      error: null as null | string,
    };
  },
  async beforeMount() {
    const lastCityData: HibouAPI.CitySearchItem | null = await getStorage(
      "lastCityData"
    );
    if (lastCityData == null) return;
    await this.loadWeatherData(lastCityData);
  },
  methods: {
    async loadWeatherData(cityData: HibouAPI.CitySearchItem) {
      try {
        const weatherData = await API.getWeatherForecast(cityData.geolocation);

        this.currentCityData = {
          weatherForecastItems: weatherData.list,
          cityInfos: cityData,
        };

        setStorage("lastCityData", cityData);
      } catch (error) {
        console.error("Weather data error", error);
        this.currentCityData = null;
        this.error = "Error while loading weather data";
      }
    },
    async onSearch(city: string) {
      try {
        this.error = null;
        this.loading = true;
        const citySearchResult = await API.postCitySearch(city);
        if (citySearchResult?.items?.length < 1) {
          this.error = `No city found for ${city}`;
          return;
        }

        const cityData = citySearchResult.items[0];
        if (cityData?.geolocation == null) throw new Error("Missing geolocation");

        this.loadWeatherData(cityData);
      } catch (error) {
        this.currentCityData = null;
        this.error = "Error while loading city data";
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
    HomeView,
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

.errorContainer {
  width: 90%;
  position: absolute;
  bottom: 10px;
  padding: 15px;
  background-color: #ff4d4d;
  border-radius: 15px;
  color: white;
}

.errorContainer p {
  margin: 0;
  font-size: 0.9rem;
}
</style>
