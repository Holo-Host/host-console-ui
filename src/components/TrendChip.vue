<script setup lang="ts">
import { ArrowDownIcon } from '@heroicons/vue/24/outline'
import { computed } from 'vue'

const props = defineProps<{
  value: number
}>()

const trendDirection = computed((): string => (props.value >= 0 ? 'up' : 'down'))
const label = computed((): string => Math.abs(props.value).toFixed(0))
</script>

<template>
  <div
    :class="[
      'trend-chip',
      {
        'trend-chip--up': trendDirection === 'up',
        'trend-chip--down': trendDirection === 'down'
      }
    ]"
  >
    <span
      :class="[
        'trend-chip__icon',
        {
          'trend-chip__icon--up': trendDirection === 'up'
        }
      ]"
    ><ArrowDownIcon /></span>
    <span class="trend-chip__label">{{ label }}%</span>
    <slot />
  </div>
</template>

<style lang="scss" scoped>
.trend-chip {
  margin-top: -2px;
  margin-left: 6px;
  align-items: center;
  display: inline-flex;
  justify-content: start;
  border-radius: 9999px;
  padding: 4px 9px;
  font-size: 12px;
  font-weight: 700;
  text-transform: capitalize;

  &--up {
    background-color: #ecfdf3;
    color: var(--green-color);
  }

  &--down {
    background-color: #fef3f2;
    color: var(--red-color);
  }

  &__icon {
    height: 12px;
    width: 12px;

    &--up {
      transform: rotate(180deg);
    }
  }

  &__label {
    margin-left: 4px;
  }
}
</style>
