import BaseLoginInput from '@/components/BaseLoginInput.vue'
import { EInputType } from '@/types/ui'

export default {
  title: 'BaseLoginInput',
  component: BaseLoginInput,

  argTypes: {
    autocomplete: '',
    autofocus: false,
    isDisabled: false,
    isValid: true,
    inputType: {
      options: [
        EInputType.text,
        EInputType.email,
        EInputType.url,
        EInputType.password,
        EInputType.number,
        EInputType.tel
      ]
    },
    id: '',
    name: '',
    placeholder: '',
    modelValue: '',
    label: '',
    hasErrors: false,
    message: ''
  }
}

const kTemplate = (args) => ({
  components: { BaseLoginInput },
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<BaseLoginInput v-bind="args" />'
})

export const Default = kTemplate.bind({})
Default.args = {
  autocomplete: '',
  autofocus: false,
  isDisabled: false,
  isValid: true,
  inputType: EInputType.text,
  id: '',
  name: '',
  placeholder: '',
  modelValue: '',
  label: '',
  hasErrors: false,
  message: ''
}

export const WithPlaceholder = kTemplate.bind({})
WithPlaceholder.args = {
  ...Default.args,
  placeholder: 'This is a placeholder'
}

export const WithLabel = kTemplate.bind({})
WithLabel.args = {
  ...Default.args,
  label: 'Label'
}

export const PasswordType = kTemplate.bind({})
PasswordType.args = {
  ...Default.args,
  inputType: EInputType.password
}

export const InErrorState = kTemplate.bind({})
InErrorState.args = {
  ...Default.args,
  isValid: false,
  hasErrors: true,
  message: 'The value you provided is invalid',
  modelValue: 'Value'
}
