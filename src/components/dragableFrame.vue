<template>
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
      :style="{ width: `${frame.width}px`,height: `${frame.height}px`, background: `url('${frame.background}')`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat', paddingTop: '5px', paddingRight: '5px', textAlign: 'right', transform: frame.rorate ? 'rotate(90deg)' : 'rotate(0deg)'}"
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
      mouseOverId: false
    };
  },
  methods: {
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
  margin-right: 3px;
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