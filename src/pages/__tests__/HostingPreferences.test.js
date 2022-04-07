import axios from 'axios'
import { render, within } from  '@testing-library/vue'
import HostingPreferences from '../HostingPreferences.vue'
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

it('renders all card titles', async () => {
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

  const { getByText } = render(HostingPreferences, {routes})
  await wait(0)

  getByText('Price Configuration')
  getByText('Invoice & Payment Terms')
  getByText('hApp Selection')
})
