<template>
  <div class='overlay' @click="handleClose">
    <div class='modal' @click.stop>
      <button @click="handleClose" class="close-button"><ExIcon class="ex-icon" size='16' /></button>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import ExIcon from 'components/icons/ExIcon'

export default {
  name: 'Modal',
  components: {
    ExIcon
  },
  props: {
    handleClose: {
      type: Function,
      required: true
    }
  }
}
</script>

<style scoped>
.overlay {
  position: fixed;
  display: flex;
  top: 0;
  left: 0;
  z-index: 200;
  background-color: rgba(49, 60, 89, 0.67);
  width: 100vw;
  height: 100vh;
}
.modal {
  position: relative;
  margin: auto;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0px 2px 20px rgba(32, 39, 57, 0.5);
  z-index: 20;
  padding: 26px;
  opacity: 1;
}
.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  padding: 0;
  background-color: transparent;
  cursor: pointer;
}

@media screen and (max-width: 1050px) {
  .overlay {
    background-color: transparent;
    pointer-events: none;
    position: unset;
  }
  .modal {
    box-shadow: 0px 4px 20px #ECEEF1;;
    pointer-events: all;
    margin: 4px 40px 4px 0;
    flex-basis: 100%;
    height: fit-content;
  }
}
</style>