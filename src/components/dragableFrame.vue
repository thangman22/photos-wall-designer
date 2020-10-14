`<template>
  <vue-draggable-resizable
    :key="frame.key"
    :w="frame.width"
    :h="frame.height"
    :y="frame.y"
    :x="frame.x"
    :style="{padding: `${padding}px`, border: spacingStyle}"
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
        @click="rotateFrame()"
      >
        <FormatRotate90
          v-if="mouseOverId === true"
          :width="20"
          :height="20"
        />
      </div>
      <div
        class="action-icon delete-icon"
        @click="deleteFrame()"
      >
        <CloseCircleOutline
          v-if="mouseOverId === true"
          :width="20"
          :height="20"
        />
      </div>
      <div
        class="action-icon picture-icon"
        @click="ChangeImage()"
      >
        <ImageMultiple
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
import ImageMultiple from "mdi-vue/ImageMultiple.vue";
export default {
  name: "DragableFrame",
  components: {
    ImageMultiple,
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
      spacingStyle: '',
      padding: 0,
      mouseOverId: false,
      imageWidth: 0,
      imageHeight: 0,
      imageX: 0,
      imageY: 0,
      realImage: '',
      margininCm: 10,
    };
  },
  async mounted () {
    // this.spacingStyle = '#577590 1px solid'
    this.padding = (this.margininCm / 10) * this.$store.state.framePow
    await this.initImage()
  },
  methods: {
    async ChangeImage () {
      let currentImage = this.realImage
      this.realImage = prompt("Please put your Image URL", this.realImage) || currentImage;
      this.$store.commit('manipulateFrame',{id:`frame-${this.frame.key}`,field:'image',value:this.realImage})
    },
    async initImage () {
      let req = await fetch(this.frame.background)
      let svgStr = await req.text();
      let parser = new DOMParser();
      let svgDom = parser.parseFromString(svgStr, "image/svg+xml");
      this.imageWidth = (svgDom.getElementById('photo-area').getAttribute('width') / 10) * this.$store.state.framePow
      this.imageHeight = (svgDom.getElementById('photo-area').getAttribute('height') / 10) * this.$store.state.framePow
      this.imageX = (svgDom.getElementById('photo-area').getAttribute('x') / 10) * this.$store.state.framePow
      this.imageY = (svgDom.getElementById('photo-area').getAttribute('y') / 10) * this.$store.state.framePow
      if(this.frame.image) {
        this.realImage = this.frame.image
      } else {
        this.realImage = `https://dummyimage.com/${svgDom.getElementById('photo-area').getAttribute('width')}x${svgDom.getElementById('photo-area').getAttribute('height')}/f8f9fa/023047.png`
      }
      this.$store.commit('manipulateFrame',{id:`frame-${this.frame.key}`,field:'image',value:this.realImage})
    },
    onDrag(x, y) {
      this.setFramePostion(`frame-${this.frame.key}`,x, y)
    },
    rotateFrame() {
      this.$store.commit('manipulateFrame',{id:`frame-${this.frame.key}`,field:'rorate',value:!this.frames[`frame-${this.frame.key}`].rorate})
    },
    setFramePostion( id, x, y ) {
      this.$store.commit('manipulateFrame',{id:id,field:'x',value:x})
      this.$store.commit('manipulateFrame',{id:id,field:'y',value:y})
    },
    deleteFrame() {
      this.$store.commit('deleteFrame',`frame-${this.frame.key}`)
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
.picture-icon{
  color: #277da1;  
}
.delete-icon {
  color: #f94144;
}
.rotate-icon {
  color: #43aa8b;
}
</style>