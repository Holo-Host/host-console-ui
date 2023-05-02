<script setup lang="ts">
import { computed } from 'vue'
import Icon from '@/components/icons/Icon.vue'

const props = withDefaults(
  defineProps<{
    size?: number
    color?: string
  }>(),
  {
    size: 26,
    color: '#606C8B'
  }
)

const computedSize = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`
}))
</script>

<template>
  <Icon
    :fill="props.color"
    :style="computedSize"
    viewBox="2 2 8 8"
  >
    <path d="M6 5.3l2.5-2.5.7.7L6.7 6l2.5 2.5-.7.7L6 6.7 3.5 9.2l-.7-.7L5.3 6 2.8 3.5l.7-.7L6 5.3z" />
  </Icon>
</template>
