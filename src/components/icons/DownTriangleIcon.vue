<script setup lang="ts">
import Icon from '@/components/icons/Icon.vue'

withDefaults(
  defineProps<{
    white?: boolean
  }>(),
  {
    white: false
  }
)
</script>

<template>
  <Icon
    :fill="white ? '#FFF' : '#313C59'"
    class="icon"
  >
    <path d="M.07 0C0 0-.02.03.02.07l4.9 4.9c.05.04.11.04.15 0L9.98.07C10.02.03 10 0 9.93 0H.07z" />
  </Icon>
</template>

<style scoped>
.icon {
  width: 10px;
  height: 7px;
}
</style>
