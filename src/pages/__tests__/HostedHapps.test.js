import axios from 'axios'
import { render } from  '@testing-library/vue'
import { HPOS_API_URL } from 'src/interfaces/HposInterface'
import HostedHapps from '../HostedHapps.vue'
import wait from 'waait'
import router from 'src/router'

jest.mock('axios')

Object.defineProperty(global, 'crypto', {
  value: {
    subtle: {
      digest: () => Promise.resolve('unchecked string')
    }
  }
});

it('calls the hosted_happs endpoint', async () => {
  const hostedHappsResult = {
    data: []
  }

  axios.get.mockImplementation(path => {
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

    throw new Error (`axios mock doesn't recognise this path: ${path}`)
  })

  render(HostedHapps, {
		global: { plugins: [ router ]},
	})

  await wait(0)

  expect(axios.get.mock.calls[0][0]).toEqual(`${HPOS_API_URL}/holochain-api/v1/hosted_happs`)
})
