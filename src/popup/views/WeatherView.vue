<template>
  <div class="container" :style="sheetStyle">
    <header :style="headerStyle">
      <div class="cityInfos">
        <h1>{{ lastCityData?.cityInfos.title }}</h1>
        <p>
          <span>{{ currentWeather?.main.temp ?? -1 }}</span
          >˙C
        </p>
      </div>
      <button>X</button>
    </header>
    <waves />
    <div class="contentContainer">
      <h1>Wind</h1>
      <p>Temp:</p>
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
  </div>
</template>

<script lang="ts">
import { HibouAPI, OpenWeatherAPI } from "@/api/types";
import { metersPerSecToKnotts } from "@/utils/conversion";
import Waves from "@/components/Waves.vue";

export type CityData = {
  weatherForecastItems: OpenWeatherAPI.WeatherForecastItem[];
  cityInfos: HibouAPI.CitySearchItem;
};

export default {
  name: "WeatherView",
  data: () => ({
    textInput: "",
    lastCityData: null as null | CityData,
  }),
  props: {
    visible: {
      type: Boolean,
      required: true,
    },
    cityData: {
      type: Object as () => CityData | null,
      required: true,
    },
    closeView: {
      type: Function,
      required: true,
    },
  },
  watch: {
    cityData: {
      immediate: true,
      handler(newVal) {
        if (newVal != null) this.lastCityData = newVal;
      },
    },
  },
  computed: {
    sheetStyle() {
      return {
        transform: this.visible ? "" : "translateY(65%)",
        pointerEvents: this.visible ? "auto" : "none",
      };
    },
    headerStyle() {
      return {
        opacity: this.visible ? 1 : 0,
        transition: this.visible ? "opacity 1.5s" : "opacity 0.5s",
      };
    },
    currentWeather() {
      return this.lastCityData?.weatherForecastItems[0];
    },
    currentWindSpeed() {
      if (this.currentWeather == null) return -1;
      return metersPerSecToKnotts(this.currentWeather.wind.speed);
    },
    currentWindGust() {
      if (this.currentWeather == null) return -1;
      return metersPerSecToKnotts(this.currentWeather.wind.gust);
    },
    currentWindDirection() {
      if (this.currentWeather == null) return -1;
      return this.currentWeather.wind.deg;
    },
    nextTwoDaysForecast() {
      if (this.lastCityData == null) return [];
      return this.lastCityData.weatherForecastItems.filter((item, index) => {
        const date = new Date(item.dt * 1000);
        const hour = date.getHours();
        return index < 16 && hour >= 6 && hour <= 21;
      });
    },
  },
  methods: {},
  components: {
    Waves,
  },
};
</script>

<style scoped>
header {
  height: 20%;
  width: 100%;
  margin: 10px 30px;
  padding: 0;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  color: white;
}

header button {
  background-color: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
}

.cityInfos {
  display: flex;
  flex-direction: column;
}

.cityInfos span {
  font-weight: bold;
}

.container {
  position: absolute;
  top: 0;
  left: 0;

  transition: transform 0.5s cubic-bezier(0.53, 0.74, 0.45, 1.11);

  width: var(--popup-width);
  height: var(--popup-height);
}

.contentContainer {
  min-height: var(--popup-height);

  margin-top: -5px;
  background-color: white;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.forecastList {
  display: flex;
  align-items: center;
}
</style>