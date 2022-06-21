<template>
  <div
    v-if="size !== ESpinnerSize.none"
    class="loader"
    :class="[kSpinnerSizes[size]]"
    data-test-circle-spinner-wrapper
  >
    <div
      class="dot-spin"
      :class="[theme === EOverlayTheme.light ? 'text-host-console' : 'text-white']"
      data-test-circle-spinner-dots
    />
  </div>
</template>

<script setup>
import { ESpinnerSize } from 'src/types/ui'
import { EOverlayTheme } from 'src/utils/notifications'

const kSpinnerSizes = {
  [ESpinnerSize.none]: ['scale-0'],
  [ESpinnerSize.small]: ['scale-50'],
  [ESpinnerSize.medium]: ['scale-100'],
  [ESpinnerSize.large]: ['scale-150'],
  [ESpinnerSize.xl]: ['scale-200']
}

defineProps({
  size: {
    type: Number,
    default: ESpinnerSize.small
  },

  theme: {
    type: Number,
    default: EOverlayTheme.light
  }
})
</script>

<style lang="scss" scoped>
.loader {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .dot-spin {
    position: relative;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: transparent;
    box-shadow: 0 -18px 0 0, 12.72984px -12.72984px 0 0, 18px 0 0 0,
      12.72984px 12.72984px 0 0 rgba(152, 128, 255, 0), 0 18px 0 0 rgba(152, 128, 255, 0),
      -12.72984px 12.72984px 0 0 rgba(152, 128, 255, 0), -18px 0 0 0 rgba(152, 128, 255, 0),
      -12.72984px -12.72984px 0 0 rgba(152, 128, 255, 0);
    animation: dotSpin 1.5s infinite linear;
  }

  @keyframes dotSpin {
    0%,
    100% {
      box-shadow: 0 -18px 0 0, 12.72984px -12.72984px 0 0, 18px 0 0 0,
        12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0),
        -12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0),
        -12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0);
    }
    12.5% {
      box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0), 12.72984px -12.72984px 0 0, 18px 0 0 0,
        12.72984px 12.72984px 0 0, 0 18px 0 -5px rgba(152, 128, 255, 0),
        -12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0),
        -12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0);
    }
    25% {
      box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0),
        12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 0, 12.72984px 12.72984px 0 0,
        0 18px 0 0, -12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0),
        -18px 0 0 -5px rgba(152, 128, 255, 0), -12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0);
    }
    37.5% {
      box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0),
        12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0),
        12.72984px 12.72984px 0 0, 0 18px 0 0, -12.72984px 12.72984px 0 0,
        -18px 0 0 -5px rgba(152, 128, 255, 0), -12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0);
    }
    50% {
      box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0),
        12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0),
        12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 0, -12.72984px 12.72984px 0 0,
        -18px 0 0 0, -12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0);
    }
    62.5% {
      box-shadow: 0 -18px 0 -5px rgba(152, 128, 255, 0),
        12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0), 18px 0 0 -5px rgba(152, 128, 255, 0),
        12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0),
        -12.72984px 12.72984px 0 0, -18px 0 0 0, -12.72984px -12.72984px 0 0;
    }
    75% {
      box-shadow: 0 -18px 0 0, 12.72984px -12.72984px 0 -5px rgba(152, 128, 255, 0),
        18px 0 0 -5px rgba(152, 128, 255, 0), 12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0),
        0 18px 0 -5px rgba(152, 128, 255, 0), -12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0),
        -18px 0 0 0, -12.72984px -12.72984px 0 0;
    }
    87.5% {
      box-shadow: 0 -18px 0 0, 12.72984px -12.72984px 0 0, 18px 0 0 -5px rgba(152, 128, 255, 0),
        12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), 0 18px 0 -5px rgba(152, 128, 255, 0),
        -12.72984px 12.72984px 0 -5px rgba(152, 128, 255, 0), -18px 0 0 -5px rgba(152, 128, 255, 0),
        -12.72984px -12.72984px 0 0;
    }
  }
}

.text-white {
  color: #fff;
}

.text-host-console {
  color: #00cad9;
}
</style>

