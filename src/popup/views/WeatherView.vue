<template>
  <div class="container" :style="sheetStyle">
    <header :style="headerStyle">
      <div class="cityInfos">
        <h1>{{ lastCityData?.cityInfos.title }}</h1>
        <div class="weatherInfos">
          <p>
            <span>{{ currentTemp }}</span
            >˙C
          </p>
          <img :src="currentWeatherImage" />
        </div>
      </div>
      <button @click="closeView">
        <close-button />
      </button>
    </header>
    <waves />
    <div class="contentContainer">
      <div class="windArrowContainer">
        <wind-arrow :windDirection="currentWindDirection" />
        <p>{{ currentWindDirection }}˙</p>
      </div>
      <div class="currentWindContainer">
        <h2>{{ currentWindSpeed }} <span>Knots</span></h2>
      </div>
      <!-- <h1>Wind</h1>
      <p>Temp:</p>
      <p>Wind: {{ currentWindSpeed }}</p>
      <p>Gust: {{ currentWindGust }}</p>
      <button @click="closeView">Clear</button>

      <div class="forecastList">
        <div v-for="item in nextTwoDaysForecast" :key="item.dt_txt">
          <p>{{ item.dt_txt }}</p>
          <p>{{ item.main.temp }}C</p>
          <p>{{ item.wind.speed }}</p>
          <p>{{ item.wind.gust }}</p>
          <p>{{ item.wind.deg }}</p>
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { HibouAPI, OpenWeatherAPI } from "@/api/types";
import { metersPerSecToKnotts } from "@/utils/conversion";

import Waves from "@/components/Waves.vue";
import CloseButton from "@/components/CloseButton.vue";
import WindArrow from "@/components/WindArrow.vue";

export type CityData = {
  weatherForecastItems: OpenWeatherAPI.WeatherForecastItem[];
  cityInfos: HibouAPI.CitySearchItem;
};

export default defineComponent({
  name: "WeatherView",
  data() {
    return {
      lastCityData: null as null | CityData,
    };
  },
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
        transform: this.visible ? "" : "scale(0.5)",
        transition: this.visible ? "0.8s" : "0.5s",
      };
    },
    currentWeather() {
      return this.lastCityData?.weatherForecastItems[0];
    },
    currentTemp() {
      if (this.currentWeather == null) return -1;
      return Math.round(this.currentWeather.main.temp);
    },
    currentWindSpeed() {
      if (this.currentWeather == null) return -1;
      return Math.round(metersPerSecToKnotts(this.currentWeather.wind.speed));
    },
    currentWindGust() {
      if (this.currentWeather == null) return -1;
      return metersPerSecToKnotts(this.currentWeather.wind.gust);
    },
    currentWindDirection() {
      if (this.currentWeather == null) return -1;
      return Math.round(this.currentWeather.wind.deg);
    },
    currentWeatherImage() {
      if (this.currentWeather == null) return "";
      const icon = this.currentWeather.weather[0].icon;
      return `https://openweathermap.org/img/wn/${icon}@2x.png`;
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
    CloseButton,
    WindArrow,
  },
});
</script>

<style scoped>
header {
  height: 10%;
  margin: 0px;
  padding: 30px;

  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  color: white;
}

header button {
  background-color: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
}

header button:hover {
  cursor: pointer;
}

.cityInfos {
  display: flex;
  flex-direction: column;
}

.cityInfos h1 {
  margin: 0;
  font-size: 1.8rem;
}

.cityInfos p {
  margin: 10px 0;
  font-size: 1rem;
}

.cityInfos span {
  font-weight: bold;
}

.weatherInfos {
  display: flex;
  flex-direction: row;
  align-items: center;
}

.weatherInfos img {
  width: 45px;
  height: 45px;
  margin-left: 10px;
}

.container {
  position: absolute;
  top: 0;
  left: 0;

  transition: transform 0.5s cubic-bezier(0.17, 0.67, 0.36, 1.04);

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

.windArrowContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: var(--color-dark-grey);
}

.windArrowContainer p {
  font-weight: bold;
  font-size: 1rem;
}

.currentWindContainer {
  color: var(--color-dark-grey);
  font-size: 1.5rem;
}

.currentWindContainer span {
  font-size: 0.9rem;
  font-weight: 600;
}

.forecastList {
  display: flex;
  align-items: center;
}
</style>