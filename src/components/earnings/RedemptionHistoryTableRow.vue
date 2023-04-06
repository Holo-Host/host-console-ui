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
    >
      <a
        v-if="props.redemption.transactionId"
        :href="`https://goerli.etherscan.io/tx/${props.redemption.transactionId}`"
        target="_blank"
        class="redemption-history-table-row__transaction-link"
      >
        <ArrowTopRightOnSquareIcon class="redemption-history-table-row__transaction-link-icon" />
      </a>
    </BaseTableRowItem>

    <BaseTableRowItem
      :value="props.redemption.status"
      is-visible-on-mobile
      :is-italic="props.redemption.status === 'pending'"
    />
  </BaseTableRow>
</template>

<script setup lang="ts">
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/20/solid'
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

  &__transaction-link {
    height: 22px;
  }

  &__transaction-link-icon {
    width: 17px;
    margin-top: 2px;
    margin-left: 4px;
    color: var(--grey-dark-color);
  }
}
</style>
