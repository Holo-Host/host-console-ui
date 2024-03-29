import { shallowMount } from '@vue/test-utils'
import MockHposApi from '../../mock-hpos-api'
import App from '../App.vue'
import { routerFactory } from '../router'
import { eraseHpAdminKeypair } from '../utils/keyManagement'
require('dotenv').config()
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'

Object.defineProperty(global, 'crypto', {
  value: {
    subtle: {
      digest: () => Promise.resolve('unchecked string')
    }
  }
})

describe.skip('Login Flow', () => {
  const email = 'test@test.com'
  const password = 'passw0rd'

  let mockHposApi, router

  beforeAll(async () => {
    if (!import.meta.env.VITE_HPOS_PORT) {
      throw new Error(
        'VITE_HPOS_PORT env variable is undefined. Please provide a .env file or otherwise define it. See .env.example'
      )
    }

    // the +1 in this line depends on the +1 in the definition of HPOS_PORT in HposInterface.ts
    mockHposApi = await MockHposApi.start(
      Number(import.meta.env.VITE_HPOS_PORT) + 1,
      email,
      password
    )
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
    const wrongPassword = 'asdfgh'

    const wrapper = shallowMount(App, {
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

    expect(wrapper.find('.banner').text()).toContain(
      'There was a problem logging you in. Please check your credentials and try again.'
    )
  })

  it("logs you out if you don't have a keypair", async () => {
    const wrapper = shallowMount(App, {
      global: {
        plugins: [router]
      }
    })

    // simulate the state of having been logged in in a previous session and then starting a new session on an authed page
    // eg when refreshing an authed page
    localStorage.setItem('isAuthed', 'true')

    router.replace('/happs')

    expect(wrapper.find('.container').text()).toContain('Login to Host Console')
  })

  it('logs in and redirects to hApps page with correct credentials', async () => {
    const wrapper = shallowMount(App, {
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

    expect(wrapper.text()).toContain('Dashboard')
  })
})
