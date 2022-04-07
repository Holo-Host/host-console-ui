<template>
  <Icon class='icon' viewBox="0 0 23 23">
    <path d="M3.32 5.94h16.43c.49 0 .97.48.97 1.04v9.11c0 .49-.48.97-.97.97H3.32c-.56 0-1.04-.48-1.04-.97V6.98c0-.56.48-1.04 1.04-1.04zm2.83 9.12h3.31v.48H6.15v-.48zm-2 0h1.51v.48H4.14v-.48zM3.03 8.29h16.92V6.98c0-.14-.07-.28-.2-.28H3.31a.3.3 0 00-.28.28v1.3zm16.92 2.35H3.04v5.45c0 .14.14.21.28.21h16.43c.14 0 .21-.07.21-.2v-5.46z" fill="#313C59"/>
  </Icon>
</template>

<script>

import Icon from 'components/icons/Icon.vue'

export default {
  name: 'PaymentIcon',
  components: {
    Icon
  }
}
</script>

<style scoped>
.icon {
  width: 23px;
  height: 23px;
}
</style>
