import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { mockGlobalCrypto } from 'src/__tests__/utils'
import router from '@/router.ts'
import { createI18n } from 'vue-i18n'
import HostingPreferences from '../HostingPreferences.vue'
import messages from '@/locales'
import {expect, describe, it, vi, beforeEach, afterEach} from 'vitest'
import axios from 'axios';

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages
})

vi.mock('axios')
mockGlobalCrypto()

const clickOutside = vi.fn()

describe('hosting preferences page', () => {
  beforeEach(() => {
    axios.get.mockClear()
    axios.put.mockClear()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  const setup = () => {
    return mount(HostingPreferences, {
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
          })
        ],
        directives: {
          clickOutside
        }
      }
    })
  }

  describe('renders', async () => {
    const wrapper = setup()

    it('with primary layout', () => {
      expect(wrapper.findAll('[data-test-hosting-preferences-layout]')).toHaveLength(1)
    })

    it('with prices section', () => {
      expect(wrapper.findAll('[data-test-hosting-preferences-prices-section]')).toHaveLength(1)
    })

    it('with invoices section', () => {
      expect(wrapper.findAll('[data-test-hosting-preferences-invoices-section]')).toHaveLength(1)
    })

    it('with happ selection section', () => {
      expect(wrapper.findAll('[data-test-hosting-preferences-happ-selection-section]')).toHaveLength(1)
    })

    it('with proper title in the top nav', () => {
      const layout = wrapper.find('[data-test-hosting-preferences-layout]')

      expect(layout.text()).toContain(messages.en.hosting_preferences.header)
    })
  })
})
