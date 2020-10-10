`<template>
  <vue-draggable-resizable
    :key="frame.key"
    :w="frame.width"
    :h="frame.height"
    :y="frame.y"
    :x="frame.x"
    :resizable="false"
    @dragging="onDrag"
  >
    <div
      :id="`frame-${frame.key}`"
      class="frame"
      :style="{ width: `${frame.width}px`,height: `${frame.height}px`, backgroundImage: `url('${realImage}'), url('${frame.background}')`, backgroundPosition: `${imageX}px ${imageY}px, left top`, backgroundSize: `${imageWidth}px ${imageHeight}px, contain`, backgroundRepeat: 'no-repeat, no-repeat', textAlign: 'right', transform: frame.rorate ? 'rotate(90deg)' : 'rotate(0deg)'}"
      @mouseover="showIcon()"
      @mouseleave="hideIcon()"
    >
      <div
        class="action-icon rotate-icon"
        @click="$emit('rotateClick',`frame-${frame.key}`)"
      >
        <FormatRotate90
          v-if="mouseOverId === true"
          :width="20"
          :height="20"
        />
      </div>
      <div
        class="action-icon delete-icon"
        @click="$emit('deleteClick', `frame-${frame.key}`)"
      >
        <CloseCircleOutline
          v-if="mouseOverId === true"
          :width="20"
          :height="20"
        />
      </div>
    </div>
  </vue-draggable-resizable>
</template>

<script>
import CloseCircleOutline from "mdi-vue/CloseCircleOutline.vue";
import FormatRotate90 from "mdi-vue/FormatRotate90.vue";
export default {
  name: "DragableFrame",
  components: {
    CloseCircleOutline,
    FormatRotate90
  },
  props: {
    frame: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      mouseOverId: false,
      imageWidth: 0,
      imageHeight: 0,
      imageX: 0,
      imageY: 0,
      realImage: '',
      framePow: 3.6
    };
  },
  async mounted () {
    await this.addImge()
  },
  methods: {
    async addImge () {
    let req = await fetch(this.frame.background)
    let svgStr = await req.text();
    let parser = new DOMParser();
    let svgDom = parser.parseFromString(svgStr, "image/svg+xml");
    this.imageWidth = (svgDom.getElementById('photo-area').getAttribute('width') / 10) * this.framePow
    this.imageHeight = (svgDom.getElementById('photo-area').getAttribute('height') / 10) * this.framePow
    this.imageX = (svgDom.getElementById('photo-area').getAttribute('x') / 10) * this.framePow
    this.imageY = (svgDom.getElementById('photo-area').getAttribute('y') / 10) * this.framePow
    this.realImage = `https://via.placeholder.com/${svgDom.getElementById('photo-area').getAttribute('width')}x${svgDom.getElementById('photo-area').getAttribute('height')}`
    },
    onDrag(x, y) {
      this.$emit("drag", { id: `frame-${this.frame.key}`, x: x, y: y });
    },
    hideIcon() {
      setTimeout(() => {
        this.mouseOverId = false;
      }, 300);
    },
    showIcon() {
      this.mouseOverId = true;
    }
  }
};
</script>

<style>
.vdr {
  position: absolute;
}
.action-icon {
  display: inline-block;
  margin-top: 5px;
  margin-right: 5px;
}
.frame-img {
  margin-bottom: 5px;
}
.delete-icon {
  color: #ff867c;
}
.rotate-icon {
  color: #689f38;
}
</style>