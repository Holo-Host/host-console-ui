import axios from 'axios'
import { render, waitFor, fireEvent } from '@testing-library/vue'
import wait from 'waait'
import { HPOS_API_URL } from 'src/interfaces/HposInterface'
import Settings from '../Settings.vue'
import { routes } from 'src/router'

jest.mock('axios')

Object.defineProperty(global, 'crypto', {
  value: {
    subtle: {
      digest: () => Promise.resolve('unchecked string')
    }
  }
});

const defaultSettings = {
  admin: {
    public_key: '5m5srup6m3b2iilrsqmxu6ydp8p8cr0rdbh4wamupk3s4sxqr5',
    email: 'test@test.com'
  },
  holoportos: {
    network: 'test',
    sshAccess: true
  },
  deviceName: "Lana Wilson's HP"
}

const defaultSettingsResult = {
  data: defaultSettings
}

const defaultSshAccessResult = {
  data: { enabled: true }
}

describe('Settings page', () => {
  beforeEach(() => {
    axios.get.mockClear()
    axios.put.mockClear()
    axios.get
    .mockImplementation(path => {
      if (path.endsWith('/api/v1/config')) {
        return Promise.resolve(defaultSettingsResult)
      } else if (path.endsWith('/api/v1/profiles/development/features/ssh')) {
        return Promise.resolve(defaultSshAccessResult)
      }
    })
  })

  it('renders the deviceName and network type', async () => {
    const { getAllByText } = render(Settings, {routes})
    await wait(0)

    await waitFor(() => getAllByText(defaultSettings.deviceName))
    await waitFor(() => getAllByText(defaultSettings.holoportos.network))
  })

  // this is skipped until the hpos config update is fixed. See also Settings.vue
  it.skip('handles devicename interactions correctly', async () => {    
    axios.put.mockImplementationOnce(() => Promise.resolve(defaultSettingsResult))

    const newDeviceName = "Sean's HP"

    const { getByLabelText, getByTestId } = render(Settings, {routes})
  
    await waitFor(() => getByTestId('edit-button'))

    const editButton = getByTestId('edit-button')
    fireEvent.click(editButton)

    await wait(0)
    
    const input = getByLabelText('Device Name')
    fireEvent.update(input, 'the wrong device name')

    const cancelButton = getByTestId('cancel-button')
    fireEvent.click(cancelButton)

    await wait(0)  

    // check that cancel doesn't save the device name
    expect(axios.put.mock.calls.length).toEqual(0)    

    fireEvent.click(editButton)

    await wait(0)
    
    fireEvent.update(input, newDeviceName)

    const saveButton = getByTestId('save-button')
    fireEvent.click(saveButton)

    await wait(0)

    // check that save does save the device name
    expect(axios.put.mock.calls[0][1].deviceName).toEqual(newDeviceName)    
  })

  it('saves changes to ssh access', async () => {
    axios.put
      .mockImplementationOnce(() => Promise.resolve({ data: { enabled: true } }))

    axios.delete
      .mockImplementationOnce(() => Promise.resolve({ data: { enabled: false } }))

    const { getByLabelText, getByTestId } = render(Settings, {routes})

    // wait til settings have loaded
    await waitFor(() => getByTestId('edit-button'))

    expect(axios.delete.mock.calls.length).toEqual(0)

    const sshButton = getByLabelText('Access for HoloPort support (SSH)')
    fireEvent.click(sshButton)
    await wait(0)

    // toggles off
    expect(axios.delete.mock.calls[0][0]).toEqual(`${HPOS_API_URL}/api/v1/profiles/development/features/ssh`)
    expect(axios.put.mock.calls.length).toEqual(0)

    fireEvent.click(sshButton)
    await wait(0)

    // toggles back on
    expect(axios.put.mock.calls[0][0]).toEqual(`${HPOS_API_URL}/api/v1/profiles/development/features/ssh`)
  })
})
