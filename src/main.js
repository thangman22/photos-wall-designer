import { createApp } from 'vue'
import App from './App.vue'
import VueDraggableResizable from 'vue-draggable-resizable'
import './registerServiceWorker'

const app = createApp(App).mount("#app");

app.component('vue-draggable-resizable', VueDraggableResizable)
