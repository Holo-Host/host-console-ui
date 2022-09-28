import { createTestingPinia } from '@pinia/testing'
import { within, render } from '@testing-library/vue'
import axios from 'axios'
import { defaultSettingsResult } from 'src/__tests__/constants'
import { mockGlobalCrypto } from 'src/__tests__/utils'
import router from 'src/router'
import { createI18n } from 'vue-i18n'
import wait from 'waait'
import Earnings from '../EarningsPage.vue'
import locales from '@/locales'
const clickOutside = jest.fn()

const i18n = createI18n({
  legacy: false,
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

  it('renders page header', async () => {
    axios.get.mockImplementation((path) => {
      if (path.endsWith('/api/v1/config')) {
        return Promise.resolve(defaultSettingsResult)
      }

      throw new Error(`axios mock doesn't recognise this path: ${path}`)
    })

    const { getByTestId } = render(Earnings, {
      global: {
        plugins: [router, createTestingPinia(), i18n],
        directives: {
          clickOutside
        }
      }
    })

    await wait(0)

    within(getByTestId('earnings-page')).getAllByText('Earnings')
  })
})
