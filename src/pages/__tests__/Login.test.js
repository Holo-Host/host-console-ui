import { createTestingPinia } from '@pinia/testing'
import { mount } from '@vue/test-utils'
import { kRoutes } from '@/router'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'
import Login from '../LoginPage.vue'
import messages from '@/locales'
import { expect, describe, it, vi } from 'vitest'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages
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
    kRoutes.paidInvoices,
    kRoutes.unpaidInvoices,
    kRoutes.login
  ]
})

const validPassword = 'password'
const invalidPassword = '2shrt'

const validEmail = 'test@test.com'
const invalidEmail = 'invalidemail'

vi.mock('src/interfaces/HposInterface')

describe('login page', () => {
  const setup = () => {
    return mount(Login, {
      global: {
        plugins: [
          i18n,
          router,
          createTestingPinia({
            createSpy() {
              return () => {
                return Promise.resolve()
              }
            }
          })
        ]
      }
    })
  }

  describe('initial render', async () => {
    const wrapper = setup()

    it('renders error banner', () => {
      expect(wrapper.findAll('[data-test-login-page-error-banner]')).toHaveLength(1)
    })

    it('renders login form', () => {
      expect(wrapper.findAll('[data-test-login-page-form]')).toHaveLength(1)
    })

    it('renders title', () => {
      expect(wrapper.findAll('[data-test-login-page-form-title]')).toHaveLength(1)
    })

    it('renders subtitle', () => {
      expect(wrapper.findAll('[data-test-login-page-form-subtitle]')).toHaveLength(1)
    })

    it('renders email input', () => {
      expect(wrapper.find('[data-test-login-page-form-email-input]')).to.exist
    })

    it('renders password input', () => {
      expect(wrapper.find('[data-test-login-page-form-password-input]')).to.exist
    })

    it('renders submit button', () => {
      expect(wrapper.findAll('[data-test-login-page-form-submit-button]')).toHaveLength(1)
    })

    it('renders footer', () => {
      expect(wrapper.findAll('[data-test-login-page-footer]')).toHaveLength(1)
    })
  })

  describe('login button', async () => {
    it('shows login button as disabled when no inputs provided', () => {
      const wrapper = setup()

      expect(wrapper.findAll('[data-test-login-page-form-submit-button]')).toHaveLength(1)
      const button = wrapper.find('[data-test-login-page-form-submit-button]')

      expect(button.attributes().disabled).toContain('')
    })

    it('shows login button as disabled when only email is provided', async () => {
      const wrapper = setup()

      const emailInput = wrapper.find('[data-test-login-page-form-email-input] [data-test-base-input-input]')
      await emailInput.setValue(validEmail)

      const button = wrapper.find('[data-test-login-page-form-submit-button]')

      expect(button.attributes().disabled).toContain('')
    })

    it('shows login button as disabled when only password is provided', async () => {
      const wrapper = setup()

      const passwordInput = wrapper.find('[data-test-login-page-form-password-input] [data-test-base-input-input]')
      await passwordInput.setValue(validPassword)

      const button = wrapper.find('[data-test-login-page-form-submit-button]')

      expect(button.attributes().disabled).toContain('')
    })

    it('shows login button as enabled when email and password is provided', async () => {
      const wrapper = setup()

      const emailInput = wrapper.find('[data-test-login-page-form-email-input] [data-test-base-input-input]')
      await emailInput.setValue(validEmail)
      const passwordInput = wrapper.find('[data-test-login-page-form-password-input] [data-test-base-input-input]')
      await passwordInput.setValue(validPassword)

      const button = wrapper.find('[data-test-login-page-form-submit-button]')

      expect(button.attributes().disabled).toBeFalsy()
    })
  })

  describe('error state', async () => {
    it('shows an error when bad email was given', async () => {
      const wrapper = setup()

      const emailInput = wrapper.find('[data-test-login-page-form-email-input] [data-test-base-input-input]')
      await emailInput.setValue(invalidEmail)
      const passwordInput = wrapper.find('[data-test-login-page-form-password-input] [data-test-base-input-input]')
      await passwordInput.setValue(validPassword)

      const button = wrapper.find('[data-test-login-page-form-submit-button]')
      await button.trigger('click')

      expect(wrapper.findAll('[data-test-login-page-form-email-input] [data-test-base-input-errors]')).toHaveLength(1)
      expect(wrapper.find('[data-test-login-page-form-email-input] [data-test-base-input-errors]').text()).toContain('Please enter a valid email.')
    })

    it('shows an error when bad password was given', async () => {
      const wrapper = setup()

      const emailInput = wrapper.find('[data-test-login-page-form-email-input] [data-test-base-input-input]')
      await emailInput.setValue(validEmail)
      const passwordInput = wrapper.find('[data-test-login-page-form-password-input] [data-test-base-input-input]')
      await passwordInput.setValue(invalidPassword)

      const button = wrapper.find('[data-test-login-page-form-submit-button]')
      await button.trigger('click')

      expect(wrapper.findAll('[data-test-login-page-form-password-input] [data-test-base-input-errors]')).toHaveLength(1)
      expect(wrapper.find('[data-test-login-page-form-password-input] [data-test-base-input-errors]').text()).toContain('Password must have at least 6 characters.')
    })

    it('does not show an error when valid email and password was given', async () => {
      const wrapper = setup()

      const emailInput = wrapper.find('[data-test-login-page-form-email-input] [data-test-base-input-input]')
      await emailInput.setValue(validEmail)
      const passwordInput = wrapper.find('[data-test-login-page-form-password-input] [data-test-base-input-input]')
      await passwordInput.setValue(validPassword)

      const button = wrapper.find('[data-test-login-page-form-submit-button]')
      await button.trigger('click')

      expect(wrapper.findAll('[data-test-login-page-form-email-input] [data-test-base-input-errors]')).toHaveLength(1)
      expect(wrapper.find('[data-test-login-page-form-email-input] [data-test-base-input-errors]').text()).toContain('')

      expect(wrapper.findAll('[data-test-login-page-form-password-input] [data-test-base-input-errors]')).toHaveLength(1)
      expect(wrapper.find('[data-test-login-page-form-password-input] [data-test-base-input-errors]').text()).toContain('')
    })
  })
})
