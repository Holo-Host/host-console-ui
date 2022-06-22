<template>
  <div
    class="loader"
    :style="dims"
    data-test-flat-spinner-wrapper
  >
    <div
      class="loader-scale"
      :style="computedScale"
      data-test-flat-spinner-loader-wrapper
    >
      <div
        v-for="item in 4"
        :key="item"
        class="loader-dot"
        :class="color"
        data-test-flat-spinner-loader
      ></div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  scale: {
    type: Number,
    default: 0.5
  },

  color: {
    type: String,
    default: 'primary',
    validator(value) {
      return ['primary', 'secondary', 'white'].includes(value)
    }
  }
})

const dims = computed(() => ({
  width: `calc(61px * ${props.scale})`,
  height: `calc(13px * ${props.scale})`
}))

const computedScale = computed(() => ({
  transform: `scale(${props.scale})`
}))
</script>

<style scoped lang="scss">
.loader {
  display: inline-block;
  position: relative;
}

.loader-scale {
  position: absolute;
  transform-origin: top left;
}

.loader .loader-dot {
  position: absolute;
  width: 13px;
  height: 13px;
  border-radius: 50%;
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
}

.loader .loader-dot:nth-child(1) {
  animation: grow 0.6s infinite;
}

.loader .loader-dot:nth-child(2) {
  animation: shift 0.6s infinite;
}

.loader .loader-dot:nth-child(3) {
  left: 24px;
  animation: shift 0.6s infinite;
}

.loader .loader-dot:nth-child(4) {
  left: 48px;
  animation: shrink 0.6s infinite;
}

.loader-dot.primary {
  background-color: #00cad9;
}

.loader-dot.secondary {
  background-color: #606c8b;
}

.loader-dot.white {
  background-color: #fff;
}

@keyframes grow {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

@keyframes shrink {
  0% {
    transform: scale(1);
  }

  100% {
    transform: scale(0);
  }
}

@keyframes shift {
  0% {
    transform: translate(0, 0);
  }

  100% {
    transform: translate(24px, 0);
  }
}
</style>
