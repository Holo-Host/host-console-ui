import FlatSpinner from '@/components/FlatSpinner.vue'

export default {
  title: 'FlatSpinner',
  component: FlatSpinner,

  argTypes: {
    scale: '0.5',
    color: {
      options: ['primary', 'secondary', 'white'],
      control: {
        type: 'select'
      }
    }
  }
}

const kTemplate = (args) => ({
  components: { FlatSpinner },

  setup() {
    return { args }
  },

  template: '<div><FlatSpinner v-bind="args" /></div>'
})

export const Default = kTemplate.bind({})
Default.args = {
  scale: 0.5,
  color: 'primary'
}
