import { createTestingPinia } from '@pinia/testing'
import { render } from '@testing-library/vue'
import messages from 'src/locales'
import { kRoutes } from 'src/router'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'
import TopNav from '../TopNav.vue'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages
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
      publicKey: 'QWERty123456789',
      nickname: 'White Wolf',
      agentAddress: new Uint8Array([
        132, 32, 36, 157, 32, 140, 24, 241, 10, 28, 222, 179, 158, 62, 209, 80, 229, 227, 114, 241,
        62, 210, 166, 100, 55, 151, 238, 176, 36, 80, 111, 82, 43, 225, 83, 139, 240, 203, 176
      ])
    },
    global: { plugins: [router, createTestingPinia(), i18n] }
  })

  await router.isReady()

  getByText(title)
})
