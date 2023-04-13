<template>
  <BaseTableRow>
    <BaseTableRowItem
      :value="props.redemption.formattedCreatedDate"
      is-visible-on-mobile
      :is-italic="props.redemption.status === 'pending'"
    />

    <td
      class="redemption-history-table-row__hf-amount"
    >
      <BaseTableRowItem
        :value="props.redemption.formattedHfAmount"
        is-bold
        :is-italic="props.redemption.status === 'pending'"
        is-hoverable
        @hover="showPartialInfo"
      >
        <div
          v-if="props.redemption.isPartial"
          class="redemption-history-table-row__info"
        >
          *
          <Transition>
            <div
              v-if="isPartialInfoVisible"
              class="redemption-history-table-row__info-popover redemption-history-table-row__partial-info-popover"
            >
              {{ $t('redemption_history.original_requested_amount', { amount: props.redemption.formattedRequestedAmount }) }}
            </div>
          </Transition>
        </div>
      </BaseTableRowItem>
    </td>

    <BaseTableRowItem
      :value="props.redemption.formattedRedemptionAmount"
      is-bold
      is-visible-on-mobile
      :is-italic="props.redemption.status === 'pending'"
      align="end"
      is-hoverable
      @hover="showTransactionPrice"
    >
      <span
        v-if="props.redemption.formattedRedemptionAmount"
        class="redemption-history-table-row__amount-unit"
      >
        HOT
      </span>

      <div class="redemption-history-table-row__info">
        <Transition>
          <div
            v-if="isPriceVisible"
            class="redemption-history-table-row__info-popover redemption-history-table-row__price-info-popover"
          >
            {{ $t('redemption_history.transaction_price', { hf: 1, hot: 1 }) }}
          </div>
        </Transition>
      </div>
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
import { ref } from 'vue'
import type { Redemption } from '@/interfaces/HposInterface'

interface ExtendedRedemption extends Redemption {
  formattedCreatedDate: string
  formattedHfAmount: string
  formattedRequestedAmount: string
  formattedRedemptionAmount: string
  formattedTransactionId: string
}

const props = defineProps<{
  redemption: ExtendedRedemption
}>()

const isPartialInfoVisible = ref(false)
const isPriceVisible = ref(false)

function showPartialInfo(state: boolean): void {
  if (props.redemption.isPartial) {
    isPartialInfoVisible.value = state
  }
}

function showTransactionPrice(state: boolean): void {
  if (props.redemption.formattedRedemptionAmount !== '---') {
    isPriceVisible.value = state
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

  &__info {
    position: relative;
  }

  &__info-popover {
    position: absolute;
    z-index: 50;
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

  &__price-info-popover {
    top: 15px;
    right: -20px;
    width: 100px;
  }

  &__partial-info-popover {
    top: 20px;
    right: -160px;
    width: 160px;
  }

  @media screen and (max-width: 1050px) {
    &__hf-amount {
      display: none;
    }
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 150ms ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
