<template>
  <BaseTableRow>
    <BaseTableRowItem
      :value="props.redemption.formattedCreatedDate"
      is-visible-on-mobile
      :is-italic="props.redemption.status === 'pending'"
    />


    <div v-element-hover="onHover">
      <BaseTableRowItem
        :value="props.redemption.formattedHfAmount"
        is-bold
        :is-italic="props.redemption.status === 'pending'"
      >
        <div
          v-if="props.redemption.isPartial"
          class="redemption-history-table-row__partial-info"
        >
          *
          <div
            v-if="isPartialInfoVisible"
            class="redemption-history-table-row__partial-info-popover"
          >
            Requested amount: {{ props.redemption.formattedRequestedAmount }}
          </div>
        </div>
      </BaseTableRowItem>
    </div>


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
import { vElementHover } from '@vueuse/components'
import { ref } from 'vue'
import type { Redemption } from '@/interfaces/HposInterface'

interface ExtendedRedemption extends Redemption {
  id: string
  formattedCreatedDate: string
  formattedHfAmount: string
  formattedRequestedAmount: string
  formattedRedemptionAmount: string
  formattedTransactionId: string
  status: string
  isPartial: boolean
}

const props = defineProps<{
  redemption: ExtendedRedemption
}>()

const isPartialInfoVisible = ref(false)

function onHover(state: boolean): void {
  if (props.redemption.isPartial) {
    isPartialInfoVisible.value = state
  }
}
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

  &__partial-info {
    position: relative;
  }

  &__partial-info-popover {
    position: absolute;
    z-index: 50;
    right: -120px;
    top: 20px;
    width: 120px;
    background: var(--white-color);
    border-radius: 2px;
    font-size: 12px;
    line-height: 19px;
    color: var(--grey-color);
    margin-top: 1px;
    padding: 8px;
    cursor: pointer;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);

    &:before {
      position: absolute;
      left: 7px;
      top: -5px;
      content: '';
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 6px 6px 6px;
      border-color: transparent transparent white transparent;
    }
  }
}
</style>
