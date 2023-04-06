<template>
  <BaseTableRow>
    <BaseTableRowItem
      :value="props.redemption.formattedCreatedDate"
      is-visible-on-mobile
    />

    <BaseTableRowItem
      :value="props.redemption.formattedCompletedAmount"
      is-bold
    />

    <BaseTableRowItem
      :value="props.redemption.formattedRedemptionAmount"
      is-bold
    >
      <span class="redemption-history-table-row__amount-unit">HOT</span>
    </BaseTableRowItem>

    <BaseTableRowItem
      :value="props.redemption.formattedTransactionId"
      is-visible-on-mobile
      is-bold
      align="end"
    />

    <BaseTableRowItem
      :value="props.redemption.status"
      is-visible-on-mobile
    />
  </BaseTableRow>
</template>

<script setup lang="ts">
import BaseTableRow from '@uicommon/components/BaseTableRow.vue'
import BaseTableRowItem from '@uicommon/components/BaseTableRowItem.vue'
import type { Redemption } from '@/interfaces/HposInterface'

interface ExtendedRedemption extends Redemption {
  id: string
  formattedCreatedDate: string
  formattedCompletedAmount: string
  formattedRedemptionAmount: string
  formattedTransactionId: string
  status: string
}

const props = defineProps<{
  redemption: ExtendedRedemption
}>()
</script>

<style lang="scss" scoped>
.redemption-history-table-row {
  &__amount-unit {
    margin-left: 35px;
  }
}
</style>
