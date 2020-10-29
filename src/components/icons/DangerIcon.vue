<template>
  <Icon fill="#F55" class='icon'>
    <path d="M18.8 13.583l-6.392-10.6a2.858 2.858 0 00-4.816 0L1.2 13.583a2.5 2.5 0 00-.042 2.5 2.808 2.808 0 002.45 1.417h12.784a2.808 2.808 0 002.45-1.383 2.5 2.5 0 00-.042-2.534zm-8.8.584a.833.833 0 110-1.667.833.833 0 010 1.667zm.833-3.334a.833.833 0 11-1.666 0V7.5a.833.833 0 111.666 0v3.333z" />
  </Icon>
</template>

<script>

import Icon from 'components/icons/Icon.vue'

export default {
  name: 'DangerIcon',
  components: {
    Icon
  }
}
</script>

<style scoped>
.icon {
  width: 20px;
  height: 20px;
}
</style>
