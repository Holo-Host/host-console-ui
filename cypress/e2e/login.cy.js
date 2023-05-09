const validPassword = 'password'
const invalidPassword = '2shrt'

const validEmail = 'test@test.com'
const invalidEmail = 'invalidemail'

describe('login', () => {
  context('initial render', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173')
    })

    it('renders error banner', () => {
      cy.get('[data-test-login-page-error-banner]').should('have.length', 1)
    })

    it('renders login form', () => {
      cy.get('[data-test-login-page-form]').should('have.length', 1)
    })

    it('renders title', () => {
      cy.get('[data-test-login-page-form-title]').should('have.length', 1)
    })

    it('renders subtitle', () => {
      cy.get('[data-test-login-page-form-subtitle]').should('have.length', 1)
    })

    it('renders email input', () => {
      // Two because child input inherits the data-test-selector
      cy.get('[data-test-login-page-form-email-input]').should('have.length', 2)
    })

    it('renders password input', () => {
      // Two because child input inherits the data-test-selector
      cy.get('[data-test-login-page-form-password-input]').should('have.length', 2)
    })

    it('renders submit button', () => {
      cy.get('[data-test-login-page-form-submit-button]').should('have.length', 1)
    })

    it('renders footer', () => {
      cy.get('[data-test-login-page-footer]').should('have.length', 1)
    })
  })

  context('login button', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173')
    })

    it('shows login button as disabled when no inputs provided', () => {
      cy.get('[data-test-login-page-form-submit-button]').should('have.attr', 'disabled')
    })

    it('shows login button as disabled when only email is provided',  () => {
      cy.get('[data-test-login-page-form-email-input] [data-test-base-input-input]').type(validEmail)
      cy.get('[data-test-login-page-form-submit-button]').should('have.attr', 'disabled')
    })

    it('shows login button as disabled when only password is provided',  () => {
      cy.get('[data-test-login-page-form-password-input] [data-test-base-input-input]').type(validPassword)
      cy.get('[data-test-login-page-form-submit-button]').should('have.attr', 'disabled')
    })

    it('shows login button as enabled when email and password is provided',  () => {
      cy.get('[data-test-login-page-form-email-input] [data-test-base-input-input]').type(validEmail)
      cy.get('[data-test-login-page-form-password-input] [data-test-base-input-input]').type(validPassword)
      cy.get('[data-test-login-page-form-submit-button]').should('not.have.attr', 'disabled')
    })
  })

  context('error state', () => {
    beforeEach(() => {
      cy.visit('http://localhost:5173')
    })

    it('shows an error when bad email was given', () => {
      cy.get('[data-test-login-page-form-email-input] [data-test-base-input-input]').type(invalidEmail)
      cy.get('[data-test-login-page-form-password-input] [data-test-base-input-input]').type(validPassword)

      cy.get('[data-test-login-page-form-submit-button]').click()

      cy.get('[data-test-login-page-form-email-input] [data-test-base-input-errors]').should('have.length', 1)
      cy.get('[data-test-login-page-form-email-input] [data-test-base-input-errors]').should('have.text', ' Please enter a valid email.')
    })

    it('shows an error when bad password was given', () => {
      cy.get('[data-test-login-page-form-email-input] [data-test-base-input-input]').type(validEmail)
      cy.get('[data-test-login-page-form-password-input] [data-test-base-input-input]').type(invalidPassword)

      cy.get('[data-test-login-page-form-submit-button]').click()

      cy.get('[data-test-login-page-form-password-input] [data-test-base-input-errors]').should('have.length', 1)
      cy.get('[data-test-login-page-form-password-input] [data-test-base-input-errors]').should('have.text', ' Password must have at least 6 characters.')
    })

    it('does not show an error when valid email and password was given',  () => {
      cy.get('[data-test-login-page-form-email-input] [data-test-base-input-input]').type(validEmail)
      cy.get('[data-test-login-page-form-password-input] [data-test-base-input-input]').type(validPassword)

      cy.get('[data-test-login-page-form-submit-button]').click()

      cy.get('[data-test-login-page-form-email-input] [data-test-base-input-errors]').should('have.length', 0)
      cy.get('[data-test-login-page-form-password-input] [data-test-base-input-errors]').should('have.length', 0)
    })
  })

})
