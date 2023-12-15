<script lang="ts" setup>
import CircleSpinner from '@uicommon/components/CircleSpinner.vue'
import { onMounted, ref } from 'vue'
import type { PaidHostingWizardStep } from '@/constants/ui'

const props = defineProps<{
  steps: PaidHostingWizardStep[]
}>()

const isProgressVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isProgressVisible.value = true
    // eslint-disable-next-line @typescript-eslint/no-magic-numbers
  }, 3000)
})
</script>

<template>
  <div class="paid-hosting-modal-wizard-step">
    <span class="paid-hosting-modal-wizard-step__title">
      <span v-if="isProgressVisible">{{ props.steps[2]?.props.progressValue }}%</span>
      <CircleSpinner
        v-if="!isProgressVisible"
        class="paid-hosting-modal-wizard-step__title--spinner"
      />
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
  padding: 75px 135px 60px;

  &__title {
    margin-top: 8px;
    font-size: 32px;
    justify-self: start;
    font-weight: 800;

    &--spinner {
      margin-bottom: 8px;
    }
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
