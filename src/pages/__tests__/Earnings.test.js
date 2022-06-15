import axios from 'axios'
import { render } from  '@testing-library/vue'
import Earnings from '../Earnings.vue'
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

it('renders page header', async () => {
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

  const { getByText } = render(Earnings, {
		global: { plugins: [ router ]},
	})
  await wait(0)

  getByText('Weekly Earnings')
})
