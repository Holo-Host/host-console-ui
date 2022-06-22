import WelcomeModal from '@/components/WelcomeModal.vue'

export default {
  title: 'WelcomeModal',
  component: WelcomeModal,

  argTypes: {
    isVisible: true
  }
}

const kTemplate = (args) => ({
  components: { WelcomeModal },
  setup() {
    return { args }
  },
  // And then the `args` are bound to your component with `v-bind="args"`
  template: '<WelcomeModal v-bind="args" />'
})

export const Default = kTemplate.bind({})
Default.args = {
  isVisible: true
}

// export const WithContentInSlots = kTemplate.bind({})
// WithContentInSlots.args = {
//   hasCloseButton: true,
//   isDismissible: true,
//   isVisible: true,
//   title: 'Modal title',
//   subTitle: 'Modal subtitle',
//   defaultSlot: 'Modal slot content',
//   buttonsSlot: 'Modal buttons slot content'
// }
