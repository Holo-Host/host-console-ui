<script lang="ts" setup>
import { CheckCircleIcon } from '@heroicons/vue/24/outline'
import type { PaidHostingWizardStep } from '@/constants/ui'

const props = defineProps<{
  steps: PaidHostingWizardStep[]
}>()
</script>

<template>
  <div class="paid-hosting-modal-wizard-step">
    <CheckCircleIcon class="paid-hosting-modal-wizard-step__icon" />
    <span class="paid-hosting-modal-wizard-step__title">
      {{ props.steps[3]?.title }}
    </span>

    <div class="paid-hosting-modal-wizard-step__description">
      {{ props.steps[3]?.description }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.paid-hosting-modal-wizard-step {
  display: flex;
  flex-direction: column;
  align-items: center;
	width: 540px;

  &__icon {
    width: 75px;
    height: 75px;
    color: var(--primary-color);
  }

  &__title {
    margin-top: 16px;
    font-size: 14px;
    justify-self: start;
    font-weight: 800;
  }

  &__description {
    margin-top: 20px;
    margin-bottom: 30px;
  }
}
</style>
