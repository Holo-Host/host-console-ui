<template>
  <Icon :stroke="color" fill="transparent" class='icon'>
    <g clip-path="url(#clip0)" :stroke="color" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M19.3 5H4.7C3.7 5 3 5.7 3 6.7v4.6c0 1 .7 1.7 1.7 1.7h14.6c1 0 1.7-.7 1.7-1.7V6.7c0-1-.7-1.7-1.7-1.7z"/><path d="M19.3 13H4.7c-1 0-1.7.7-1.7 1.7v4.6c0 1 .7 1.7 1.7 1.7h14.6c1 0 1.7-.7 1.7-1.7v-4.6c0-1-.7-1.7-1.7-1.7zM7 9v0M7 17v0"/></g><defs><clipPath id="clip0"><path fill="#fff" d="M0 0h24v24H0z"/></clipPath></defs>
  </Icon>
</template>

<script>

import Icon from 'components/icons/Icon.vue'

export default {
  name: 'HappsIcon',
  components: {
    Icon
  },
  props: {
    color: {
      type: String,
      default: "#313C59"
    }
  }
}
</script>

<style scoped>
.icon {
  width: 26px;
  height: 26px;
}
</style>
