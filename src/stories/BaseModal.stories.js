import BaseModal from '@/components/BaseModal.vue'

export default {
  title: 'BaseModal',
  component: BaseModal,

  argTypes: {
    hasCloseButton: true,
    isDismissible: true,
    isVisible: true,
    title: '',
    subTitle: '',
    defaultSlot: '',
    buttonsSlot: ''
  }
}

const kTemplate = (args) => ({
  components: { BaseModal },
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template:
    '<BaseModal v-bind="args">{{ args.defaultSlot }}<template #buttons>{{ args.buttonsSlot }}</template></BaseModal>'
})

export const Default = kTemplate.bind({})
Default.args = {
  hasCloseButton: true,
  isDismissible: true,
  isVisible: true,
  title: '',
  subTitle: '',
  defaultSlot: '',
  buttonsSlot: ''
}

export const WithContentInSlots = kTemplate.bind({})
WithContentInSlots.args = {
  hasCloseButton: true,
  isDismissible: true,
  isVisible: true,
  title: 'Modal title',
  subTitle: 'Modal subtitle',
  defaultSlot: 'Modal slot content',
  buttonsSlot: 'Modal buttons slot content'
}
