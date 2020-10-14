<template>
  <div id="frames-select-container">
    <div
      v-for="frame in availableFrames"
      :key="frame.url"
      class="frame-select-list"
    >
      <div
        v-if="frame.type === 'frame'"
        @click="frameClick(frame)"
      >
        <img
          :src="frame.url"
          :style="{
            verticalAlign: 'middle',
            maxWidth: '50px',
            maxHeight: '50px',
          }"
          class="frame-img"
        >
        <br>
        {{ frame.url.replace(".svg", "").replace("/images/frames/", "") }}
      </div>
      <div
        v-if="frame.type === 'section-divider'"
        class="divider"
      >
        {{ frame.text }}
      </div>
    </div>
  </div>
</template>

<script>
import availableFrames from "@/config/frames.json";

export default {
  name: "AvaliableFramesList",
  props: {
    frameDetail: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      availableFrames: availableFrames,
    };
  },
  methods: {
    frameClick(frameDetail) {
      this.$emit("frameClick", frameDetail);
    },
  },
};
</script>
<style>
#frames-select-container {
  z-index: 99999;
  background: #fff;
  scroll-snap-type: x mandatory;
  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  align-items: center;
  font-size: 10px;
  grid-row-start: 2;
}
.divider{
  font-size: 18px;
  text-align: center;
  font-weight: bold;
}
.frame-select-list {
  scroll-snap-align: start;
  margin: 10px;
  position: relative;
  min-width: 5%;
  min-height: 95%;
  padding-top: 20px;
  text-align: center;
}
</style>

<style>
</style>