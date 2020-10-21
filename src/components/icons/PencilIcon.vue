<template>
  <Icon fill="#00CAD9" class='icon'>
    <path d="M15.83 16.67H4.17a.83.83 0 100 1.66h11.66a.83.83 0 000-1.66zM4.17 15h.07l3.48-.32c.38-.03.73-.2 1-.47l7.5-7.5a1.6 1.6 0 00-.05-2.26l-2.29-2.28a1.67 1.67 0 00-2.21-.06l-7.5 7.5c-.27.27-.44.63-.48 1l-.36 3.48a.83.83 0 00.84.91zm8.55-11.67L15 5.61l-1.67 1.62L11.1 5l1.63-1.67zm-7.41 7.43L10 6.1l2.25 2.25-4.67 4.67-2.5.23.23-2.5z" />
  </Icon>
</template>

<script>

import Icon from 'components/icons/Icon.vue'

export default {
  name: 'PencilIcon',
  components: {
    Icon
  }
}
</script>

<style scoped>
.icon {
  width: 24px;
  height: 24px;
}
</style>
