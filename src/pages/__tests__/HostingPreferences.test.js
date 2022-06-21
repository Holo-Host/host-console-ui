import { render } from '@testing-library/vue'
import axios from 'axios'
import { defaultSettingsResult, defaultSshAccessResult } from 'src/__tests__/constants'
import { mockGlobalCrypto } from 'src/__tests__/utils'
import router from 'src/router'
import wait from 'waait'
import HostingPreferences from '../HostingPreferences.vue'

jest.mock('axios')
mockGlobalCrypto()

describe('hosting preferences page', () => {
  beforeEach(() => {
    axios.get.mockClear()
    axios.put.mockClear()
  })

  it('renders all card titles', async () => {
    axios.get.mockImplementation((path) => {
      if (path.endsWith('/api/v1/config')) {
        return Promise.resolve(defaultSettingsResult)
      }

      if (path.endsWith('/api/v1/profiles/development/features/ssh')) {
        return Promise.resolve(defaultSshAccessResult)
      }

      throw new Error(`axios mock doesn't recognise this path: ${path}`)
    })

    const { getByText } = render(HostingPreferences, {
      global: { plugins: [router] }
    })
    await wait(0)

    getByText('Price Configuration')
    getByText('Invoice & Payment Terms')
    getByText('hApp Selection')
  })
})
