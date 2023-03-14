<template>
  <Icon class='icon' viewBox="0 0 19 19">
    <path d="M9.5 0C4.262 0 0 4.262 0 9.5S4.262 19 9.5 19 19 14.738 19 9.5 14.738 0 9.5 0zm0 16.361c-.873 0-1.583-.71-1.583-1.583s.71-1.584 1.583-1.584 1.583.71 1.583 1.584c0 .873-.71 1.583-1.583 1.583zm2.639-10.927c0 .308-.053.612-.16.901l-1.983 5.456a.528.528 0 01-.992 0L7.02 6.335a2.63 2.63 0 01-.159-.901v-.156A2.642 2.642 0 019.5 2.638a2.642 2.642 0 012.639 2.64v.156z" fill="#313C59"/>
  </Icon>
</template>

<script>

import Icon from '@/components/icons/Icon.vue'
export default {
  name: 'FilledExclamationIcon',
  components: {
    Icon
  }
}
</script>

<style scoped>
.icon {
  width: 19px;
  height: 19px;
}
</style>
