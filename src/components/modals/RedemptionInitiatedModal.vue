<script setup lang="ts">
import { CheckCircleIcon } from '@heroicons/vue/24/outline'
import BaseButton from '@uicommon/components/BaseButton.vue'
import BaseModal from '@uicommon/components/BaseModal.vue'
import { useModals } from '@uicommon/composables/useModals'
import { formatCurrency } from '@uicommon/utils/numbers'
import { useElementHover } from '@vueuse/core'
import dayjs from 'dayjs'
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import RedemptionInitiatedModalItem from './RedemptionInitiatedModalItem.vue'
import { EModal, kDefaultDateTimeFormat, kMsInSecond } from '@/constants/ui'

const { t } = useI18n()

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const { visibleModal, hideModal, modalProps } = useModals()

const isPriceVisible = ref(false)

const formattedRedemptionAmount = computed((): number | string => {
  const rawRedemptionAmount: string = modalProps.value.redemptionAmount
  return rawRedemptionAmount && Number(rawRedemptionAmount)
    ? formatCurrency(Number(rawRedemptionAmount))
    : 0
})

const formattedHfAmount = computed((): number | string => {
  const rawHfAmount: string = modalProps.value.hfAmount
  return rawHfAmount && Number(rawHfAmount) ? formatCurrency(Number(rawHfAmount)) : 0
})

const formattedDate = computed((): string =>
  dayjs(new Date(modalProps.value.date / kMsInSecond)).format(kDefaultDateTimeFormat)
)

function showTransactionPrice(state: boolean): void {
  if (formattedRedemptionAmount.value !== '---') {
    isPriceVisible.value = state
  }
}

// Hover effect
const el = ref()
const isHovered = useElementHover(el, { delayEnter: 300, delayLeave: 0 })

watch(isHovered, (value) => {
  showTransactionPrice(value)
})

interface Item {
  label: string
  value: string
  tipMessage?: string
}

const items = computed((): Item[] => [
  {
    label: `${t('redeem_holofuel.request_id')}:`,
    value: modalProps.value.requestId
  },
  {
    label: `${t('$.date')}:`,
    value: formattedDate.value
  },
  {
    label: `${t('redeem_holofuel.holo_fuel_amount')}:`,
    value: `${formattedHfAmount.value} HF`
  },
  {
    label: `${t('redeem_holofuel.redemption_currency')}:`,
    value: modalProps.value.currency
  },
  {
    label: `${t('redeem_holofuel.redemption_amount')}:`,
    value: `${formattedRedemptionAmount.value} HOT`,
    tipMessage: t('redemption_history.transaction_price', { hf: 1, hot: 1 })
  },
  {
    label: `${t('redeem_holofuel.recipient_address_input_label')}:`,
    value: modalProps.value.hotAddress
  }
])
</script>

<template>
  <BaseModal
    :is-visible="visibleModal === EModal.redemption_initiated"
    @close="hideModal"
  >
    <div class="redemption-initiated-modal">
      <div	class="redemption-initiated-modal__header">
        <CheckCircleIcon class="redemption-initiated-modal__header-icon" />

        <p class="redemption-initiated-modal__header-label">
          {{ $t('redeem_holofuel.redemption_initiated') }}
        </p>
      </div>

      <div class="redemption-initiated-modal__description">
        <RedemptionInitiatedModalItem
          v-for="item in items"
          :key="item.label"
          :label="item.label"
          :value="item.value"
          :tip-message="item.tipMessage || ''"
        />
      </div>
    </div>

    <template #buttons>
      <BaseButton
        class="redemption-initiated-modal__button"
        @click="hideModal"
      >
        {{ $t('$.close') }}
      </BaseButton>
    </template>
  </BaseModal>
</template>

<style scoped lang="scss">
.redemption-initiated-modal {
  &__header {
    display: flex;
    flex-direction: column;
    justify-content: center;

    &-icon {
      height: 78px;
      color: var(--primary-color);
    }

    &-label {
      margin-top: 20px;
      font-size: 22px;
      font-weight: 700;
      line-height: 29px;
      color: var(--grey-dark-color);
    }
  }

  &__description {
    display: flex;
    flex-direction: column;
    margin-top: 40px;

    &-item {
      display: grid;
      grid-template-columns: 170px 1fr;
      text-align: start;
      margin-top: 16px;

      &-label {
        font-weight: 800;
        color: var(--grey-dark-color);
      }

      &-value {
        font-weight: 600;
        color: var(--grey-color);
        position: relative;
      }
    }
  }

  &__button {
    margin-top: 24px;
  }

  &__info-popover {
    position: absolute;
    top: 25px;
    left: 0px;
    width: 100px;
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

  @media screen and (max-width: 1050px) {
    &__description-item {
      display: grid;
      grid-template-columns: 170px;
      text-align: start;
      margin-top: 16px;
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
