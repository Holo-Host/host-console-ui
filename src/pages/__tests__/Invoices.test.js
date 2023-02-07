import { createTestingPinia } from '@pinia/testing'
import { render, within } from '@testing-library/vue'
import axios from 'axios'
import { mockGlobalCrypto } from 'src/__tests__/utils'
import { createI18n } from 'vue-i18n'
import { mockPaidInvoicesData } from '../../../mock-hpos-api/defaultResponse'
import locales from '@/locales'
import InvoicesPage from '@/pages/InvoicesPage.vue'
import router from '@/router'
import { useEarningsStore } from '@/store/earnings'
import { useHposInterface } from '@/interfaces/HposInterface'
import { describe, it, expect } from 'vitest'

const { HPOS_API_URL } = useHposInterface()

const clickOutside = jest.fn()

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages: locales
})

const translations = locales.en

jest.mock('axios')
mockGlobalCrypto()

describe('invoices page', () => {
  beforeEach(() => {
    axios.get.mockClear()
    axios.put.mockClear()
  })

  it('calls host_invoices endpoint on init', () => {
    const hostInvoicesResult = {
      data: []
    }

    axios.post.mockImplementation((path) => {
      if (path.endsWith('/api/v1/host_invoices')) {
        return hostInvoicesResult
      }

      throw new Error(`axios mock doesn't recognise this path: ${path}`)
    })

    render(InvoicesPage, {
      global: {
        plugins: [router, createTestingPinia({ stubActions: false }), i18n],
        directives: {
          clickOutside
        }
      }
    })

    const store = useEarningsStore()

    expect(store.getUnpaidInvoices).toHaveBeenCalledTimes(1)
    expect(axios.get.mock.calls[0][0]).toEqual(`${HPOS_API_URL}/holochain-api/v1/host_invoices`)
  })

  describe('shows the invoices page', () => {
    axios.post.mockImplementation((path) => {
      if (path.endsWith('host_invoices')) {
        return { data: mockPaidInvoicesData }
      }

      throw new Error(`axios mock doesn't recognise this path: ${path}`)
    })

    const { getByTestId } = render(InvoicesPage, {
      global: {
        plugins: [router, createTestingPinia(), i18n],
        directives: {
          clickOutside
        }
      }
    })

    const invoicePage = within(getByTestId('invoices-page'))

    it('with side menu', () => {
      expect(invoicePage.getAllByTestId('sidebar')).toHaveLength(1)
    })

    it('with top nav', () => {
      const topNav = invoicePage.getAllByTestId('top-nav')
      expect(topNav).toHaveLength(1)
    })

    it('with proper title in the top nav', () => {
      const topNav = invoicePage.getByTestId('top-nav')
      within(topNav).getByText(translations.earnings.title)
      within(topNav).getByText(translations.earnings.unpaid_invoices)
    })

    it('with table filter', () => {
      expect(invoicePage.getAllByTestId('invoices-page-filters')).toHaveLength(1)
    })

    it('with proper table headers', () => {
      invoicePage.getAllByText(translations.invoices.headers.happ)
      invoicePage.getAllByText(translations.invoices.headers.publisher)
      invoicePage.getAllByText(translations.invoices.headers.created)
      invoicePage.getAllByText(translations.invoices.headers.due)
      invoicePage.getAllByText(translations.invoices.headers.invoice)
      invoicePage.getAllByText(translations.invoices.headers.payment_status)
    })
  })
})
