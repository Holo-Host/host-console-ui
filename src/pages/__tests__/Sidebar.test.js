import axios from 'axios'
import { render } from  '@testing-library/vue'
import HostingPreferences from '../HostingPreferences.vue'
import wait from 'waait'
import router  from 'src/router'

jest.mock('axios')

Object.defineProperty(global, 'crypto', {
  value: {
    subtle: {
      digest: () => Promise.resolve('unchecked string')
    }
  }
});

it('sidebar renders alpha flag', async () => {
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

  const { getByText } = render(HostingPreferences, {
		global: { plugins: [ router ]},
	})
  await wait(0)

  getByText('ALPHA: HoloFuel = Test Fuel')
})
