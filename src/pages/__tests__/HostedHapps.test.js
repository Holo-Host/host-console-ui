import axios from 'axios'
import { render } from  '@testing-library/vue'
import { HPOS_API_URL } from 'src/interfaces/HposInterface'
import HostedHapps from '../HostedHapps.vue'
import wait from 'waait'

jest.mock('axios')

it('calls the hosted_happs endpoint', async () => {
  const hostedHappsResult = {
    data: {
      hosted_happs: []
    }
  }

  axios.get
    .mockImplementationOnce(() => Promise.resolve(hostedHappsResult))
    .mockImplementationOnce(() => Promise.resolve({ data: { admin: {} } })) // mock settings call

  render(HostedHapps)

  await wait(0)

  expect(axios.get.mock.calls[0][0]).toEqual(`${HPOS_API_URL}/api/v1/hosted_happs`)
  expect(true).toEqual(true)
})
