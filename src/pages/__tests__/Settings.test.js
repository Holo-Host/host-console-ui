import axios from 'axios'
import { render, waitFor, fireEvent } from '@testing-library/vue'
import { HPOS_API_URL } from 'src/interfaces/HposInterface'
import Settings from '../Settings.vue'
import wait from 'waait'

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
  name: "Lana Wilson's HP"
}

const defaultSettingsResult = {
  data: defaultSettings
}

describe('Settings page', () => {
  beforeEach(() => {
    axios.get.mockClear()
    axios.put.mockClear()
    axios.get
    .mockImplementation(() => Promise.resolve(defaultSettingsResult))
  })

  it('renders the deviceName and network type', async () => {
    const { getAllByText } = render(Settings)
  
    await waitFor(() => getAllByText(defaultSettings.name))
    await waitFor(() => getAllByText(defaultSettings.holoportos.network))
  })

  it('handles devicename interactions correctly', async () => {
    axios.put.mockImplementationOnce(() => Promise.resolve(defaultSettingsResult))

    const newDeviceName = "Sean's HP"

    const { getByLabelText, getByTestId } = render(Settings)
  
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
    expect(axios.put.mock.calls[0][1].name).toEqual(newDeviceName)    
  })

  it('saves changes to ssh access', async () => {
    axios.put
      .mockImplementationOnce(() => Promise.resolve(defaultSettingsResult))
      .mockImplementationOnce(() => Promise.resolve(defaultSettingsResult))

    const { getByLabelText, getByTestId } = render(Settings)

    // wait til settings have loaded
    await waitFor(() => getByTestId('edit-button'))

    const sshButton = getByLabelText('Access for HoloPort support (SSH)')
    fireEvent.click(sshButton)
    await wait(0)

    // toggles off
    expect(axios.put.mock.calls[0][1].holoportos.sshAccess).toEqual(!defaultSettings.holoportos.sshAccess)

    fireEvent.click(sshButton)
    await wait(0)

    // toggles back on
    expect(axios.put.mock.calls[1][1].holoportos.sshAccess).toEqual(defaultSettings.holoportos.sshAccess)
  })
})
