import WelcomeModal from '@/components/modals/WelcomeModal.vue'

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
