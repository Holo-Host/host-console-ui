import BaseInput from '@/components/BaseInput.vue'
import { EInputType } from '@/types/ui'

export default {
  title: 'BaseInput',
  component: BaseInput,

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
    iconClass: '',
    hasErrors: false,
    message: ''
  }
}

const kTemplate = (args) => ({
  components: { BaseInput },
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<BaseInput v-bind="args" />'
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
  iconClass: '',
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
