<script setup lang="ts">
import BaseTable from '@uicommon/components/BaseTable.vue'
import { formatCurrency } from '@uicommon/utils/numbers'
import dayjs from 'dayjs'
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import RedemptionHistoryTableRow from '@/components/earnings/RedemptionHistoryTableRow.vue'
import PrimaryLayout from '@/components/PrimaryLayout.vue'
import { useEarningsStore } from '@/store/earnings'
import type { BreadCrumb } from '@/types/types'

const { t } = useI18n()

const isLoading = ref(false)
const isError = ref(false)

const earningsStore = useEarningsStore()

const kMsInSecond = 1000
const kDefaultDateFormat = 'DD MMM YYYY'
const kVisibleHashLength = 6

const redemptions = computed(() => {
  const rawRedemptions = earningsStore.redemptions

  return Array.isArray(rawRedemptions)
    ? rawRedemptions.map((redemption) => ({
        ...redemption,
        formattedCreatedDate: dayjs(redemption.createdDate / kMsInSecond).format(
          kDefaultDateFormat
        ),
        formattedHfAmount:
          redemption.completedAmount && Number(redemption.completedAmount)
            ? formatCurrency(Number(redemption.completedAmount))
            : redemption.requestedAmount && Number(redemption.requestedAmount)
            ? formatCurrency(Number(redemption.requestedAmount))
            : 0,
        formattedRequestedAmount:
          redemption.requestedAmount && Number(redemption.requestedAmount)
            ? formatCurrency(Number(redemption.requestedAmount))
            : '---',
        formattedRedemptionAmount:
          redemption.redemptionAmount && Number(redemption.redemptionAmount)
            ? formatCurrency(Number(redemption.redemptionAmount))
            : '---',
        formattedTransactionId: redemption.transactionId
          ? `...${redemption.transactionId.substring(
              redemption.transactionId.length - kVisibleHashLength
            )}`
          : '---',
      formattedTransactionEthHash: redemption.transactionEthHash
          ? `...${redemption.transactionEthHash.substring(
              redemption.transactionEthHash.length - kVisibleHashLength
            )}`
          : '---'
      }))
    : []
})

const breadcrumbs = computed((): BreadCrumb[] => [
  {
    label: t('$.earnings'),
    path: '/earnings'
  },
  {
    label: t('earnings.redemption_history')
  }
])

const hasPartialRedemption = computed(() => {
  return redemptions.value.some((redemption) => redemption.isPartial)
})

const headersMap = computed(
  () =>
    new Map([
      [
        'createdDate',
        {
          key: 'createdDate',
          label: t('redemption.history.headers.created'),
          isVisibleOnMobile: true,
          isSortable: true,
          type: 'date'
        }
      ],
      [
        'completedAmount',
        {
          key: 'completedAmount',
          label: t('redemption.history.headers.hf_amount'),
          description: hasPartialRedemption.value ? '*partial redemption' : '',
          isVisibleOnMobile: false,
          isSortable: true
        }
      ],
      [
        'redemptionAmount',
        {
          key: 'redemptionAmount',
          label: t('redemption.history.headers.redemption_amount'),
          isVisibleOnMobile: true,
          isSortable: true,
          align: 'end'
        }
      ],
      [
        'transactionId',
        {
          key: 'transactionId',
          label: t('redemption.history.headers.transaction_id'),
          isVisibleOnMobile: true,
          isSortable: true,
          type: 'string'
        }
      ],
      [
        'transactionEthHash',
        {
          key: 'transactionEthHash',
          label: t('redemption.history.headers.transaction_eth_hash'),
          isVisibleOnMobile: true,
          isSortable: true,
          type: 'string'
        }
      ],
      [
        'status',
        {
          key: 'status',
          label: t('redemption.history.headers.status'),
          isVisibleOnMobile: true,
          isSortable: true,
          type: 'string'
        }
      ]
    ])
)

async function getRedemptionHistory(): Promise<void> {
  isError.value = false
  isLoading.value = true

  const rawRedemptions = await earningsStore.getRedemptionHistory()

  isLoading.value = false

  if (!rawRedemptions) {
    isError.value = true
  }
}

onMounted(async (): Promise<void> => {
  await getRedemptionHistory()
})
</script>

<template>
  <PrimaryLayout
    title="earnings.redemption_history"
    :breadcrumbs="breadcrumbs"
    data-test-redemption-history-page-layout
  >
    <div
      class="redemption-history-page__table"
      data-test-redemption-history-page-table
    >
      <BaseTable
        v-slot="{ items }"
        :is-loading="isLoading"
        :is-error="isError"
        :headers="[...headersMap.values()]"
        initial-sort-by="createdDate"
        :items="redemptions"
        empty-message-translation-key="redemption.history.errors.no_redemptions"
        @try-again-clicked="getRedemptionHistory"
      >
        <RedemptionHistoryTableRow
          v-for="item in items"
          :key="item.id"
          :redemption="item"
        />
      </BaseTable>
    </div>
  </PrimaryLayout>
</template>

<style lang="scss">
.redemption-history-page {
  &__table {
    position: relative;
  }

  &__table-legend {
    position: absolute;
    bottom: 20px;
    left: 264px;
    font-size: 14px;
    line-height: 16px;
    font-weight: 600;
    color: var(--grey-dark-color);
  }
}
</style>
