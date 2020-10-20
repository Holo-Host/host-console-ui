<template>
  <Icon stroke="#00CAD9" class='icon'>
    <path d="M5 12h14M15 16l4-4M15 8l4 4" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </Icon>
</template>

<script>

import Icon from 'components/icons/Icon.vue'

export default {
  name: 'ArrowIcon',
  components: {
    Icon
  }
}
</script>

<style scoped>
.icon {
  width: 26px;
  height: 26px;
}
</style>
