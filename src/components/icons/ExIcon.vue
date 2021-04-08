<template>
  <Icon fill="#606C8B" :style="style" viewBox="2 2 8 8">
    <path d="M6 5.3l2.5-2.5.7.7L6.7 6l2.5 2.5-.7.7L6 6.7 3.5 9.2l-.7-.7L5.3 6 2.8 3.5l.7-.7L6 5.3z" />
  </Icon>
</template>

<script>

import Icon from 'components/icons/Icon.vue'

export default {
  name: 'ExIcon',
  components: {
    Icon
  },
  props: {
    size: {
      default: '26',
    }
  },
  computed: {
    style () {
      return {
        width: `${this.size}px`,
        height: `${this.size}px`,
      }
    }
  }
}
</script>

<style scoped>
</style>
