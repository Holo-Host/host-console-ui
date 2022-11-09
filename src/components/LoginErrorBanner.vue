<template>
  <Transition>
    <div
      v-if="isVisible"
      class="login-error-banner"
    >
      <AlertTriangleIcon class="login-error-banner__icon" />
      <span class="login-error-banner__label">{{ message }}</span>
    </div>
  </Transition>
  <div
    class="login-error-banner__placeholder"
  />
</template>

<script setup>
import AlertTriangleIcon from './icons/AlertTriangleIcon.vue'

defineProps({
  isVisible: {
    type: Boolean,
    default: false
  },

  message: {
    type: String,
    default: ''
  }
})
</script>

<style lang="scss" scoped>
.login-error-banner {
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #ffface;
  box-shadow: 0 4px 20px rgba(188, 191, 198, 0.8);
  color: var(--grey-color);
  font-weight: 600;
  border-radius: 5px;
  padding: 18px;

  &__label {
    margin-left: 12px;
  }

  &__placeholder {
    height: 60px;
  }
}

@media screen and (max-width: 1050px) {
  .login-error-banner {
    margin: 0;
    padding: 12px;

    &__icon {
      width: 36px;
    }

    &__label {
      font-size: 14px;
    }

    &__placeholder {
      height: 56px;
    }
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
