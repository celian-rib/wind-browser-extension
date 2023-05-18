<template>
  <div class="itemContainer">
    <div class="timeStampContainer">
      <p>{{ dayString }}</p>
      <p>{{ dateString }}</p>
      <p>{{ hourString }}h</p>
    </div>
    <div class="spacer" />
    <div class="arrowContainer">
    <wind-arrow :size="20" :windDirection="forecastData.wind.deg" />
    </div>
    <div class="windCircle" :style="getColorStyleFromWindSpeed(currentWind)">
      <p>{{ currentWind }}</p>
    </div>
    <div class="windCircle" :style="getColorStyleFromWindSpeed(currentWindGust)">
      <p>{{ currentWindGust }}</p>
    </div>
    <div class="spacer" />
    <p>{{ currentTemperature }}˙C</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { OpenWeatherAPI } from "@/api/types";
import { metersPerSecToKnotts } from "@/utils/conversion";
import { interpolateColor } from "@/utils/color";

import WindArrow from "@/components/WindArrow.vue";

export default defineComponent({
  name: "ForecastItem",
  props: {
    forecastData: {
      type: Object as () => OpenWeatherAPI.WeatherForecastItem,
      required: true,
    },
  },
  methods: {
    getColorStyleFromWindSpeed(speed: number) {
      return {
        backgroundColor: interpolateColor('#78C1EA', '#977FD9', speed, 8, 17),
      };
    }
  },
  computed: {
    dayString() {
      const date = new Date(this.forecastData.dt * 1000);
      return date.toLocaleString("en-US", { weekday: "short" });
    },
    dateString() {
      const date = new Date(this.forecastData.dt * 1000);
      return date.toLocaleString("en-US", { day: "numeric" });
    },
    hourString() {
      const date = new Date(this.forecastData.dt * 1000);
      return date.toLocaleString("en-US", { hour: "numeric", hour12: false });
    },
    currentWind() {
      return Math.round(metersPerSecToKnotts(this.forecastData.wind.speed));
    },
    currentWindGust() {
      return Math.round(metersPerSecToKnotts(this.forecastData.wind.gust));
    },
    currentTemperature() {
      return Math.round(this.forecastData.main.temp);
    },
  },
  components: {
    WindArrow,
  },
});
</script>

<style scoped>
.itemContainer {
  width: 40px;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;

  background-color: var(--color-light-grey);
  border-radius: 10px;

  margin: 0 5px;
  padding: 5px 0;
}

.spacer {
  width: 80%;
  height: 2px;
  background-color: var(--color-dark-grey);
  opacity: 0.5;
  border-radius: 2px;
  margin: 5px 0;
}

.timeStampContainer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  color: var(--color-dark-grey);
}

.timeStampContainer p {
  margin: 0;
}

.timeStampContainer p:nth-of-type(1),
.timeStampContainer p:nth-of-type(3) {
  font-size: 0.9rem;
  margin: 5px 0;
}

.windCircle {
  width: 30px;
  height: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: var(--color-primary);
  border-radius: 50%;
  color: white;
  font-size: 0.8rem;
  margin-top: 5px;
}

.windCircle:last-of-type {
  background-color: var(--color-dark-grey);
  margin-bottom: 5px;
}

.arrowContainer {
  width: 30px;
  height: 30px;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.itemContainer > p {
  margin: 5px 0;
  font-size: 0.7rem;
  color: var(--color-dark-grey);
}
</style>