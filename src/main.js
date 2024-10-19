import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

// Enlève toute importation des styles ici
// import './assets/styles.css';

createApp(App).use(router).mount('#app');
