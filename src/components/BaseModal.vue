<template>
  <Transition>
    <div
      v-if="isVisible"
      class="base-modal-overlay"
      @click="isDismissible ? emit('close') : () => {}"
    >
      <div class="base-modal" @click.stop>
        <button
          v-if="isDismissible && hasCloseButton"
          class="base-modal-close-button"
          @click="emit('close')"
        >
          <ExIcon class="ex-icon" size="16" />
        </button>

        <div class="base-modal-content">
          <span v-if="title" class="base-modal-title">
            {{ title }}
          </span>

          <h4 v-if="subTitle" class="base-modal-sub-title">
            {{ subTitle }}
          </h4>

          <div class="base-modal-message-content">
            <slot></slot>
          </div>
        </div>

        <div class="base-modal-buttons">
          <slot name="buttons"></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import ExIcon from 'components/icons/ExIcon'

defineProps({
  hasCloseButton: {
    type: Boolean,
    default: true
  },

  isDismissible: {
    type: Boolean,
    default: true
  },

  isVisible: {
    type: Boolean,
    required: true
  },

  title: {
    type: String,
    default: ''
  },

  subTitle: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['close'])
</script>

<style scoped>
.base-modal-overlay {
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  z-index: 200;
  background-color: rgba(49, 60, 89, 0.67);
  width: 100vw;
  height: 100vh;
}

.base-modal {
  position: relative;
  margin: auto;
  background-color: white;
  border-radius: 4px;
  box-shadow: 0 2px 20px rgba(32, 39, 57, 0.5);
  z-index: 20;
  padding: 26px;
  opacity: 1;
  max-width: 580px;
}

.base-modal-content {
  display: flex;
  align-items: center;
  padding: 26px 65px;
  flex-direction: column;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #313c59;
}

.base-modal-title {
  font-size: 22px;
  line-height: 30px;
  display: flex;
  align-items: center;
  text-align: center;
  margin: 0 0 12px 0;
}

.base-modal-sub-title {
  font-size: 14px;
  line-height: 19px;
  margin: 0 0 65px 0;
}

.base-modal-message-content {
  margin-top: 8px;
  font-weight: 400;
}

.base-modal-buttons {
  display: flex;
  justify-content: center;
  padding-bottom: 26px;
}

.base-modal-close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  padding: 0;
  background-color: transparent;
  cursor: pointer;
}

@media screen and (max-width: 1050px) {
  .base-modal {
    pointer-events: all;
    flex-basis: 100%;
    height: fit-content;
  }

  .base-modal-content {
    padding: 26px 0 28px;
    margin: 0 -6px;
  }

  .base-modal-title {
    margin-bottom: 6px;
  }

  .base-modal-sub-title {
    margin-bottom: 26px;
  }
}

@media screen and (max-width: 568px) {
  .base-modal {
    margin: 10px;
  }

  .base-modal-content {
    padding: 0;
    margin: 0 -6px;
  }

  .base-modal-buttons {
    padding-bottom: 10px;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
