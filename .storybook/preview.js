import { app } from '@storybook/vue3'
import messages from '../src/locales'
import { createI18n } from 'vue-i18n'

import '../src/assets/css/styles.css'

const i18n = createI18n({
  locale: 'en',
  locales: ['en', 'pl'],
  messages,
  globalInjection: true,
  legacy: false
})

app.use(i18n)

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  locale: 'en',
  locales: {
    en: 'English'
  },
}
