<template>
  <Icon fill="#606C8B" class='icon'>
    <circle cx="12" cy="12" r="11.25" fill="#fff" stroke="#606C8B" stroke-width="1.5"/>
    <path d="M12 10.89L15.89 7 17 8.11 13.11 12 17 15.89 15.89 17 12 13.11 8.11 17 7 15.89 10.89 12 7 8.11 8.11 7 12 10.89z" />
  </Icon>
</template>

<script>

import Icon from 'components/icons/Icon.vue'

export default {
  name: 'CircledExIcon',
  components: {
    Icon
  }
}
</script>

<style scoped>
.icon {
  width: 24px;
  height: 26px;
}
</style>
