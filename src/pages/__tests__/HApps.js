import { createTestingPinia } from '@pinia/testing'
import { render } from '@testing-library/vue'
import axios from 'axios'
import { defaultSettingsResult, defaultSshAccessResult } from 'src/__tests__/constants'
import { mockGlobalCrypto } from 'src/__tests__/utils'
import router from '@/router'
import { createI18n } from 'vue-i18n'
import wait from 'waait'
import HAppsPage from '../HAppsPage.vue'
import locales from '@/locales'
import { useHposInterface } from '@/interfaces/HposInterface'

const { HPOS_API_URL } = useHposInterface()

const clickOutside = jest.fn()

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: locales
})

jest.mock('axios')
mockGlobalCrypto()

describe('happs page', () => {
  beforeEach(() => {
    axios.get.mockClear()
    axios.put.mockClear()
  })

  it('calls the hosted_happs endpoint', async () => {
    const hostedHappsResult = {
      data: []
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

      throw new Error(`axios mock doesn't recognise this path: ${path}`)
    })

    render(HAppsPage, {
      global: {
        plugins: [router, createTestingPinia(), i18n],
        directives: {
          clickOutside
        }
      }
    })

    await wait(0)

    expect(axios.get.mock.calls[0][0]).toEqual(`${HPOS_API_URL}/holochain-api/v1/hosted_happs`)
  })
})
