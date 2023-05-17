<template>
  <div class="container">
    <h1>Wind</h1>
    <input type="text" placeholder="city ..." v-model="textInput" />
    <button @click="onClickSearch">Search</button>
  </div>
</template>

<script>
export default {
  name: "LocationInputForm",
  data: () => ({
    textInput: "",
  }),
  props: {
    onSearch: {
      type: Function,
      required: true,
    },
  },
  methods: {
    onClickSearch() {
      console.log("onClickSearch", this.textInput);
      if (!this.textInput) return;
      this.onSearch(this.textInput);
    },
  }
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
</style>