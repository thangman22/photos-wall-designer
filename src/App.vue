<template>
  <div id="app">
    <div id="header">
      Photos wall Designer
    </div>
    <avaliableFramesList />
    <div
      id="canvas-container"
      :style="{backgroundColor: backgroundColor}"
    >
      <dragableFrame
        v-for="frame in frames"
        :key="frame.key"
        :frame="frame"
      />
      <menuComponent
        :frames="frames"
      />
    </div>
    <div id="footer">
      Build with 🧡 by
      <a
        href="https://twitter.com/thangman22"
      >@thangman22</a> You can fork this project at <a href="https://github.com/thangman22/photos-wall-designer">Github</a>
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
      mouseOverId: null,
      
    };
  },
  computed: {
    backgroundColor () {
      return this.$store.state.background 
    },
    frames () {
      return this.$store.state.frames
    }
  }
};
</script>

<style>
#app {
  color: #023047;
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
  #frame-summary {
    position: fixed;
    bottom: 0;
    right: 0;
    display: block !important;
  }
  #frames-select-container {
    display: none;
  }

  #canvas-container {
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
