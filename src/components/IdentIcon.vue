<template>
  <canvas
    ref="canvas" width="1" height="1"
    :style="style"
    class="identicon"
    @click="copyToClipboard(hash)"
  />
</template>

<script setup>
import { copyToClipboard } from '@uicommon/utils/clipboardUtils'
import renderIcon from '@uicommon/utils/identicon'
import { computed, onMounted, ref } from 'vue'

const props = defineProps({
  hash: {
    type: String,
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
  hash: props.hash ? Uint8Array.from(props.hash) : null,
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

<style scoped>
.identicon {
  cursor: pointer;
}
</style>
