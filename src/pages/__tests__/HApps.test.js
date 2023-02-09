import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import axios from 'axios'
import { defaultSettingsResult, defaultSshAccessResult } from 'src/__tests__/constants'
import { mockGlobalCrypto } from 'src/__tests__/utils'
import router from '@/router'
import { createI18n } from 'vue-i18n'
import HAppsPage from '../HAppsPage.vue'
import { messages } from '@/locales'
import { useHposInterface } from '@/interfaces/HposInterface'
import { expect, describe, it, vi, beforeEach, afterEach } from 'vitest'

const clickOutside = vi.fn()

const { HPOS_API_URL } = useHposInterface()

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages
})

vi.mock("axios", () => {
  return {
    default: {
      get: vi.fn()
    }
  }
})

// const axiosGetSpy = vi.spyOn(axios, 'get')

mockGlobalCrypto()

describe('happs page', () => {
  beforeEach(() => {
    axios.get.mockClear()
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

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

    // axios.get.mockResolvedValue(hostedHappsResult)

    // axios.get.mockImplementation((path) => {
    //   if (path.endsWith('/api/v1/config')) {
    //     return defaultSettingsResult
    //   }
    //
    //   if (path.endsWith('/holochain-api/v1/hosted_happs')) {
    //     return hostedHappsResult
    //   }
    //
    //   throw new Error(`axios mock doesn't recognise this path: ${path}`)
    // })

    const wrapper = setup()

    wrapper.

    it('calls the /holochain-api/v1/hosted_happs endpoint', async () => {
      // expect(axios.get).toEqual(`${HPOS_API_URL}/holochain-api/v1/hosted_happs`)
      // expect(axiosGetSpy).toHaveBeenCalledTimes(1)
      expect(axios.get).toHaveBeenCalledTimes(1)
      // expect(spy).toEqual(`${HPOS_API_URL}/holochain-api/v1/hosted_happs`)
    })
  })
})
