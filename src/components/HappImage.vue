<template>
  <div class='happ-image' v-bind:style="style" />
</template>

<script>
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
      return this.happ.name.replace(/[^a-z]/gi, '').slice(0,2).toUpperCase()
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
  border: 1px solid #606C8B;
  border-radius: 12px;
  font-weight: bold;
  color:rgba(96, 108, 139, 0.46);
  margin-right: 10px;  
}
.happ-image::before,
.happ-image::after {
    position: absolute;
    content: '';
    width: 100%;
    height: 2px; /* cross thickness */
    background-color: #909C9B;
}
.happ-image::before {
    transform: rotate(45deg);
}
.happ-image::after {
    transform: rotate(-45deg);
}
</style>
