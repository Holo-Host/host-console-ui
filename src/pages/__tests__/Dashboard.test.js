import axios from 'axios'
import { render } from  '@testing-library/vue'
import { HPOS_API_URL } from 'src/interfaces/HposInterface'
import Dashboard from '../Dashboard.vue'
import wait from 'waait'

jest.mock('axios')

it('shows the proper data', async () => {
  const hostedHappsResult = {
    data: {
      hosted_happs: [{enabled: true}, {enabled: true}, {enabled: true}] // this page just cares about length
    }
  }

  axios.get
    .mockImplementation(({...args}) => console.log('***************** args', args))
    
    // Once(() => Promise.resolve(hostedHappsResult))  
    // .mockImplementationOnce(() => Promise.resolve(hostedHappsResult))
    // .mockImplementationOnce(() => Promise.resolve({ data: { admin: {} } })) // mock settings call

  render(Dashboard)

  // await wait(0)

  // expect(axios.get.mock.calls[0][0]).toEqual(`${HPOS_API_URL}/holochain-api/v1/hosted_happs`)
  // expect(true).toEqual(true)
})
