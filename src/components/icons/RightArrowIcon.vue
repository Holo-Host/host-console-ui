<script setup lang="ts">
import Icon from '@/components/icons/Icon.vue'
</script>

<template>
  <Icon
    stroke="#00CAD9"
    stroke-opacity=".18"
    class="icon"
  >
    <path
      d="M5 12h14M15 16l4-4M15 8l4 4"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </Icon>
</template>

<style scoped>
.icon {
  width: 24px;
  height: 24px;
}
</style>
