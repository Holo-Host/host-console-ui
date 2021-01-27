import { render, waitFor, fireEvent } from '@testing-library/vue'
import TopNav from '../TopNav.vue'

it('renders a title', () => {
  const title = 'A page title'
  const { getByText } = render(TopNav, {
    props: {
      breadcrumbs: [
        { label: title }
      ]
    }
  })

  getByText(title)
})
