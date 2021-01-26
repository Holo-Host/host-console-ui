import axios from 'axios'
import { render, waitFor } from '@testing-library/vue'
import { HPOS_API_URL } from 'src/interfaces/HposInterface'
import Settings from '../Settings.vue'
import wait from 'waait'

jest.mock('axios')

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
    axios.get
    .mockImplementationOnce(() => Promise.resolve(defaultSettingsResult))
  })

  it('renders the deviceName', async () => {
    const { getAllByText } = render(Settings)
  
    await waitFor(() => getAllByText(defaultSettings.name))
  })
})

