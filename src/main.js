import Vue from 'vue'
import App from './App.vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import './registerServiceWorker'

new Vue({
    render: h => h(App),
  }).$mount('#app')

Vue.component('vue-draggable-resizable', VueDraggableResizable)
