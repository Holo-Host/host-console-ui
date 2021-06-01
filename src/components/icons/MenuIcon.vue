<template>
  <Icon class='icon' viewBox="0 0 24 24">
    <path d="M4 8h16M4 16h16" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </Icon>
</template>

<script>

import Icon from 'components/icons/Icon.vue'

export default {
  name: 'MenuIcon',
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
