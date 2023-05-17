<template>
  <location-input-form v-if="currentCityData == null" :onSearch="onSearch" />
  <p v-else>{{ currentCityData?.cityInfos.title ?? "loading..." }}</p>
</template>

<script>
import LocationInputForm from "@/components/LocationInputForm.vue";
import API from "@/api";

export default {
  name: "App",
  data: () => ({
    currentCityData: null,
  }),
  methods: {
    async onSearch(city) {
      try {
        const citySearchResult = await API.postCitySearch(city);
        if (citySearchResult?.items?.length < 1) throw new Error("No city found");
  
        const cityData = citySearchResult.items[0];
        const { lat, lon } = cityData.geolocation;
        if (!lat || !lon) throw new Error("No city found");
  
        const weatherData = await API.getWeatherForecast(lat, lon);
        this.currentCityData = {
          weatherForecast: weatherData.list,
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
