import { mount } from '@vue/test-utils'
import Login from '../Login.vue'

it('shows an error when given a bad email', async () => {
  const email = 'invalidemail'
  const wrapper = mount(Login)

  const emailField = wrapper.find('input[type="email"]')
  emailField.setValue(email)

  await wrapper.find('form').trigger('submit.prevent')

  expect(wrapper.text()).toContain('Please enter a valid email.')
})

it('shows an error when given a bad password', async () => {
  const password = '2shrt'
  const wrapper = mount(Login)

  const passwordField = wrapper.find('input[type="password"]')
  passwordField.setValue(password)

  await wrapper.find('form').trigger('submit.prevent')

  expect(wrapper.text()).toContain('Password must have at least 6 characters.')
})

it.only('sets local storage and pushes the happs route on login', async (done) => {
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

  await wrapper.find('form').trigger('submit.prevent')

  wrapper.vm.$nextTick(() => {
    expect(mockRouter.push).toHaveBeenCalledWith('/happs')
    expect(localStorage.getItem('auth_token')).toEqual('true')
    done()
  })
})

