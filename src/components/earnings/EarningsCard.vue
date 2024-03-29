<script setup lang="ts">
import BaseCard from '@uicommon/components/BaseCard.vue'
import BaseLinkButton from '@uicommon/components/BaseLinkButton.vue'
import EarningsDataComponent from '@/components/earnings/EarningsData.vue'
import FilledExclamationIcon from '@/components/icons/FilledExclamationIcon.vue'
import PaymentIcon from '@/components/icons/PaymentIcon.vue'
import UnpaidLateIcon from '@/components/icons/UnpaidLateIcon.vue'
import { kRoutes } from '@/router'
import type { EarningsData } from '@/types/types'

const emit = defineEmits(['try-again-clicked'])

const props = defineProps<{
  data: EarningsData
  isLoading: boolean
  isError: boolean
}>()
</script>

<template>
  <BaseCard
    :is-loading="props.isLoading"
    :is-error="props.isError"
    @try-again-clicked="emit('try-again-clicked')"
  >
    <template #left>
      <EarningsDataComponent :earnings="props.data" />
    </template>

    <template #right>
      <div class="weekly-earnings__links">
        <BaseLinkButton
          :to="kRoutes.paidInvoices.path"
          :icon="PaymentIcon"
          :label="$t('earnings.payments')"
          with-arrow
          class="weekly-earnings__link"
        />

        <BaseLinkButton
          :to="kRoutes.unpaidInvoices.path"
          :icon="UnpaidLateIcon"
          :label="$t('earnings.unpaid_and_late')"
          with-arrow
          class="weekly-earnings__link"
        />

        <BaseLinkButton
          is-disabled
          to=""
          :icon="FilledExclamationIcon"
          :label="$t('earnings.exceptions')"
          with-arrow
          class="weekly-earnings__link"
        >
          <!--          <span class="weekly-earnings__notification">2 new</span>-->
        </BaseLinkButton>
      </div>
    </template>
  </BaseCard>
</template>

<style lang="scss" scoped>
.weekly-earnings {
  &__links {
    margin-top: 34px;
    padding-right: 86px;
  }

  &__link {
    margin: 0 0 24px 0;
  }

  &__notification {
    background-color: white;
    font-weight: bold;
    font-size: 9px;
    line-height: 12px;
    color: #000000;
    border-radius: 5px;
    margin-left: 18px;
    padding: 2px 8px;
  }
}

@media screen and (max-width: 1350px) {
  .weekly-earnings {
    &__links {
      margin-top: 36px;
      padding-right: 0;
    }
  }
}

@media screen and (max-width: 1050px) {
  .weekly-earnings {
    &__links {
      margin-top: 0;
    }
  }
}
</style>
