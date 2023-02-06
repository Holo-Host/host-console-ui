<template>
  <Icon :fill="color" :style="size" viewBox="2 2 8 8">
    <path d="M6 5.3l2.5-2.5.7.7L6.7 6l2.5 2.5-.7.7L6 6.7 3.5 9.2l-.7-.7L5.3 6 2.8 3.5l.7-.7L6 5.3z" />
  </Icon>
</template>

<script setup>
import Icon from '@/components/icons/Icon.vue'
import { computed } from 'vue'

const props = defineProps({
  size: {
    type: Number,
    default: 26
  },

  color: {
    type: String,
    default: '#606C8B'
  }
})

const size = computed(() => ({
  width: `${props.size}px`,
  height: `${props.size}px`
}))
</script>
