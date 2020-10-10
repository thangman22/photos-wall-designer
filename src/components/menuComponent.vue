<template>
  <div id="info-container">
    <div
      id="info-button"
      class="menu-button"
      @click="toggleSummary"
    >
      <InformationOutline
        :width="30"
        :height="30"
      />
    </div>
    <div
      id="delete-button"
      class="menu-button"
      @click="$emit('deleteClick')"
    >
      <CloseCircleOutline
        :width="30"
        :height="30"
      />
    </div>
    <div
      id="print-button"
      class="menu-button"
      @click="openPrintDialog"
    >
      <Printer
        :width="30"
        :height="30"
      />
    </div>

    <div
      v-show="showSummary"
      id="frame-summary"
    >
      <h3>Frames list</h3>
      <ul>
        <li
          v-for="(amount ,frame) in summaryFrame"
          :key="frame"
        >
          {{ frame }} x
          <strong>{{ amount }}</strong>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import CloseCircleOutline from "mdi-vue/CloseCircleOutline.vue";
import InformationOutline from "mdi-vue/InformationOutline.vue";
import Printer from "mdi-vue/Printer.vue";

export default {
  name: "MenuComponent",
  components: { InformationOutline, CloseCircleOutline, Printer },
  props: {
    frames: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showSummary: false
    };
  },
  computed: {
    summaryFrame() {
      let frames = this.frames;
      let summary = {};
      for (let frame of Object.values(frames)) {
        let model = frame.background
          .replace("/images/frames/", "")
          .replace("with Mount", "")
          .replace(".svg", "")
          .replace("no Mount", "");
        summary[model] = !summary[model] ? 1 : summary[model] + 1;
      }
      return summary;
    }
  },
  methods: {
    openPrintDialog() {
      window.print();
    },
    toggleSummary() {
      this.showSummary = !this.showSummary;
    }
  }
};
</script>

<style>
#info-container {
  width: 200px;
  padding: 10px 10px 0 0;
  position: absolute;
  right: 0;
  text-align: right;
}

#frame-summary {
  padding: 10px;
  background: #fff;
  border: #263238 1px solid;
}

#frame-summary > h3 {
  margin-top: 5px;
  margin-bottom: 5px;
}

#frame-summary > ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
#frame-summary > ul > li {
  font-size: 12px;
  padding: 5px;
}

#info-button {
  display: inline-block;
  width: 35px;
  height: 35px;
  background: #fff;
}
#delete-button {
  color: #ff867c;
}
</style>