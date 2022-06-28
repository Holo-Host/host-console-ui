<template>
  <canvas
    ref="canvas" width="1" height="1"
    :style="style"
  />
</template>

<script setup>
import renderIcon from 'src/utils/identicon'
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  holoHash: {
    type: Uint8Array,
    required: true
  },

  size: {
    type: String,
    required: true
  },

  backgroundColor: {
    type: String,
    default: '#FF175D'
  },

  styleProp: {
    type: Object,
    default: () => {}
  }
})

const canvas = ref()

const options = computed(() => ({
  hash: props.holoHash,
  size: props.size,
  backgroundColor: props.backgroundColor,
  gridSize: 8
}))

const style = computed(() => ({
  'border-radius': '50%',
  ...props.styleProp
}))

function doRenderIcon() {
  renderIcon(options.value, canvas.value)
}

onMounted(() => {
  doRenderIcon()
})
</script>
