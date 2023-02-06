<template>
  <Icon class='icon' viewBox="0 0 11 13">
    <path fill-rule="evenodd" clip-rule="evenodd" d="M6.35 11.28V3.13l3.13 3.03c.85.85 2.08-.38 1.23-1.23L6.16.28c-.47-.37-.85-.37-1.32 0L.29 4.93C-.56 5.78.67 7 1.52 6.16l3.13-3.03v8.15c0 1.13 1.7 1.13 1.7 0z" :fill="color" />
  </Icon>
</template>

<script>

import Icon from '@/components/icons/Icon.vue'

export default {
  name: 'ShortUpArrowIcon',
  components: {
    Icon
  },
  props: {
    color: {
      default: '#000'
    }
  }
}
</script>

<style scoped>
.icon {
  width: 11px;
  height: 13px;
}
</style>
