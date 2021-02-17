<template>
  <Icon :fill="color" class='icon'>
    <path d="M20.4 10.2l-7.7-7.9a1 1 0 00-1.4 0l-7.7 7.9a2 2 0 00-.6 1.4V20c0 1 .8 2 1.9 2H19c1 0 1.9-1 1.9-2v-8.4c0-.5-.2-1-.6-1.4zM10 20v-6h4v6h-4zm9 0h-3v-7c0-.6-.4-1-1-1H9a1 1 0 00-1 1v7H5v-8.4l7-7.2 7 7.2V20z" />
  </Icon>
</template>

<script>

import Icon from 'components/icons/Icon.vue'

export default {
  name: 'HomeIcon',
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
