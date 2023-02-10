/* eslint-disable @typescript-eslint/no-magic-numbers */

import { createTestingPinia } from '@pinia/testing'
import { mount, VueWrapper } from '@vue/test-utils'
import { expect, describe, it, vi } from 'vitest'
import { createI18n } from 'vue-i18n'
import { createRouter, createWebHistory } from 'vue-router'
import TopNav from '../TopNav.vue'
import { messages } from '@/locales'
import { kRoutes } from '@/router'

const clickOutside = vi.fn()

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

describe('TopNav', () => {
  const setup = (props?: Record<string, unknown>): VueWrapper<any> => {
    return mount(TopNav, {
      global: {
        plugins: [
          i18n,
          router,
          createTestingPinia({
            createSpy() {
              return async () => {
                return Promise.resolve()
              }
            }
          })
        ],
        directives: {
          clickOutside
        }
      },
      propsData: {
        breadcrumbs: [{ label: 'A page title', path: '/' }, { label: 'A page subtitle' }],
        displayName: 'Geralt of Rivia',
        publicKey: 'QWERty123456789',
        nickname: 'White Wolf',
        agentAddress: new Uint8Array([
          132, 32, 36, 157, 32, 140, 24, 241, 10, 28, 222, 179, 158, 62, 209, 80, 229, 227, 114,
          241, 62, 210, 166, 100, 55, 151, 238, 176, 36, 80, 111, 82, 43, 225, 83, 139, 240, 203,
          176
        ]),
        ...props
      }
    })
  }

  describe('renders', (): void => {
    const wrapper = setup()

    it('with top nav section', () => {
      expect(wrapper.findAll('[data-test-top-nav]')).toHaveLength(1)
    })

    it('with main title without link', () => {
      expect(wrapper.findAll('[data-test-top-nav-title]')).toHaveLength(0)
    })

    it('with main title with link', () => {
      expect(wrapper.findAll('[data-test-top-nav-link]')).toHaveLength(1)
    })

    it('with subtitle', () => {
      expect(wrapper.findAll('[data-test-top-nav-subtitle]')).toHaveLength(1)
    })

    it('with menu', () => {
      expect(wrapper.findAll('[data-test-top-nav-menu]')).toHaveLength(1)
    })

    it('with alpha flag', () => {
      expect(wrapper.findAll('[data-test-top-nav-alpha-flag]')).toHaveLength(1)
    })
  })

  describe('renders when path is not passed in the breadcrumb', (): void => {
    const wrapper = setup({
      breadcrumbs: [{ label: 'A page title' }, { label: 'A page subtitle' }]
    })

    it('with top nav section', () => {
      expect(wrapper.findAll('[data-test-top-nav]')).toHaveLength(1)
    })

    it('with main title', () => {
      expect(wrapper.findAll('[data-test-top-nav-title]')).toHaveLength(1)
    })

    it('without router link', () => {
      expect(wrapper.findAll('[data-test-top-nav-link]')).toHaveLength(0)
    })

    it('with subtitle', () => {
      expect(wrapper.findAll('[data-test-top-nav-subtitle]')).toHaveLength(1)
    })

    it('with menu', () => {
      expect(wrapper.findAll('[data-test-top-nav-menu]')).toHaveLength(1)
    })

    it('with alpha flag', () => {
      expect(wrapper.findAll('[data-test-top-nav-alpha-flag]')).toHaveLength(1)
    })
  })

  describe('renders when single breadcrumb is passed', (): void => {
    const wrapper = setup({
      breadcrumbs: [{ label: 'A page title', path: '/' }]
    })

    it('with top nav section', () => {
      expect(wrapper.findAll('[data-test-top-nav]')).toHaveLength(1)
    })

    it('with main title', () => {
      expect(wrapper.findAll('[data-test-top-nav-title]')).toHaveLength(0)
    })

    it('with router link', () => {
      expect(wrapper.findAll('[data-test-top-nav-link]')).toHaveLength(1)
    })

    it('without subtitle', () => {
      expect(wrapper.findAll('[data-test-top-nav-subtitle]')).toHaveLength(0)
    })

    it('with menu', () => {
      expect(wrapper.findAll('[data-test-top-nav-menu]')).toHaveLength(1)
    })

    it('with alpha flag', () => {
      expect(wrapper.findAll('[data-test-top-nav-alpha-flag]')).toHaveLength(1)
    })
  })
})

/* eslint-enable @typescript-eslint/no-magic-numbers */
