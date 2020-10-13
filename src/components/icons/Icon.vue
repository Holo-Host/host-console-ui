<template>
  <svg :viewBox="viewBox" class="icon" :class="$attrs.class" version="1" xmlns="http://www.w3.org/2000/svg">
    <title>{{ title }}</title>
    <g :fill="color">
      <slot />
    </g>
  </svg>
</template>

<script>
export default {
  name: 'Icon',
  props: {
    title: String,
    color: String
  }
}
</script>

<style scoped>
.class {
  width: 32px;
  height: 32px;
}
</style>
