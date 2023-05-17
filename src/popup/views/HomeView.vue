<template>
  <div class="container" :style="sheetStyle">
    <div>
      <img src="@/assets/logo.png" />
      <h1>Ventibou</h1>
    </div>
    <div class="inputContainer">
      <input type="text" placeholder="Search city ..." v-model="textInput" />
      <button @click="onClickSearch">
        Search
      </button>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: "HomeView",
  data: () => ({
    textInput: "",
  }),
  props: {
    onSearch: {
      type: Function,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
    loading: {
      type: Boolean,
      required: true,
    },
  },
  computed: {
    sheetStyle() {
      return {
        transform: this.visible ? "" : "scale(0.5)",
        opacity: this.visible ? 1 : 0,
      };
    },
  },
  methods: {
    onClickSearch() {
      if (!this.textInput) return;
      this.onSearch(this.textInput);
    },
  },
};
</script>

<style scoped>
.container {
  transition: 0.5s;

  position: absolute;
  top: 0;
  left: 0;

  width: var(--popup-width);
  height: calc(var(--popup-height) - 10%);

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

img {
  width: 90;
  height: 90px;
}

h1 {
  color: white;
}

.inputContainer {
  margin-top: 30px;
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

input[type="text"] {
  width: 70%;
  padding: 12px 20px;
  margin: 8px 0;

  background-color: rgba(255, 255, 255, 0.3);
  outline: none;
  border: none;
  border-radius: 15px;

  font-size: 0.9rem;
  color: white;
}

input[type="text"]::placeholder {
  color: var(--color-light-grey);
}

button {
  padding: 12px 20px;
  margin: 8px 0;

  background-color: rgba(255, 255, 255, 0.3);
  border: none;
  border-radius: 15px;

  font-size: 0.9rem;
  font-weight: bold;
  color: white;

  display: flex;
  align-items: center;
  justify-content: center;
}

button:hover {
  cursor: pointer;
}
</style>