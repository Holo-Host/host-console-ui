import { createTestingPinia } from '@pinia/testing'
import { render } from '@testing-library/vue'
import { routes } from 'src/router'
import { createRouter, createWebHistory } from 'vue-router'
import TopNav from '../TopNav.vue'

const router = createRouter({
  history: createWebHistory(),
  routes
})

it('renders a title', async () => {
  const title = 'A page title'
  const { getByText } = render(TopNav, {
    props: {
      breadcrumbs: [{ label: title }],
      displayName: 'Geralt of Rivia',
      publicKey: 'QWERty123456789'
    },
    global: { plugins: [router, createTestingPinia()] }
  })

  await router.isReady()

  getByText(title)
})
