<template>
  <PrimaryLayout
    title="earnings.redemption_history"
    :breadcrumbs="breadcrumbs"
    data-test-redemption-history-page-layout
  >
    <div data-test-redemption-history-page-table>
      <BaseTable
        v-slot="{ items }"
        :is-loading="isLoading"
        :is-error="isError"
        :headers="[...headersMap.values()]"
        :initial-sort-by="'createdDate'"
        :items="redemptions"
        empty-message-translation-key="redemption_history.errors.no_redemptions"
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

const headersMap = computed(
  () =>
    new Map([
      [
        'createdDate',
        {
          key: 'createdDate',
          label: t('redemption_history.headers.created'),
          isVisibleOnMobile: true,
          isSortable: true,
          type: 'date'
        }
      ],
      [
        'completedAmount',
        {
          key: 'completedAmount',
          label: t('redemption_history.headers.hf_amount'),
          isVisibleOnMobile: false,
          isSortable: true,
          type: 'string'
        }
      ],
      [
        'redemptionAmount',
        {
          key: 'redemptionAmount',
          label: t('redemption_history.headers.redemption_amount'),
          isVisibleOnMobile: false,
          isSortable: true,
          align: 'end',
          type: 'string'
        }
      ],
      [
        'transactionId',
        {
          key: 'transactionId',
          label: t('redemption_history.headers.transaction_id'),
          isVisibleOnMobile: true,
          isSortable: true,
          type: 'string'
        }
      ],
      [
        'status',
        {
          key: 'status',
          label: t('redemption_history.headers.status'),
          isVisibleOnMobile: true,
          isSortable: true,
          type: 'string'
        }
      ]
    ])
)

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
      formattedRedemptionAmount:
          redemption.redemptionAmount && Number(redemption.redemptionAmount)
            ? formatCurrency(Number(redemption.redemptionAmount))
            : '---',
      formattedTransactionId: redemption.transactionId
          ? `...${redemption.transactionId.substring(
              redemption.transactionId.length - kVisibleHashLength
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
