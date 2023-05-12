import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import axios from 'axios'
import { mockGlobalCrypto } from 'src/__tests__/utils'
import router from '@/router'
import { createI18n } from 'vue-i18n'
import HAppsPage from '../HAppsPage.vue'
import messages from '@/locales'
import { expect, describe, it, vi } from 'vitest'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages
})

vi.mock('axios')
mockGlobalCrypto()

const clickOutside = vi.fn()

describe('happs page', () => {
  const setup = () => {
    return mount(HAppsPage, {
      global: {
        plugins: [
          i18n,
          router,
          createTestingPinia({
            createSpy() {
              return () => {
                return Promise.resolve()
              }
            }
          }),
        ],
        directives: {
          clickOutside
        }
      }
    })
  }

  describe('renders', async () => {
    const hostedHappsResult = {
      data: []
    }

    axios.get.mockResolvedValue({
      data: hostedHappsResult,
    })

    setup()

    it('calls the /holochain-api/v1/hosted_happs endpoint', async () => {
      expect(axios.get.mock.calls[0][0]).toContain('/holochain-api/v1/hosted_happs')
    })
  })
})
