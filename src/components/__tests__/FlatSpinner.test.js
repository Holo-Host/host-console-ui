import { mount } from '@vue/test-utils'
import FlatSpinner from '@/components/FlatSpinner.vue'

describe('FlatSpinner', () => {
  const setup = (props) => {
    return mount(FlatSpinner, {
      propsData: {
        scale: 1,
        ...props
      }
    })
  }

  describe('renders', () => {
    const wrapper = setup()

    it('with wrapper', () => {
      expect(wrapper.findAll('[data-test-flat-spinner-wrapper]')).toHaveLength(1)
    })

    it('with loader wrapper', () => {
      expect(wrapper.findAll('[data-test-flat-spinner-loader-wrapper]')).toHaveLength(1)
    })

    it('with loader', () => {
      expect(wrapper.findAll('[data-test-flat-spinner-loader-wrapper]')).toHaveLength(1)
    })

    it('with proper spinner scale style', () => {
      expect(wrapper.find('[data-test-flat-spinner-loader-wrapper]').attributes().style).toContain(
        'transform: scale(1);'
      )
    })

    it('with proper loader color class', () => {
      expect(wrapper.find('[data-test-flat-spinner-loader]').classes()).toContain('primary')
    })
  })

  describe('renders with custom scale', () => {
    const wrapper = setup({ scale: 0.5 })

    it('with wrapper', () => {
      expect(wrapper.findAll('[data-test-flat-spinner-wrapper]')).toHaveLength(1)
    })

    it('with loader wrapper', () => {
      expect(wrapper.findAll('[data-test-flat-spinner-loader-wrapper]')).toHaveLength(1)
    })

    it('with loader', () => {
      expect(wrapper.findAll('[data-test-flat-spinner-loader-wrapper]')).toHaveLength(1)
    })

    it('with proper spinner scale style', () => {
      expect(wrapper.find('[data-test-flat-spinner-loader-wrapper]').attributes().style).toContain(
        'transform: scale(0.5);'
      )
    })

    it('with proper loader color class', () => {
      expect(wrapper.find('[data-test-flat-spinner-loader]').classes()).toContain('primary')
    })
  })

  describe('renders with secondary color', () => {
    const wrapper = setup({ color: 'secondary' })

    it('with wrapper', () => {
      expect(wrapper.findAll('[data-test-flat-spinner-wrapper]')).toHaveLength(1)
    })

    it('with loader wrapper', () => {
      expect(wrapper.findAll('[data-test-flat-spinner-loader-wrapper]')).toHaveLength(1)
    })

    it('with loader', () => {
      expect(wrapper.findAll('[data-test-flat-spinner-loader-wrapper]')).toHaveLength(1)
    })

    it('with proper spinner scale style', () => {
      expect(wrapper.find('[data-test-flat-spinner-loader-wrapper]').attributes().style).toContain(
        'transform: scale(1);'
      )
    })

    it('with proper loader color class', () => {
      expect(wrapper.find('[data-test-flat-spinner-loader]').classes()).toContain('secondary')
    })
  })

  describe('renders with white color', () => {
    const wrapper = setup({ color: 'white' })

    it('with wrapper', () => {
      expect(wrapper.findAll('[data-test-flat-spinner-wrapper]')).toHaveLength(1)
    })

    it('with loader wrapper', () => {
      expect(wrapper.findAll('[data-test-flat-spinner-loader-wrapper]')).toHaveLength(1)
    })

    it('with loader', () => {
      expect(wrapper.findAll('[data-test-flat-spinner-loader-wrapper]')).toHaveLength(1)
    })

    it('with proper spinner scale style', () => {
      expect(wrapper.find('[data-test-flat-spinner-loader-wrapper]').attributes().style).toContain(
        'transform: scale(1);'
      )
    })

    it('with proper loader color class', () => {
      expect(wrapper.find('[data-test-flat-spinner-loader]').classes()).toContain('white')
    })
  })
})
