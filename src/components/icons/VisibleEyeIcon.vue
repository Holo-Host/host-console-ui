<template>
  <Icon :fill="color" class='icon'>
    <path d="M12.5 9.5a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3Zm0 1.75c-.7 0-1.25.55-1.25 1.25h-.5c0-.97.78-1.75 1.75-1.75v.5Z" fill="#000"/><path d="M12.5 6.5a11.5 11.5 0 0 0-9.93 5.75l-.15.25.15.25a11.5 11.5 0 0 0 9.93 5.75c4.07 0 7.87-2.2 9.92-5.75l.15-.25-.15-.25A11.5 11.5 0 0 0 12.5 6.5Zm-8.93 6A10.43 10.43 0 0 1 9.35 8a5.46 5.46 0 0 0 0 9 10.51 10.51 0 0 1-5.78-4.5Zm4.43 0C8 10.03 10.02 8 12.5 8c2.47 0 4.5 2.03 4.5 4.5S14.97 17 12.5 17A4.51 4.51 0 0 1 8 12.5Zm7.65 4.5a5.5 5.5 0 0 0 0-9c2.37.75 4.42 2.32 5.77 4.5a10.51 10.51 0 0 1-5.77 4.5Z" fill="#000"/>
  </Icon>
</template>

<script>

import Icon from 'components/icons/Icon.vue'

export default {
  name: 'GearIcon',
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
  width: 25px;
  height: 25px;
}
</style>
