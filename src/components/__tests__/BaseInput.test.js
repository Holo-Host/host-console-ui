import { render, fireEvent } from '@testing-library/vue'
import { shallowMount } from '@vue/test-utils'
import BaseInput from '@/components/BaseInput.vue'
import { EInputType } from '@/types/ui'

describe('BaseInput.vue', () => {
  const setup = (props) => {
    return shallowMount(BaseInput, {
      propsData: {
        autocomplete: '',
        autofocus: false,
        isDisabled: false,
        isValid: true,
        inputType: EInputType.text,
        id: '',
        name: '',
        placeholder: '',
        modelValue: '',
        hasErrors: false,
        message: '',
        ...props
      }
    })
  }

  describe('renders in active state', () => {
    const wrapper = setup()

    it('with input wrapper', () => {
      expect(wrapper.findAll('[data-test-base-input-wrapper]')).toHaveLength(1)
    })

    it('without icon', () => {
      expect(wrapper.findAll('[data-test-base-input-icon]')).toHaveLength(0)
    })

    it('with input being enabled', () => {
      expect(wrapper.find('[data-test-base-input-input]').attributes().disabled).not.toEqual('')
    })

    it('with default input type', () => {
      expect(wrapper.find('[data-test-base-input-input]').attributes().type).toEqual(
        EInputType.text
      )
    })

    it('with empty input', () => {
      expect(wrapper.find('[data-test-base-input-input]').text()).toEqual('')
    })

    it('without placeholder', () => {
      expect(wrapper.find('[data-test-base-input-input]').attributes().placeholder).toEqual('')
    })

    it('without invalid class', () => {
      expect(wrapper.find('[data-test-base-input-input]').classes()).not.toContain('invalid')
    })

    it('without errors', () => {
      expect(wrapper.findAll('[data-test-base-input-errors]')).toHaveLength(0)
    })
  })

  describe('renders in disabled state', () => {
    const wrapper = setup({ isDisabled: true })

    it('with input wrapper', () => {
      expect(wrapper.findAll('[data-test-base-input-wrapper]')).toHaveLength(1)
    })

    it('without icon', () => {
      expect(wrapper.findAll('[data-test-base-input-icon]')).toHaveLength(0)
    })

    it('with input being disabled', () => {
      expect(wrapper.find('[data-test-base-input-input]').attributes().disabled).toEqual('')
    })

    it('with default input type', () => {
      expect(wrapper.find('[data-test-base-input-input]').attributes().type).toEqual(
        EInputType.text
      )
    })

    it('with empty input', () => {
      expect(wrapper.find('[data-test-base-input-input]').text()).toEqual('')
    })

    it('without placeholder', () => {
      expect(wrapper.find('[data-test-base-input-input]').attributes().placeholder).toEqual('')
    })

    it('without invalid class', () => {
      expect(wrapper.find('[data-test-base-input-input]').classes()).not.toContain('invalid')
    })

    it('without errors', () => {
      expect(wrapper.findAll('[data-test-base-input-errors]')).toHaveLength(0)
    })
  })

  describe('renders in invalid state', () => {
    const wrapper = setup({ isValid: false })

    it('with input wrapper', () => {
      expect(wrapper.findAll('[data-test-base-input-wrapper]')).toHaveLength(1)
    })

    it('without icon', () => {
      expect(wrapper.findAll('[data-test-base-input-icon]')).toHaveLength(0)
    })

    it('with input being enabled', () => {
      expect(wrapper.find('[data-test-base-input-input]').attributes().disabled).not.toEqual('')
    })

    it('with default input type', () => {
      expect(wrapper.find('[data-test-base-input-input]').attributes().type).toEqual(
        EInputType.text
      )
    })

    it('with empty input', () => {
      expect(wrapper.find('[data-test-base-input-input]').text()).toEqual('')
    })

    it('without placeholder', () => {
      expect(wrapper.find('[data-test-base-input-input]').attributes().placeholder).toEqual('')
    })

    it('with invalid class', () => {
      expect(wrapper.find('[data-test-base-input-input]').classes()).toContain('invalid')
    })

    it('without errors', () => {
      expect(wrapper.findAll('[data-test-base-input-errors]')).toHaveLength(0)
    })
  })

  describe('renders custom type input', () => {
    const wrapper = setup({ inputType: EInputType.password })

    it('with input wrapper', () => {
      expect(wrapper.findAll('[data-test-base-input-wrapper]')).toHaveLength(1)
    })

    it('without icon', () => {
      expect(wrapper.findAll('[data-test-base-input-icon]')).toHaveLength(0)
    })

    it('with input being enabled', () => {
      expect(wrapper.find('[data-test-base-input-input]').attributes().disabled).not.toEqual('')
    })

    it('with custom input type', () => {
      expect(wrapper.find('[data-test-base-input-input]').attributes().type).toEqual(
        EInputType.password
      )
    })

    it('with empty input', () => {
      expect(wrapper.find('[data-test-base-input-input]').text()).toEqual('')
    })

    it('without placeholder', () => {
      expect(wrapper.find('[data-test-base-input-input]').attributes().placeholder).toEqual('')
    })

    it('without invalid class', () => {
      expect(wrapper.find('[data-test-base-input-input]').classes()).not.toContain('invalid')
    })

    it('without errors', () => {
      expect(wrapper.findAll('[data-test-base-input-errors]')).toHaveLength(0)
    })
  })

  describe('renders placeholder when passed as a prop', () => {
    const kPlaceholder = 'My placeholder'
    const wrapper = setup({ placeholder: kPlaceholder })

    it('with input wrapper', () => {
      expect(wrapper.findAll('[data-test-base-input-wrapper]')).toHaveLength(1)
    })

    it('without icon', () => {
      expect(wrapper.findAll('[data-test-base-input-icon]')).toHaveLength(0)
    })

    it('with input being enabled', () => {
      expect(wrapper.find('[data-test-base-input-input]').attributes().disabled).not.toEqual('')
    })

    it('with default input type', () => {
      expect(wrapper.find('[data-test-base-input-input]').attributes().type).toEqual(
        EInputType.text
      )
    })

    it('with empty input', () => {
      expect(wrapper.find('[data-test-base-input-input]').text()).toEqual('')
    })

    it('with placeholder', () => {
      expect(wrapper.find('[data-test-base-input-input]').attributes().placeholder).toEqual(
        kPlaceholder
      )
    })

    it('without invalid class', () => {
      expect(wrapper.find('[data-test-base-input-input]').classes()).not.toContain('invalid')
    })

    it('without errors', () => {
      expect(wrapper.findAll('[data-test-base-input-errors]')).toHaveLength(0)
    })
  })

  describe('renders error message when passed as a prop', () => {
    const kErrorMessage = 'My error'
    const wrapper = setup({ hasErrors: true, message: kErrorMessage })

    it('with input wrapper', () => {
      expect(wrapper.findAll('[data-test-base-input-wrapper]')).toHaveLength(1)
    })

    it('without icon', () => {
      expect(wrapper.findAll('[data-test-base-input-icon]')).toHaveLength(0)
    })

    it('with input being enabled', () => {
      expect(wrapper.find('[data-test-base-input-input]').attributes().disabled).not.toEqual('')
    })

    it('with default input type', () => {
      expect(wrapper.find('[data-test-base-input-input]').attributes().type).toEqual(
        EInputType.text
      )
    })

    it('with empty input', () => {
      expect(wrapper.find('[data-test-base-input-input]').text()).toEqual('')
    })

    it('without placeholder', () => {
      expect(wrapper.find('[data-test-base-input-input]').attributes().placeholder).toEqual('')
    })

    it('without invalid class', () => {
      expect(wrapper.find('[data-test-base-input-input]').classes()).not.toContain('invalid')
    })

    it('with errors', () => {
      expect(wrapper.findAll('[data-test-base-input-errors]')).toHaveLength(1)
    })

    it('with proper error message', () => {
      expect(wrapper.find('[data-test-base-input-errors]').text()).toEqual(kErrorMessage)
    })
  })

  it('emits update:modelValue event when input is changed', async () => {
    const { getByPlaceholderText, emitted } = render(BaseInput, {
      props: {
        placeholder: 'Username'
      }
    })

    const usernameInput = getByPlaceholderText('Username')

    await fireEvent.update(usernameInput, 'Bob')

    expect(emitted()).toHaveProperty('update:modelValue')
  })
})
