<template>
  <button :style="style">
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',

  props: {
    color: {
      type: String,
      default: 'teal'
    }
  },

  computed: {
    style() {
      switch (this.color) {
        case 'white':
          return {
            backgroundColor: '#FFFFFF',
            color: '#00CAD9',
            border: '1px solid #00CAD9'
          }

        case 'teal':
          return {
            backgroundColor: '#00CAD9',
            color: '#FFFFFF'
          }

        default:
          throw new Error(`Unknown color option ${this.color} for button`)
      }
    }
  }
}
</script>

<style scoped>
button {
  border-radius: 100px;
  border: none;
  height: 34px;
  font-weight: 800;
  font-size: 14px;
  line-height: 19px;
  display: flex;
  align-items: center;
  text-align: center;
  padding: 0 22px;
  margin: 0 10px;
  cursor: pointer;
}
</style>
