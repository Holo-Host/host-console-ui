// @testing-library/vue has not caught up all features of Vue 3 yet, specifically their support for tests involving routing
// is not there. So while waiting for them, I'm using '@vue/test-utils' for routing tests.
import { render, waitFor, fireEvent } from '@testing-library/vue'
import { mount } from '@vue/test-utils'
import Login from '../Login.vue'
import HposInterface from 'src/interfaces/HposInterface'
import wait from 'waait'

jest.mock('src/interfaces/HposInterface')

it('shows an error when given a bad email', async () => {
  const email = 'invalidemail'
  const { getByLabelText, getByText } = render(Login)

  const emailField = getByLabelText('Email:')
  fireEvent.update(emailField, email)

  const loginButton = getByText('Login')
  fireEvent.click(loginButton)

  await waitFor(() => getByText('Please enter a valid email.'))
})

it('shows an error when given a bad password', async () => {
  const password = '2shrt'
  const { getByLabelText, getByText } = render(Login)

  const passwordField = getByLabelText('Password:')
  fireEvent.update(passwordField, password)

  const loginButton = getByText('Login')
  fireEvent.click(loginButton)

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

  HposInterface.checkAuth.mockImplementationOnce(() => Promise.resolve(true))

  const wrapper = mount(Login, {
    global: {
      mocks: {
        $route: mockRoute,
        $router: mockRouter
      }
    }
  })

  const emailField = wrapper.find('input[type="email"]')
  emailField.setValue(email)

  const passwordField = wrapper.find('input[type="password"]')
  passwordField.setValue(password)

  const loginButton = wrapper.find('.login-button')

  loginButton.trigger('click')

  await wait(1000)

  expect(mockRouter.push).toHaveBeenCalledWith('/happs')
  expect(localStorage.getItem('isAuthed')).toEqual('true')
})
