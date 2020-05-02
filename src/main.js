import Vue from 'vue'
import App from './App.vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import './registerServiceWorker'
Vue.component('vue-draggable-resizable', VueDraggableResizable)

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
