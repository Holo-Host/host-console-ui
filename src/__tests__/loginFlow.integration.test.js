require('dotenv').config()
import { mount } from '@vue/test-utils'
import App from '../App.vue'
import wait from 'waait'
import MockHposApi from '../../mock-hpos-api'
import { routerFactory } from '../router'
import { eraseHpAdminKeypair } from '../utils/keyManagement'

describe('Login Flow', () => {
  const email = "test@test.com"
  const password = "passw0rd"

  let mockHposApi, router

  beforeAll(async () => {
    // the +1 in this line depends on the +1 in the definition of HPOS_PORT in HposInterface.js
    mockHposApi = await MockHposApi.start(Number(process.env.VUE_APP_HPOS_PORT) + 1, email, password)
  })  

  afterAll(() => {
    mockHposApi.close()
  })

  beforeEach(async () => {    
    router = routerFactory()
    eraseHpAdminKeypair()
    router.replace('/')
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

    await wait(750)

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

    await wait(750)

    expect(wrapper.text()).toContain('hApps')
  })  

  it("logs you out if you don't have a keypair", async () => {
    const wrapper = mount(App, {
      global: {
        plugins: [router]
      }
    })

    // simulate the state of having been logged in in a previous session and then starting a new session on an authed page
    // eg when refreshing an authed page
    localStorage.setItem('isAuthed', 'true')

    router.replace('/happs')

    await wait(750)

    expect(wrapper.text()).toContain('Login to Host Console')
  })  
})

