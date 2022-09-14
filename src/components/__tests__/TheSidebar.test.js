import { createTestingPinia } from '@pinia/testing'
import { render } from '@testing-library/vue'
import axios from 'axios'
import { defaultSettingsResult, defaultSshAccessResult } from 'src/__tests__/constants'
import { mockGlobalCrypto } from 'src/__tests__/utils'
import router from 'src/router'
import { createI18n } from 'vue-i18n'
import wait from 'waait'
import TheSidebar from '../sidebar/TheSidebar'
import locales from '@/locales'

const i18n = createI18n({
  legacy: true,
  locale: 'en',
  messages: locales
})

jest.mock('axios')
mockGlobalCrypto()

describe('earnings page', () => {
  beforeEach(() => {
    axios.get.mockClear()
    axios.put.mockClear()
  })

  it('sidebar renders alpha flag', async () => {
    axios.get.mockImplementation((path) => {
      if (path.endsWith('/api/v1/config')) {
        return Promise.resolve(defaultSettingsResult)
      }

      if (path.endsWith('/api/v1/profiles/development/features/ssh')) {
        return Promise.resolve(defaultSshAccessResult)
      }

      throw new Error(`axios mock doesn't recognise this path: ${path}`)
    })

    const { getByText } = render(TheSidebar, {
      global: { plugins: [router, createTestingPinia(), i18n] }
    })
    await wait(0)

    getByText('ALPHA: HoloFuel = Test Fuel')
  })
})
