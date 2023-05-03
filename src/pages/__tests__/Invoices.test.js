import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import axios from 'axios'
import { mockGlobalCrypto } from 'src/__tests__/utils'
import { createI18n } from 'vue-i18n'
import messages from '@/locales'
import InvoicesPage from '@/pages/InvoicesPage.vue'
import router from '@/router'
import { expect, describe, it, vi } from 'vitest'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages
})

vi.mock('axios')
mockGlobalCrypto()

const clickOutside = vi.fn()

describe('invoices page', () => {
  const setup = () => {
    return mount(InvoicesPage, {
      global: {
        plugins: [
          i18n,
          router,
          createTestingPinia({
            stubActions: false,
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

    it('with primary layout', () => {
      expect(wrapper.findAll('[data-test-invoices-page-layout]')).toHaveLength(1)
    })

    it('with filters', () => {
      expect(wrapper.findAll('[data-test-invoices-page-filters]')).toHaveLength(1)
    })

    it('with invoices table', () => {
      expect(wrapper.findAll('[data-test-invoices-page-table]')).toHaveLength(1)
    })


    it('with proper title in the top nav', () => {
      const layout = wrapper.find('[data-test-invoices-page-layout]')

      expect(layout.text()).toContain(messages.en.invoices.status.unpaid)
    })

    it('with proper table headers', () => {
      const table = wrapper.find('[data-test-invoices-page-table]')

      expect(table.text()).toContain(messages.en.invoices.headers.happ)
      expect(table.text()).toContain(messages.en.invoices.headers.publisher)
      expect(table.text()).toContain(messages.en.invoices.headers.created)
      expect(table.text()).toContain(messages.en.invoices.headers.due)
      expect(table.text()).toContain(messages.en.invoices.headers.invoice)
      expect(table.text()).toContain(messages.en.invoices.headers.payment_status)
    })
  })
})
