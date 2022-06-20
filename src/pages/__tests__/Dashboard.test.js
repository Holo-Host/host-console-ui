import { render } from '@testing-library/vue'
import axios from 'axios'
import { defaultSettingsResult, defaultSshAccessResult } from 'src/__tests__/constants'
import { mockGlobalCrypto } from 'src/__tests__/utils'
import router from 'src/router'
import wait from 'waait'
import Dashboard from '../Dashboard.vue'

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
				totalSourceChains: 387,
				currentTotalStorage: 590348543805,
				usage: {
					cpu: 39084998,
					bandwidth: 5094853480509
				}
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

		const { getByTestId } = render(Dashboard, {
			global: { plugins: [router] }
		})

		await wait(0)

		expect(getByTestId('happ-no').textContent === hostedHappsResult.data.length)
		expect(getByTestId('sc-no').textContent === dashboardResult.data.totalSourceChains)
	})
})
