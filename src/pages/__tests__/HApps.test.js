import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import axios from 'axios'
import { mockGlobalCrypto } from 'src/__tests__/utils'
import router from '@/router'
import { createI18n } from 'vue-i18n'
import HAppsPage from '../HAppsPage.vue'
import messages from '@/locales'
import { expect, describe, it, vi } from 'vitest'
import {defaultSettingsResult, defaultSshAccessResult} from '@/__tests__/constants';

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages
})

vi.mock('axios')
mockGlobalCrypto()

const clickOutside = vi.fn()

const kEnabledHAppData = {
  "id": "uhCkklIcMotiLOLX-tpGMcuw12fYOVGCpi9pAF-jvNqrzTEUj63v0",
  "name": "Cloud Console",
  "description": "Cloud Console",
  "categories": [],
  "enabled": true,
  "isPaused": false,
  "sourceChains": 0,
  "daysHosted": 0,
  "earnings": {
    "total": "0",
    "last7Days": "0",
    "averageWeekly": "0"
  },
  "usage": null,
  "hostingPlan": "free"
}

const kDisabledHAppData =     {
  "id": "uhCkkUeA4YKEdVsQWTVTRadD4nQFP_KTNt2Rivfp7tU-53cHMHuTH",
  "name": "Holofuel",
  "description": "Holofuel",
  "categories": [],
  "enabled": false,
  "isPaused": false,
  "sourceChains": 0,
  "daysHosted": 0,
  "earnings": {
    "total": "0",
    "last7Days": "0",
    "averageWeekly": "0"
  },
  "usage": null,
  "hostingPlan": "free"
}

describe('hApps page', () => {
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

    const hostedHAppsResult = {
      data: [kEnabledHAppData, kDisabledHAppData]
    }

    axios.get.mockImplementation((path) => {
      if (path.endsWith('hosted_happs')) {
        return hostedHAppsResult
      }

      throw new Error(`axios mock doesn't recognise this path: ${path}`)
    })

    it('with primary layout', async () => {
      expect(wrapper.findAll('[data-test-happs-page-layout]')).toHaveLength(1)
    })

    it('with tabs select component', async () => {
      expect(wrapper.findAll('[data-test-happs-page-tabs-select]')).toHaveLength(1)
    })

    it('with search input', async () => {
      expect(wrapper.findAll('[data-test-happs-page-search-input]')).toHaveLength(1)
    })

    it('with sort dropdown', async () => {
      expect(wrapper.findAll('[data-test-happs-page-sort-by-dropdown]')).toHaveLength(1)
    })

    it('without hApp cards', async () => {
      expect(wrapper.findAll('[data-test-happs-page-happ-card]')).toHaveLength(0)
    })

    it('with empty list card', async () => {
      expect(wrapper.findAll('[data-test-happs-page-happ-card-empty]')).toHaveLength(1)
    })
  })
})
