import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    frames: {},
    margin: 2,
    background: '#FFFFFF',
    spacingGuide: true,
    framePow: 3.6
  },
  mutations: {
    changeBackground (state, background) {
      state.background = background
    },
    changeSpacingGuide (state, spacingChecked) {
      state.spacingGuide = spacingChecked
    },
    changeMargin (state, margin) {
      state.margin = margin
    },
    manipulateFrame(state,{id,field,value}) {
      if(state.frames[id]) {
        state.frames[id][field] = value;
      }
    },
    initFrame(state, {key ,frameObject}) {
      Vue.set(state.frames, key, frameObject)
    },
    deleteFrame(state, key) {
      Vue.delete(state.frames, key)
    },
    clearFrame(state) {
      state.frames = {}
    },
  },
  plugins: [createPersistedState()]
})
