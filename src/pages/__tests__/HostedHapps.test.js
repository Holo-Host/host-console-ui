import { createTestingPinia } from '@pinia/testing'
import { render } from '@testing-library/vue'
import axios from 'axios'
import { defaultSettingsResult, defaultSshAccessResult } from 'src/__tests__/constants'
import { mockGlobalCrypto } from 'src/__tests__/utils'
import { HPOS_API_URL } from 'src/interfaces/HposInterface'
import router from 'src/router'
import wait from 'waait'
import HostedHapps from '../HostedHapps.vue'

jest.mock('axios')
mockGlobalCrypto()

describe('hosted happs page', () => {
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

    render(HostedHapps, {
      global: { plugins: [router, createTestingPinia()] }
    })

    await wait(0)

    expect(axios.get.mock.calls[0][0]).toEqual(`${HPOS_API_URL}/holochain-api/v1/hosted_happs`)
  })
})
