<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseRadioButton from '@/components/BaseRadioButton.vue'
import HostingPlanModal from '@/components/modals/HostingPlanModal.vue'
import type { HAppDetails } from '@/interfaces/HposInterface'

const { t } = useI18n()

const props = defineProps<{
  hApp: HAppDetails
}>()

const planValue = ref(props.hApp.hostingPlan)

function updatePlan(value: string) {
  console.log('updatePlan', value)
  planValue.value = value
  openModal()
}

const isModalVisible = ref(false)

function openModal(): void {
  isModalVisible.value = true
}

function closeModal(): void {
  isModalVisible.value = false
}
</script>

<template>
  <div class="happ-details-hosting-plan">
    <span class="happ-details-hosting-plan__title">{{ t('happ_details.hosting_plan.label') }}</span>
    <div class="happ-details-hosting-plan__radio-buttons">
      <BaseRadioButton
        id="happ-details-hosting-plan-paid"
        value="paid"
        :model-value="props.hApp.hostingPlan"
        :label="t('happ_details.hosting_plan.paid')"
        :description="t('happ_details.hosting_plan.paid_description')"
        class="happ-details-hosting-plan__radio-button-paid"
        @update:model-value="updatePlan"
      />

      <BaseRadioButton
        id="happ-details-hosting-plan-free"
        value="free"
        :model-value="props.hApp.hostingPlan"
        :label="t('happ_details.hosting_plan.free')"
        :description="t('happ_details.hosting_plan.free_description')"
        class="happ-details-hosting-plan__radio-button-free"
        @update:model-value="updatePlan"
      />
    </div>

    <HostingPlanModal
      v-if="props.hApp"
      :h-app="props.hApp"
      :plan-value="planValue"
      :is-visible="isModalVisible"
      @close="closeModal"
    />
  </div>
</template>

<style scoped lang="scss">
.happ-details-hosting-plan {
  display: flex;
  flex-direction: column;

  &__title {
    font-size: 16px;
    font-weight: 800;
  }

  &__radio-buttons {
    display: flex;
    flex-direction: column;
    margin-top: 18px;
  }

  &__radio-button-free {
    margin-top: 12px;
  }
}

@media screen and (max-width: 1050px) {
  .happ-details-hosting-plan {
  }
}
</style>
