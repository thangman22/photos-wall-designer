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
      id="print-button"
      class="menu-button"
      @click="toggleSetting"
    >
      <Cog
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
      id="delete-button"
      class="menu-button"
      @click="clearFrames"
    >
      <CloseCircleOutline
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
    <div
      v-show="showSetting"
      id="frame-setting"
    >
      <h3>Setting</h3><br>
      <div class="input-form">
        <label for="margin">Margin </label><input
          v-model="margin"
          type="number"
          name="margin"
          min="1"
          max="30"
        > cm
      </div>
      <div class="input-form">
        <label for="bg">Background </label><input
          v-model="background"
          type="color"
          name="bg"
        >
      </div>
      <div class="input-form">
        <input
          id="checkbox"
          v-model="spacingGuide"
          type="checkbox"
        ><label for="bg">Spacing guide </label>
      </div>
    </div>
  </div>
</template>

<script>
import CloseCircleOutline from "mdi-vue/CloseCircleOutline.vue";
import InformationOutline from "mdi-vue/InformationOutline.vue";
import Printer from "mdi-vue/Printer.vue";
import Cog from "mdi-vue/Cog.vue";

export default {
  name: "MenuComponent",
  components: { InformationOutline, CloseCircleOutline, Printer, Cog },
  props: {
    frames: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      showSummary: false,
      showSetting: false
    };
  },
  computed: {
    margin: {
      get () {
        return this.$store.state.margin
      },
      set (value) {
        this.$store.commit('changeMargin', value)
      }
    },
    background: {
      get () {
        return this.$store.state.background
      },
      set (value) {
        this.$store.commit('changeBackground', value)
      }
    },
    spacingGuide: {
      get () {
        return this.$store.state.spacingGuide
      },
      set (value) {
        this.$store.commit('changeSpacingGuide', value)
      }
    },
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
    clearFrames () {
      this.$store.commit('clearFrame')
    },
    openPrintDialog() {
      window.print();
    },
    toggleSetting () {
      this.showSetting = !this.showSetting;
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

#frame-summary, #frame-setting {
  padding: 10px;
  background: #fff;
  border: #023047 1px solid;
}

#frame-setting > h3, #frame-summary > h3 {
  margin-top: 5px;
  margin-bottom: 5px;
}

#frame-setting > h3, #frame-summary > ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
#frame-setting > ul > li, #frame-summary > ul > li {
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
  color: #f94144;
}
.menu-button{
  margin-bottom: 5px;
}
.input-form{
  margin-bottom: 10px;
}
input[type="color"] {
  border: 0 !important;
  background: none !important;
  height: 25px;
  vertical-align: text-bottom;
}
</style>