<script setup lang="ts">
import Icon from '@/components/icons/Icon.vue'

const props = withDefaults(
  defineProps<{
    color?: string
  }>(),
  {
    color: '#606C8B'
  }
)
</script>

<template>
  <Icon
    :fill="props.color"
    class="icon"
    viewbox="0 0 80 80"
  >
    <path d="M0 7.06L3.05 4 0 .94.94 0l4 4-4 4L0 7.06z" />
  </Icon>
</template>

<style scoped>
.icon {
  width: 8px;
  height: 8px;
}
</style>
