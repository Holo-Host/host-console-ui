require('dotenv').config()
import { mount } from '@vue/test-utils'
import App from '../App.vue'
import wait from 'waait'
import MockHposApi from '../../mock-hpos-api'
import router from '../router'

describe('Login Flow', () => {
  const email = "test@test.com"
  const password = "passw0rd"

  let mockHposApi

  beforeAll(async () => {
    mockHposApi = await MockHposApi.start(Number(process.env.VUE_APP_HPOS_PORT) + 1, email, password)
  })  

  afterAll(() => {
    mockHposApi.close()
  })

  beforeEach(async () => {
    router.push('/')
    await router.isReady()
  })

  it('prevents login with incorrect credentials', async () => {
    const wrongEmail = 'wrong@email.com'
    const wrongPassword ='asdfgh'

    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })

    const emailField = wrapper.find('input[type="email"]')
    emailField.setValue(wrongEmail)

    const passwordField = wrapper.find('input[type="password"]')
    passwordField.setValue(wrongPassword)

    const loginButton = wrapper.find('.login-button')

    loginButton.trigger('click')

    await wait(2000)

    expect(wrapper.text()).toContain('There was a problem logging you in. Please check your credentials and try again.')
  })

  it('logs in and redirects to hApps page with correct credentials', async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })

    const emailField = wrapper.find('input[type="email"]')
    emailField.setValue(email)

    const passwordField = wrapper.find('input[type="password"]')
    passwordField.setValue(password)

    const loginButton = wrapper.find('.login-button')

    loginButton.trigger('click')

    await wait(2000)

    expect(wrapper.text()).toContain('hApps')
  })  
})

