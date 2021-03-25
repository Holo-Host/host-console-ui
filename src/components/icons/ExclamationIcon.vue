<template>
  <Icon class='icon'>
    <path d="M32.77 63.21a30.3 30.3 0 0030.27-30.27A30.3 30.3 0 0032.77 2.66 30.3 30.3 0 002.5 32.94a30.31 30.31 0 0030.27 30.27zm0-54.53a24.28 24.28 0 0124.26 24.26 24.28 24.28 0 01-24.26 24.25A24.28 24.28 0 018.51 32.94 24.29 24.29 0 0132.77 8.68z" fill="#00CAD9"/>
    <path d="M32.77 39.4a3 3 0 003.01-3.01V20.34a3.01 3.01 0 00-6.02 0V36.4a3.01 3.01 0 003.01 3zM32.77 48.54a3 3 0 003.01-3v-.5a3.01 3.01 0 00-6.02 0v.5a3 3 0 003.01 3z" fill="#00CAD9"/>
  </Icon>
</template>

<script>

import Icon from 'components/icons/Icon.vue'

export default {
  name: 'ClockIcon',
  components: {
    Icon
  }
}
</script>

<style scoped>
.icon {
  width: 66px;
  height: 66px;
}
</style>
