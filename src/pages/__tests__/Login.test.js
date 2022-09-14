// @testing-library/vue has not caught up all features of Vue 3 yet, specifically their support for tests involving routing
// is not there. So while waiting for them, I'm using '@vue/test-utils' for routing tests.
import { createTestingPinia } from '@pinia/testing'
import { render, waitFor, fireEvent } from '@testing-library/vue'
import { mount } from '@vue/test-utils'
import { kRoutes } from 'src/router'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'
import wait from 'waait'
import Login from '../LoginPage.vue'
import HposInterface from '@/interfaces/HposInterface'
import locales from '@/locales'

const i18n = createI18n({
  legacy: true,
  locale: 'en',
  messages: locales
})

const router = createRouter({
  history: createWebHistory(),
  routes: [
    kRoutes.accountSettings,
    kRoutes.dashboard,
    kRoutes.default,
    kRoutes.earnings,
    kRoutes.happ,
    kRoutes.happs,
    kRoutes.hostingPreferences,
    kRoutes.invoices,
    kRoutes.login
  ]
})

const validPassword = 'password'
const invalidPassword = '2shrt'

const validEmail = 'test@test.com'
const invalidEmail = 'invalidemail'

jest.mock('src/interfaces/HposInterface')

it('shows a login button as disabled when no inputs provided', () => {
  const { getByText } = render(Login, {
    global: { plugins: [router, i18n, createTestingPinia()] }
  })
  const loginButton = getByText('Login').closest('button')
  expect(loginButton).toHaveProperty('disabled', true)
})

it('shows a login button as disabled when only email is provided', async () => {
  const { getByText, getByLabelText } = render(Login, {
    global: { plugins: [router, i18n, createTestingPinia()] }
  })

  const emailField = getByLabelText('Email:')
  await fireEvent.update(emailField, validEmail)

  const loginButton = getByText('Login').closest('button')
  expect(loginButton).toHaveProperty('disabled', true)
})

it('shows a login button as disabled when only password is provided', async () => {
  const { getByText, getByLabelText } = render(Login, {
    global: { plugins: [router, i18n, createTestingPinia()] }
  })

  const passwordField = getByLabelText('Password:')
  await fireEvent.update(passwordField, validPassword)

  const loginButton = getByText('Login').closest('button')
  expect(loginButton).toHaveProperty('disabled', true)
})

it('shows an error when given a bad email', async () => {
  const { getByLabelText, getByText } = render(Login, {
    global: { plugins: [router, i18n, createTestingPinia()] }
  })

  const emailField = getByLabelText('Email:')
  await fireEvent.update(emailField, invalidEmail)

  const passwordField = getByLabelText('Password:')
  await fireEvent.update(passwordField, validPassword)

  const loginButton = getByText('Login')
  await fireEvent.click(loginButton)

  await waitFor(() => getByText('Please enter a valid email.'))
})

it('shows an error when given a bad password', async () => {
  const { getByLabelText, getByText } = render(Login, {
    global: { plugins: [router, i18n, createTestingPinia()] }
  })

  const emailField = getByLabelText('Email:')
  await fireEvent.update(emailField, validEmail)

  const passwordField = getByLabelText('Password:')
  await fireEvent.update(passwordField, invalidPassword)

  const loginButton = getByText('Login')
  await fireEvent.click(loginButton)

  await waitFor(() => getByText('Password must have at least 6 characters.'))
})

// skipping flakey tests for now. This is tracked on the board as tech debt
it.skip('sets local storage and pushes the happs route on login', async () => {
  const email = 'good@email.com'
  const password = 'agoodpassword'

  const mockRoute = {
    params: {
      nextUrl: null
    }
  }
  const mockRouter = {
    push: jest.fn()
  }

  HposInterface.getUser.mockImplementationOnce(() => Promise.resolve(true))

  const wrapper = mount(Login, {
    global: {
      mocks: {
        $route: mockRoute,
        $router: mockRouter
      }
    }
  })

  const emailField = wrapper.find('input[type="email"]')
  await emailField.setValue(email)

  const passwordField = wrapper.find('input[type="password"]')
  await passwordField.setValue(password)

  const loginButton = wrapper.find('.login-button')

  await loginButton.trigger('click')

  // eslint-disable-next-line no-magic-numbers
  await wait(1000)

  expect(mockRouter.push).toHaveBeenCalledWith('/happs')
  expect(localStorage.getItem('isAuthed')).toEqual('true')
})
