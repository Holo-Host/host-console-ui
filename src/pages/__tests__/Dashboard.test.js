import axios from 'axios'
import { render, waitFor } from  '@testing-library/vue'
import Dashboard from '../Dashboard.vue'
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

it('shows the proper data', async () => {
  const hostedHappsResult = {
    data: [{enabled: true}, {enabled: true}, {enabled: true}] // this page just cares about length
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

    if (path.endsWith('dashboard')) {
      return dashboardResult
    }

    throw new Error (`axios mock doesn't recognise this path: ${path}`)
  })    

  const { getByText, getByTestId } = render(Dashboard, {routes})
  await wait(0)

  await waitFor(() => getByText('39.08 s'))
  getByText('549.8 GB')
  getByText('4.63 TB')        

  expect(getByTestId('happ-no').textContent == hostedHappsResult.data.length)
  expect(getByTestId('sc-no').textContent == dashboardResult.data.totalSourceChains)  


})
