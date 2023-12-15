<script lang="ts" setup>
import type { PaidHostingWizardStep } from '@/constants/ui'

const props = defineProps<{
  steps: PaidHostingWizardStep[]
}>()
</script>

<template>
  <div class="paid-hosting-modal-wizard-step">
    <span class="paid-hosting-modal-wizard-step__title">
      {{ props.steps[2]?.props.progressValue }}%
    </span>

    <div class="paid-hosting-modal-wizard-step__description">
      <span>{{ props.steps[2]?.title }}</span>
      <div class="paid-hosting-modal-wizard-step__description--part-two">
        {{ props.steps[2]?.description }}
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.paid-hosting-modal-wizard-step {
  display: flex;
  flex-direction: column;
  padding: 105px 135px 80px;

  &__title {
    margin-top: 8px;
    font-size: 32px;
    justify-self: start;
    font-weight: 800;
  }

  &__description {
    margin-top: 16px;
    font-size: 11px;
    color: var(--grey-dark-color);

    &--part-two {
      margin-top: -4px;
    }
  }
}
</style>
