<script setup lang="ts">
defineProps<{
  isVisible: boolean
}>()
</script>

<template>
  <Transition name="fade">
    <div
      v-if="isVisible"
      class="holo-tooltip"
    >
      <slot />
    </div>
  </Transition>
</template>

<style scoped>
.holo-tooltip {
  position: absolute;
  z-index: 50;
  right: 12px;
  top: 20px;
  background: var(--grey-color);
  border-radius: 2px;
  font-size: 14px;
  line-height: 19px;
  color: var(--white-color);
  margin-top: 1px;
  padding: 8px 12px;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
}

.holo-tooltip::before {
  position: absolute;
  right: 7px;
  top: -5px;
  content: '';
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 6px 6px 6px;
  border-color: transparent transparent var(--grey-color) transparent;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease 0.1s;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
