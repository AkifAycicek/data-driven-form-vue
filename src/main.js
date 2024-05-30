// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'

// createApp(App).mount('#app')

import { Quasar } from 'quasar';

import '@quasar/extras/roboto-font/roboto-font.css';

import 'quasar/src/css/index.sass';

import AppVue from './App.vue';

const app = createApp(AppVue);

app.use(Quasar, {
  plugins: {},
});

app.mount('#app');
