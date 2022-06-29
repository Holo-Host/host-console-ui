import { createTestingPinia } from '@pinia/testing'
import { render } from '@testing-library/vue'
import axios from 'axios'
import { defaultSettingsResult, defaultSshAccessResult } from 'src/__tests__/constants'
import { mockGlobalCrypto } from 'src/__tests__/utils'
import router from 'src/router'
import wait from 'waait'
import DashboardPage from '../DashboardPage.vue'

jest.mock('axios')
mockGlobalCrypto()

describe('dashboard page', () => {
  beforeEach(() => {
    axios.get.mockClear()
    axios.put.mockClear()
  })

  it('shows the proper data', async () => {
    const hostedHappsResult = {
      data: [{ enabled: true }, { enabled: true }, { enabled: true }] // this page just cares about length
    }

    const dashboardResult = {
      data: {
        earnings: { last30Days: 1343209.4, last7Days: 447768.54, lastDay: 34209.4 },
        holofuel: { balance: 1234 },
        recentPayments: [
          {
            id: '1',
            amount: 167504.4,
            status: 'received',
            happ: 'HoloFuel',
            updatedAt: '2022-06-10T14:48:00.000Z'
          },
          {
            id: '2',
            amount: 987334.34,
            status: 'received',
            happ: 'SF GeoChat',
            updatedAt: '2022-06-09T14:48:00.000Z'
          },
          {
            id: '3',
            amount: 65456.02,
            status: 'received',
            happ: 'HC-Wiki',
            updatedAt: '2022-06-05T14:48:00.000Z'
          }
        ],
        usage: { bandwidth: 5094853480509, totalSourceChains: 387, totalHostedHapps: 3 }
      }
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

      if (path.endsWith('config')) {
        return {
          data: {
            admin: {}
          }
        }
      }

      if (path.endsWith('dashboard')) {
        return dashboardResult
      }

      throw new Error(`axios mock doesn't recognise this path: ${path}`)
    })

    const { getByTestId } = render(DashboardPage, {
      global: { plugins: [router, createTestingPinia()] }
    })

    await wait(0)

    expect(getByTestId('happ-no').textContent === hostedHappsResult.data.length)
    expect(getByTestId('sc-no').textContent === dashboardResult.data.totalSourceChains)
  })
})
