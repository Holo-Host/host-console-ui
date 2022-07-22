import { createTestingPinia } from '@pinia/testing'
import { render } from '@testing-library/vue'
import { kRoutes } from 'src/router'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'
import TopNav from '../TopNav.vue'

const i18n = createI18n({
  legacy: true,
  locale: 'en',
  messages: {
    en: {
      hello: 'Hello'
    },
    ja: {
      hello: 'こんにちは'
    }
  }
})

const router = createRouter({
  history: createWebHistory(),
  routes: [
    kRoutes.accountSettings,
    kRoutes.dashboard,
    kRoutes.default,
    kRoutes.earnings,
    kRoutes.happ,
    kRoutes.happs,
    kRoutes.hostingPreferences,
    kRoutes.invoices,
    kRoutes.login
  ]
})

it('renders a title', async () => {
  const title = 'A page title'
  const { getByText } = render(TopNav, {
    props: {
      breadcrumbs: [{ label: title }],
      displayName: 'Geralt of Rivia',
      publicKey: 'QWERty123456789'
    },
    global: { plugins: [router, createTestingPinia(), i18n] }
  })

  await router.isReady()

  getByText(title)
})
