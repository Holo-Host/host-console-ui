import axios from 'axios'
import { render, waitFor } from  '@testing-library/vue'
import EarningsInvoices from '../EarningsInvoices.vue'
import wait from 'waait'
import { routes } from 'src/router'

jest.mock('axios')

Object.defineProperty(global, 'crypto', {
  value: {
    subtle: {
      digest: () => Promise.resolve('unchecked string')
    }
  }
});

it('shows the earnings invoices page', async () => {
  axios.get.mockImplementation(path => {
    if (path.endsWith('config')) {
      return {
        data: {
          admin: {}
        }
      }
    }

    throw new Error (`axios mock doesn't recognise this path: ${path}`)
  })

  const { getByText } = render(EarningsInvoices, {routes})
  await wait(0)

  getByText('Earnings')
  getByText('Invoices')
})
