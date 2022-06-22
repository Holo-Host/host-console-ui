import BaseButton from '@/components/BaseButton.vue'
import { EButtonType, ESpinnerSize } from '@/types/ui'

export default {
  title: 'BaseButton',
  component: BaseButton,

  argTypes: {
    type: {
      options: [EButtonType.primary, EButtonType.secondary],
      control: {
        type: 'select',
        labels: {
          [EButtonType.primary]: 'primary',
          [EButtonType.secondary]: 'secondary'
        }
      }
    },
    isDisabled: false,
    isBusy: false,
    title: 'Button',
    tag: 'button',
    onClick: {}
  }
}

const kTemplate = (args) => ({
  components: { BaseButton },
  setup() {
    return { args }
  },
  template: '<BaseButton v-bind="args" />'
})

export const Default = kTemplate.bind({})
Default.args = {
  type: EButtonType.primary,
  isDisabled: false,
  isBusy: false,
  spinnerSize: ESpinnerSize.small,
  title: 'Button',
  tag: 'button',
  padding: '',
  classes: ''
}
