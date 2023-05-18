<template>
  <div :style="containerStyle">
    <svg
      width="38"
      height="55"
      viewBox="0 0 38 55"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M16.3925 51.9143C16.3925 53.295 17.5118 54.4143 18.8925 54.4143C20.2732 54.4143 21.3925 53.295 21.3925 51.9143H16.3925ZM20.6603 1.31008C19.684 0.333771 18.1011 0.333771 17.1248 1.31008L1.21485 17.22C0.238537 18.1963 0.238537 19.7792 1.21485 20.7555C2.19116 21.7318 3.77407 21.7318 4.75038 20.7555L18.8925 6.61338L33.0347 20.7555C34.011 21.7318 35.5939 21.7318 36.5702 20.7555C37.5465 19.7792 37.5465 18.1963 36.5702 17.22L20.6603 1.31008ZM21.3925 51.9143L21.3925 3.07785H16.3925L16.3925 51.9143H21.3925Z"
        fill="#6A718A"
      />
    </svg>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";


export default defineComponent({
  name: "WindArrow",
  props: {
    windDirection: {
      type: Number,
      required: true,
    },
  },
  computed: {
    containerStyle() {
      if (this.windDirection == null) return {};
      return {
        transform: `rotate(${this.windDirection}deg)`,
      };
    },
  },
});
</script>
