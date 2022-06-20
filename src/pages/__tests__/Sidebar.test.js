import axios from 'axios'
import { render } from  '@testing-library/vue'
import HostingPreferences from '../HostingPreferences.vue'
import wait from 'waait'
import router  from 'src/router'
import { mockGlobalCrypto } from 'src/__tests__/utils'
import { defaultSettingsResult, defaultSshAccessResult } from 'src/__tests__/constants'

jest.mock('axios')
mockGlobalCrypto()

describe('earnings page', () => {
	beforeEach(() => {
		axios.get.mockClear()
		axios.put.mockClear()
	})

	it('sidebar renders alpha flag', async () => {
		axios.get.mockImplementation(path => {
			if (path.endsWith('/api/v1/config')) {
				return Promise.resolve(defaultSettingsResult)
			}

			if (path.endsWith('/api/v1/profiles/development/features/ssh')) {
				return Promise.resolve(defaultSshAccessResult)
			}

			throw new Error (`axios mock doesn't recognise this path: ${path}`)
		})

		const {getByText} = render(HostingPreferences, {
			global: {plugins: [router]},
		})
		await wait(0)

		getByText('ALPHA: HoloFuel = Test Fuel')
	})
})
