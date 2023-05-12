import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import axios from 'axios'
import { defaultSettingsResult, defaultSshAccessResult } from 'src/__tests__/constants.js'
import { mockGlobalCrypto } from 'src/__tests__/utils.js'
import router from '@/router'
import { createI18n } from 'vue-i18n'
import DashboardPage from '../DashboardPage.vue'
import messages from '@/locales'
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages
})

vi.mock('axios')
mockGlobalCrypto()

const clickOutside = vi.fn()

describe('dashboard page', () => {
  beforeEach(() => {
    axios.get.mockClear()
    axios.put.mockClear()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  const setup = () => {
    return mount(DashboardPage, {
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

  describe('renders', () => {
    const wrapper = setup()

    const hostedHappsResult = {
      data: [{ enabled: true }, { enabled: true }, { enabled: true }] // this page just cares about length
    }

    const usageResult = {
      data: {
        totalHostedAgents: 387,
        currentTotalStorage: 590348543805,
        totalUsage: {
          cpu: 39084998,
          bandwidth: 5094853480509
        }
      }
    }

    axios.get.mockImplementation((path) => {
      if (path.endsWith('/api/v1/config')) {
        return Promise.resolve(defaultSettingsResult)
      }

      if (path.endsWith('/api/v1/profiles/development/features/ssh')) {
        return Promise.resolve(defaultSshAccessResult)
      }

      if (path.endsWith('hosted_happs')) {
        return hostedHappsResult
      }

      if (path.endsWith('config')) {
        return {
          data: {
            admin: {}
          }
        }
      }

      if (path.endsWith('usage')) {
        return usageResult
      }

      throw new Error(`axios mock doesn't recognise this path: ${path}`)
    })

    it('with primary layout', async () => {
      expect(wrapper.findAll('[data-test-dashboard-layout]')).toHaveLength(1)
    })

    it('with proper title in the top nav', () => {
      const layout = wrapper.find('[data-test-dashboard-layout]')

      expect(layout.text()).toContain(messages.en.$.dashboard)
    })

    it('with usage card', async () => {
      expect(wrapper.findAll('[data-test-dashboard-usage-card]')).toHaveLength(1)
    })

    it('with HoloFuel card', async () => {
      expect(wrapper.findAll('[data-test-dashboard-holo-fuel-card]')).toHaveLength(1)
    })

    it('with hApps card', async () => {
      expect(wrapper.findAll('[data-test-dashboard-happs-card]')).toHaveLength(1)
    })

    it('with earnings card', async () => {
      expect(wrapper.findAll('[data-test-dashboard-earnings-card]')).toHaveLength(1)
    })

    it('with payments card', async () => {
      expect(wrapper.findAll('[data-test-dashboard-payments-card]')).toHaveLength(1)
    })
  })
})
