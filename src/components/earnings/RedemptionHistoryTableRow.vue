<template>
  <BaseTableRow>
    <BaseTableRowItem
      :value="props.redemption.formattedCreatedDate"
      is-visible-on-mobile
      :is-italic="props.redemption.status === 'pending'"
    />

    <BaseTableRowItem
      :value="props.redemption.formattedHfAmount"
      is-bold
      :is-italic="props.redemption.status === 'pending'"
    />

    <BaseTableRowItem
      :value="props.redemption.formattedRedemptionAmount"
      is-bold
      :is-italic="props.redemption.status === 'pending'"
      align="end"
    >
      <span class="redemption-history-table-row__amount-unit">HOT</span>
    </BaseTableRowItem>

    <BaseTableRowItem
      :value="props.redemption.formattedTransactionId"
      is-visible-on-mobile
      is-bold
      :is-italic="props.redemption.status === 'pending'"
    />

    <BaseTableRowItem
      :value="props.redemption.status"
      is-visible-on-mobile
      :is-italic="props.redemption.status === 'pending'"
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
  formattedHfAmount: string
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
    margin-right: 12px;
  }
}
</style>
