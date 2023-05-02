<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    title?: string
    stroke?: string
    fill?: string
  }>(),
  {
    title: '',
    stroke: '',
    fill: ''
  }
)
</script>

<template>
  <svg
    class="icon"
    :class="$attrs.class"
    version="1"
    xmlns="http://www.w3.org/2000/svg"
  >
    <title>{{ props.title }}</title>
    <g
      :fill="props.fill"
      :stroke="props.stroke"
    >
      <slot />
    </g>
  </svg>
</template>

<style scoped>
.class {
  width: 32px;
  height: 32px;
}
</style>
