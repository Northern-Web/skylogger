import { createApp } from 'vue'
import App from './App.vue'
import VueToast from 'vue-toast-notification';
import router from './router'

import 'vue-toast-notification/dist/theme-sugar.css';
import './assets/main.css';


const vm = createApp(App)
        .use(router)
        .use(VueToast)
        .mount('#app');

export default vm;