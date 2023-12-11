<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import type { PaidHostingWizardStep } from '@/constants/ui'

const { t } = useI18n()

const props = defineProps<{
  steps: PaidHostingWizardStep[]
}>()

const emit = defineEmits(['go-to-next-step'])
</script>

<template>
  <div
    class="paid-hosting-modal-wizard-step"
    data-test-paid-hosting-wizard-step-one
  >
    <span
      class="paid-hosting-modal-wizard-step__title"
      data-test-paid-hosting-wizard-step-one-title
    >
      {{ $t(props.steps[0].title) }}
    </span>

    <p class="paid-hosting-modal-wizard-step__description">
      {{ $t(props.steps[0].description) }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.paid-hosting-modal-wizard-step {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__title {
    margin-top: 8px;
    font-size: 18px;
    justify-self: start;
    font-weight: 800;
  }

  &__description {
    margin-top: 8px;
  }
}
</style>
