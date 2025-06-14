import { createApp } from 'vue';
import App from './App.vue';
import { setupVueQuery } from './utils/query';

const app = createApp(App);

setupVueQuery(app);

app.mount('#app');
