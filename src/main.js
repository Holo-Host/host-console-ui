import { createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import App from './App.vue'
import messages from './locales'
import router from './router'

import './assets/css/styles.css'

const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages
})

createApp(App).use(router).use(i18n).mount('#app')
