import { shallowMount } from '@vue/test-utils'
import BaseButton from '@/components/BaseButton.vue'
import { EButtonType, ESpinnerSize } from '@/types/ui'

describe('BaseButton.vue', () => {
  const setup = (props) => {
    return shallowMount(BaseButton, {
      propsData: {
        type: EButtonType.primary,
        isDisabled: false,
        isBusy: false,
        spinnerSize: ESpinnerSize.none,
        title: '',
        ...props
      }
    })
  }

  describe('renders in active state', () => {
    const wrapper = setup()

    it('with button wrapper', () => {
      expect(wrapper.findAll('[data-test-base-button-wrapper]')).toHaveLength(1)
    })

    it('with button wrapper not having disabled attribute', () => {
      expect(wrapper.find('[data-test-base-button-wrapper]').attributes().disabled).toBeFalsy()
    })

    it('without spinner', () => {
      expect(wrapper.findAll('[data-test-base-button-spinner]')).toHaveLength(0)
    })

    it('with button content', () => {
      expect(wrapper.findAll('[data-test-base-button-content-wrapper]')).toHaveLength(1)
      expect(wrapper.findAll('[data-test-base-button-default-slot-content]')).toHaveLength(1)
    })

    it('with button content having default slot content', () => {
      expect(wrapper.findAll('[data-test-base-button-content-wrapper]')).toHaveLength(1)
      expect(wrapper.findAll('[data-test-base-button-default-slot-content]')).toHaveLength(1)
    })
  })

  describe('renders in disabled state', () => {
    const wrapper = setup({ isDisabled: true })

    it('with button wrapper having disabled attribute', () => {
      expect(wrapper.findAll('[data-test-base-button-wrapper]')).toHaveLength(1)
      expect(wrapper.find('[data-test-base-button-wrapper]').attributes().disabled).toContain('')
    })

    it('without spinner', () => {
      expect(wrapper.findAll('[data-test-base-button-spinner]')).toHaveLength(0)
    })

    it('with button content', () => {
      expect(wrapper.findAll('[data-test-base-button-content-wrapper]')).toHaveLength(1)
      expect(wrapper.findAll('[data-test-base-button-default-slot-content]')).toHaveLength(1)
    })

    it('with button content having default slot content', () => {
      expect(wrapper.findAll('[data-test-base-button-content-wrapper]')).toHaveLength(1)
      expect(wrapper.findAll('[data-test-base-button-default-slot-content]')).toHaveLength(1)
    })
  })

  describe('renders in busy state', () => {
    const wrapper = setup({ isBusy: true, spinnerSize: ESpinnerSize.small })

    it('with button wrapper not having disabled attribute', () => {
      expect(wrapper.find('[data-test-base-button-wrapper]').attributes().disabled).toBeFalsy()
    })

    it('with spinner', () => {
      expect(wrapper.findAll('[data-test-base-button-spinner]')).toHaveLength(1)
    })

    it('with button content', () => {
      expect(wrapper.findAll('[data-test-base-button-content-wrapper]')).toHaveLength(1)
      expect(wrapper.findAll('[data-test-base-button-default-slot-content]')).toHaveLength(1)
    })

    it('with button content having default slot content', () => {
      expect(wrapper.findAll('[data-test-base-button-content-wrapper]')).toHaveLength(1)
      expect(wrapper.findAll('[data-test-base-button-default-slot-content]')).toHaveLength(1)
    })
  })

  describe('click event', () => {
    it('emits click event on click when enabled', async () => {
      const wrapper = setup()

      await wrapper.find('[data-test-base-button-wrapper]').trigger('click')
      expect(wrapper.emitted('click')).toBeTruthy()
    })

    it('does not emit click event on click when disabled', async () => {
      const wrapper = setup({ isDisabled: true })

      await wrapper.find('[data-test-base-button-wrapper]').trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })

    it('does not emit click event on click when busy', async () => {
      const wrapper = setup({ isBusy: true })

      await wrapper.find('[data-test-base-button-wrapper]').trigger('click')
      expect(wrapper.emitted('click')).toBeFalsy()
    })
  })

  describe('spinner sizes', () => {
    it('without spinner when size is ESpinnerSize.none', () => {
      const wrapper = setup({ isBusy: true, spinnerSize: ESpinnerSize.none })

      expect(wrapper.findAll('[data-test-base-button-spinner]')).toHaveLength(0)
    })

    it('without small spinner when size is ESpinnerSize.small', () => {
      const wrapper = setup({ isBusy: true, spinnerSize: ESpinnerSize.small })

      expect(wrapper.findAll('[data-test-base-button-spinner]')).toHaveLength(1)
    })
  })

  describe('title', () => {
    it('renders no title when no title is passed', () => {
      const wrapper = setup()

      expect(wrapper.findAll('[data-test-base-button-content-wrapper]')).toHaveLength(1)
      expect(wrapper.findAll('[data-test-base-button-default-slot-content]')).toHaveLength(1)
      expect(wrapper.find('[data-test-base-button-default-slot-content]').text()).toContain('')
    })

    it('renders title when title is passed', () => {
      const wrapper = setup({ title: 'My button' })

      expect(wrapper.findAll('[data-test-base-button-content-wrapper]')).toHaveLength(1)
      expect(wrapper.findAll('[data-test-base-button-default-slot-content]')).toHaveLength(1)
      expect(wrapper.find('[data-test-base-button-default-slot-content]').text()).toContain(
        'My button'
      )
    })
  })
})
