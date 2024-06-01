import { setupComponents } from '@plugins/globalComponents.js';
import '@quasar/extras/material-icons/material-icons.css';
import '@quasar/extras/roboto-font/roboto-font.css';
import { Quasar } from 'quasar';
import 'quasar/src/css/index.sass';
import AppVue from './App.vue';

const app = createApp(AppVue);

setupComponents(app);

app.use(Quasar, {
  plugins: {},
});
app.use(createPinia());

app.mount('#app');
