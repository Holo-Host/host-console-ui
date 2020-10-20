import { mount } from '@vue/test-utils'
import TopNav from '../TopNav.vue'

it('renders a title', () => {
  const title = 'A page title'
  const wrapper = mount(TopNav, {
    props: {
      title
    }
  })
  expect(wrapper.text()).toContain(title)
})
