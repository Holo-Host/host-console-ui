import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import axios from 'axios'
import { defaultSettingsResult, defaultSshAccessResult } from 'src/__tests__/constants'
import { mockGlobalCrypto } from 'src/__tests__/utils'
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest'
import { createI18n } from 'vue-i18n'
import TheSidebar from '../sidebar/TheSidebar.vue'
import messages from '@/locales'
import router from '@/router'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages
})

vi.mock('axios')
mockGlobalCrypto()

describe('sidebar', () => {
  beforeEach(() => {
    axios.get.mockClear()
    axios.put.mockClear()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  const setup = () => {
    return mount(TheSidebar, {
      global: {
        plugins: [
          i18n,
          router,
          createTestingPinia({
            createSpy: vi.fn()
          })
        ]
      }
    })
  }

  describe('renders', () => {
    const wrapper = setup()

    it('with sidebar section', async () => {
      expect(wrapper.findAll('[data-test-sidebar]')).toHaveLength(1)
    })

    it('with header', async () => {
      expect(wrapper.findAll('[data-test-sidebar-header]')).toHaveLength(1)
    })

    it('with proper header content', () => {
      expect(wrapper.find('[data-test-sidebar-header]').text()).toContain(
        messages.en.$.host_console
      )
    })

    it('with menu', async () => {
      expect(wrapper.findAll('[data-test-sidebar-menu]')).toHaveLength(1)
    })

    it('with proper number of menu items', async () => {
      expect(wrapper.findAll('[data-test-sidebar-menu-item]')).toHaveLength(4)
    })

    it('with footer', async () => {
      expect(wrapper.findAll('[data-test-sidebar-footer]')).toHaveLength(1)
    })

    it('with alpha flag', async () => {
      axios.get.mockImplementation(async (path) => {
        if (path.endsWith('/api/v1/config')) {
          return Promise.resolve(defaultSettingsResult)
        }

        if (path.endsWith('/api/v1/profiles/development/features/ssh')) {
          return Promise.resolve(defaultSshAccessResult)
        }

        throw new Error(`axios mock doesn't recognise this path: ${path}`)
      })

      expect(wrapper.findAll('[data-test-sidebar-alpha-banner]')).toHaveLength(1)
    })
  })
})
