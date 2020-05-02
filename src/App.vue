<template>
  <div id="app">
    <div id="header">
      IKEA Photo Frames Designer
    </div>
    <avaliableFramesList @frameClick="addFrame" />
    <div id="canvas-container">
      <dragableFrame
        v-for="frame in frames"
        :key="frame.key"
        :frame="frame"
        @rotateClick="rotateFrame"
        @deleteClick="deleteFrame"
        @drag="setFramePostion"
      />
      <menuComponent
        :frames="frames"
        @deleteClick="clearFrames"
      />
    </div>
    <div id="footer">
      Build with 🧡 by @thangman22
    </div>
  </div>
</template>

<script>
import avaliableFramesList from "@/components/avaliableFramesList";
import dragableFrame from "@/components/dragableFrame";
import menuComponent from "@/components/menuComponent";

export default {
  name: "App",
  components: {
    menuComponent,
    avaliableFramesList,
    dragableFrame
  },
  data() {
    return {
      frames: {},
      mouseOverId: null,
      framePow: 3.6
    };
  },
  watch: {
    frames: {
      deep: true,
      handler() {
        localStorage["frames-designer:frames"] = JSON.stringify(this.frames);
      }
    }
  },
  mounted() {
    this.frames = JSON.parse(localStorage["frames-designer:frames"]);
  },
  methods: {
    clearFrames() {
      this.frames = {};
    },
    addFrame(frameDetail) {
      let id = Date.now();
      const canvasElement = document.getElementById("canvas-container");
      let frameObject = {
        key: id,
        width: frameDetail.width * this.framePow,
        height: frameDetail.height * this.framePow,
        background: frameDetail.url,
        rorate: false,
        x: Math.round(canvasElement.offsetWidth / 2),
        y: Math.round(canvasElement.offsetHeight / 2)
      };

      this.$set(this.frames, `frame-${id}`, frameObject);
    },
    rotateFrame(id) {
      this.frames[id].rorate = !this.frames[id].rorate;
    },
    deleteFrame(id) {
      this.$delete(this.frames, id);
    },
    setFramePostion({ id, x, y }) {
      this.frames[id].x = x;
      this.frames[id].y = y;
    },
    setPosition(y, x) {
      console.log(y, x);
    }
  }
};
</script>

<style>
#app {
  color: #263238;
  display: grid;
  height: 97vh;
  grid-template-rows: 45px 130px auto 10px;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-print-color-adjust: exact !important;
}
#header {
  font-weight: bold;
  font-size: 24px;
  padding-left: 10px;
  border-bottom: 1px solid Gainsboro;
}

#canvas-container {
  overflow: hidden;
  grid-row-start: 3;
  background: url("/images/grid.svg");
}

#footer {
  font-weight: bold;
  padding-top: 10px;
  font-size: 9px;
}

@media print {
  .menu-button {
    display: none !important;
  }
  #frame-summary{
    position: fixed;
    bottom: 0;
    right: 0;
    display: block !important;
  }
  #frames-select-container{
    display: none;
  }
    
  #canvas-container{
    grid-row-start: 2;
  }

  #app {
    grid-template-rows: 45px auto;
  }
  #footer {
    display: none;
  }
}
</style>
