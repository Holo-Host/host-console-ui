import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { mockGlobalCrypto } from 'src/__tests__/utils'
import router from '@/router'
import { createI18n } from 'vue-i18n'
import Earnings from '../EarningsPage.vue'
import messages from '@/locales'
import { expect, describe, it, vi } from 'vitest'

const clickOutside = vi.fn()

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages
})

mockGlobalCrypto()

describe('earnings page', () => {
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

    it('with primary layout', () => {
      expect(wrapper.findAll('[data-test-earnings-layout]')).toHaveLength(1)
    })

    it('with weekly earnings card', () => {
      expect(wrapper.findAll('[data-test-earnings-weekly-earnings-card]')).toHaveLength(1)
    })

    it('with redeemable holo fuel card', () => {
      expect(wrapper.findAll('[data-test-earnings-redeemable-holo-fuel-card]')).toHaveLength(1)
    })

    it('with proper title in the top nav', () => {
      const layout = wrapper.find('[data-test-earnings-layout]')

      expect(layout.text()).toContain(messages.en.$.earnings)
    })
  })
})
