<template>
  <div class="container">
    <h1>Wind</h1>
    <p>{{ cityData.cityInfos.title }}</p>
    <p>Temp: {{ currentWeather.main.temp }}C</p>
    <p>Wind: {{ currentWindSpeed }}</p>
    <p>Gust: {{ currentWindGust }}</p>
    <p>Wind dir: {{ currentWindDirection }}</p>
    <button @click="closeView">Clear</button>

    <div class="forecastList">
      <div v-for="item in nextTwoDaysForecast" :key="item.dt_txt">
        <p>{{ item.dt_txt }}</p>
        <p>{{ item.main.temp }}C</p>
        <p>{{ item.wind.speed }}</p>
        <p>{{ item.wind.gust }}</p>
        <p>{{ item.wind.deg }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { HibouAPI, OpenWeatherAPI } from "@/api/types";
import { metersPerSecToKnotts } from "@/utils/conversion";

export type CityData = {
  weatherForecastItems: OpenWeatherAPI.WeatherForecastItem[];
  cityInfos: HibouAPI.CitySearchItem;
};

export default {
  name: "WeatherView",
  data: () => ({
    textInput: "",
  }),
  props: {
    cityData: {
      type: Object as () => CityData,
      required: true,
    },
    closeView: {
      type: Function,
      required: true,
    },
  },
  computed: {
    currentWeather() {
      return this.cityData.weatherForecastItems[0];
    },
    currentWindSpeed() {
      return metersPerSecToKnotts(this.currentWeather.wind.speed);
    },
    currentWindGust() {
      return metersPerSecToKnotts(this.currentWeather.wind.gust);
    },
    currentWindDirection() {
      return this.currentWeather.wind.deg;
    },
    nextTwoDaysForecast() {
      return this.cityData.weatherForecastItems.filter((item, index) => {
        const date = new Date(item.dt * 1000);
        const hour = date.getHours();
        return index < 16 && hour >= 6 && hour <= 21;
      });
    },
  },
  methods: {},
};
</script>

<style scoped>
.container {
  width: var(--popup-width);
  height: var(--popup-height);

  display: flex;
  flex-direction: column;
  align-items: center;
}

.forecastList {
  display: flex;
  align-items: center;
}
</style>