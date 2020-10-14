import Vue from 'vue'
import App from './App.vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import './registerServiceWorker'
import store from './store'

Vue.component('vue-draggable-resizable', VueDraggableResizable)

new Vue({
  store,
  render: h => h(App)
}).$mount('#app')


