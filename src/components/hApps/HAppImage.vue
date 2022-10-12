<template>
  <img
    v-if="happ.logoUrl"
    :src="happ.logoUrl"
    alt="app-logo"
    :style="style"
    class="happ-image"
  >
  <div
    v-else
    class="happ-image happ-image--empty"
    :style="style"
  />
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  happ: {
    type: Object,
    required: true
  },

  size: {
    type: String,
    default: '140px'
  }
})

const style = computed(() => ({
  width: props.size,
  height: props.size,
  'font-size': props.size,
  'line-height': props.size
}))
</script>

<style lang="scss" scoped>
.happ-image {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  border: 1px solid var(--grey-color);
  border-radius: 12px;
  font-weight: bold;
  color: rgba(96, 108, 139, 0.46);
  margin-right: 10px;

  &--empty {
    &::before,
    &::after {
      position: absolute;
      left: -25px;
      content: '';
      width: calc(100% + 50px);
      height: 1px; /* cross thickness */
      background-color: #909c9b;
    }

    &::before {
      transform: rotate(45deg);
    }

    &::after {
      transform: rotate(-45deg);
    }
  }
}
</style>
