import { createTestingPinia } from '@pinia/testing'
import { render } from '@testing-library/vue'
import axios from 'axios'
import { defaultSettingsResult, defaultSshAccessResult } from 'src/__tests__/constants'
import { mockGlobalCrypto } from 'src/__tests__/utils'
import router from 'src/router'
import { createI18n } from 'vue-i18n'
import wait from 'waait'
import EarningsInvoices from '../EarningsInvoices.vue'
import locales from '@/locales'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: locales
})

jest.mock('axios')
mockGlobalCrypto()

describe('earnings invoices page', () => {
  beforeEach(() => {
    axios.get.mockClear()
    axios.put.mockClear()
  })

  it('shows the earnings invoices page', async () => {
    axios.get.mockImplementation((path) => {
      if (path.endsWith('/api/v1/config')) {
        return Promise.resolve(defaultSettingsResult)
      }

      if (path.endsWith('/api/v1/profiles/development/features/ssh')) {
        return Promise.resolve(defaultSshAccessResult)
      }

      throw new Error(`axios mock doesn't recognise this path: ${path}`)
    })

    const { getByText } = render(EarningsInvoices, {
      global: { plugins: [router, createTestingPinia(), i18n] }
    })

    await wait(0)

    getByText('Earnings')
    getByText('Invoices')
  })
})
