<script setup lang="ts">
import { useElementHover } from '@vueuse/core'
import { ref, watch } from 'vue'

const props = withDefaults(
  defineProps<{
    tipMessage?: string
    label: string
    value: string
  }>(),
  {
    hasTip: false,
    tipMessage: ''
  }
)

const isTipVisible = ref(false)

function showTip(state: boolean): void {
  if (props.tipMessage && props.value !== '---') {
    isTipVisible.value = state
  }
}

// Hover effect
const el = ref()
const isHovered = useElementHover(el, { delayEnter: 300, delayLeave: 0 })

watch(isHovered, (value) => {
  showTip(value)
})
</script>

<template>
  <div class="description-item">
    <span class="description-item__label">{{ props.label }}</span>
    <span
      ref="el"
      class="description-item__value"
    >
      <Transition>
        <div
          v-if="isTipVisible"
          class="description-item__info-popover"
        >
          {{ props.tipMessage }}
        </div>
      </Transition>
      {{ props.value }}
    </span>
  </div>
</template>

<style scoped lang="scss">
.description-item {
  display: grid;
  grid-template-columns: 170px 1fr;
  text-align: start;
  margin-top: 16px;

  &__label {
    font-weight: 800;
    color: var(--grey-dark-color);
  }

  &__value {
    font-weight: 600;
    color: var(--grey-color);
    position: relative;
  }

  &__info-popover {
    position: absolute;
    top: 25px;
    left: 0px;
    width: 100px;
    z-index: 50;
    background: var(--white-color);
    border-radius: 2px;
    font-size: 12px;
    line-height: 19px;
    color: var(--grey-color);
    margin-top: 1px;
    padding: 8px;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);

    &:before {
      position: absolute;
      left: 7px;
      top: -5px;
      content: '';
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 6px 6px 6px;
      border-color: transparent transparent white transparent;
    }
  }
}

@media screen and (max-width: 1050px) {
  .description-item {
    display: grid;
    grid-template-columns: 170px;
    text-align: start;
    margin-top: 16px;
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 150ms ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
