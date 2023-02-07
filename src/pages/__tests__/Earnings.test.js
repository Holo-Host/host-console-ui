import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import axios from 'axios'
import { defaultSettingsResult } from 'src/__tests__/constants'
import { mockGlobalCrypto } from 'src/__tests__/utils'
import router from '@/router'
import { createI18n } from 'vue-i18n'
import Earnings from '../EarningsPage.vue'
import { messages } from '@/locales'
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest'

const clickOutside = vi.fn()

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages
})

vi.mock('axios')
mockGlobalCrypto()

describe('earnings page', () => {
  beforeEach(() => {
    axios.get.mockClear()
    axios.put.mockClear()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  const setup = () => {
    return mount(Earnings, {
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
    const wrapper = setup()

    axios.get.mockImplementation((path) => {
      if (path.endsWith('/api/v1/config')) {
        return Promise.resolve(defaultSettingsResult)
      }

      throw new Error(`axios mock doesn't recognise this path: ${path}`)

    })

    it('with primary layout', async () => {
      expect(wrapper.findAll('[data-test-earnings-layout]')).toHaveLength(1)
    })

    it('with weekly earnings card', async () => {
      expect(wrapper.findAll('[data-test-earnings-weekly-earnings-card]')).toHaveLength(1)
    })

    it('with redeemable holo fuel card', async () => {
      expect(wrapper.findAll('[data-test-earnings-redeemable-holo-fuel-card]')).toHaveLength(1)
    })
  })
})
