import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import styles from './assets/css/styles.css'

createApp(App)
  .use(router)
  .mount('#app')
