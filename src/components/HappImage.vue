<template>
  <div
    class="happ-image"
    :style="style"
  />
</template>

<script>
const kInitialsLength = 2

export default {
  name: 'HappImage',

  props: {
    happ: Object,

    size: {
      type: String,
      default: '140px'
    }
  },

  data: function () {
    return {
      style: {
        width: this.size,
        height: this.size,
        'font-size': this.size,
        'line-height': this.size
      }
    }
  },

  computed: {
    initials() {
      return this.happ.name
        .replace(/[^a-z]/giu, '')
        .slice(0, kInitialsLength)
        .toUpperCase()
    }
  }
}
</script>

<style scoped>
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
}
.happ-image::before,
.happ-image::after {
  position: absolute;
  content: '';
  width: 100%;
  height: 2px; /* cross thickness */
  background-color: #909c9b;
}
.happ-image::before {
  transform: rotate(45deg);
}
.happ-image::after {
  transform: rotate(-45deg);
}
</style>
