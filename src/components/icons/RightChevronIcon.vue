<template>
  <Icon :fill="color" class='icon' viewbox="0 0 80 80">
    <path d="M0 7.06L3.05 4 0 .94.94 0l4 4-4 4L0 7.06z" />
  </Icon>
</template>

<script>

import Icon from 'components/icons/Icon.vue'

export default {
  name: 'RightChevronIcon',
  components: {
    Icon
  },
  props: {
    color: {
      type: String,
      default: "#606C8B"
    }
  }
}
</script>

<style scoped>
.icon {
  width: 8px;
  height: 8px;
}
</style>
