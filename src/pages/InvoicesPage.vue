<template>
  <PrimaryLayout
    :title="$t(pageHeaderTranslationKey)"
    :breadcrumbs="breadcrumbs"
    data-testid="invoices-page"
  >
    <div
      class="controls"
      data-testid="invoices-page-filters"
    >
      <BaseSearchInput
        :value="filterValue"
        :is-disabled="!isFilteringEnabled"
        label-translation-key="$.filter_by"
        @update="setFilter"
      />
    </div>

    <BaseTable
      v-slot="{ items }"
      :is-loading="isLoading"
      :is-error="isError"
      :headers="[...headersMap.values()]"
      :initial-sort-by="isPaidInvoices ? 'completedDate' : 'createdDate'"
      :items="filteredData"
      :empty-message-translation-key="emptyMessageTranslationKey"
      @try-again-clicked="getInvoices"
    >
      <InvoicesTableRow
        v-for="item in items"
        :key="item.id"
        :is-paid="isPaidInvoices"
        :invoice="item"
      />
    </BaseTable>
  </PrimaryLayout>
</template>

<script setup>
import BaseSearchInput from '@uicommon/components/BaseSearchInput'
import BaseTable from '@uicommon/components/BaseTable'
import { useFilter, EFilterTypes } from '@uicommon/composables/useFilter'
import { formatCurrency } from '@uicommon/utils/numbers'
import InvoicesTableRow from 'components/invoices/InvoicesTableRow'
import PrimaryLayout from 'components/PrimaryLayout.vue'
import dayjs from 'dayjs'
import { ref, computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { kRoutes } from '../router'
import { useEarningsStore } from '../store/earnings'

const { t } = useI18n()
const router = useRouter()

const isLoading = ref(false)
const isError = ref(false)

const isFilteringEnabled = computed(
  () => !isLoading.value && !isError.value && invoices.value.length > 0
)

const earningsStore = useEarningsStore()

const headersMap = computed(
  () =>
    new Map([
      [
        'happ',
        {
          key: 'happ',
          label: t('invoices.headers.happ'),
          isVisibleOnMobile: true,
          isSortable: true
        }
      ],
      [
        'counterparty',
        {
          key: 'counterparty',
          label: t('invoices.headers.publisher'),
          isVisibleOnMobile: false,
          isSortable: true
        }
      ],
      [
        isPaidInvoices.value ? 'completedDate' : 'createdDate',
        {
          key: isPaidInvoices.value ? 'completedDate' : 'createdDate',
          label: t(
            isPaidInvoices.value ? 'invoices.headers.completed' : 'invoices.headers.created'
          ),
          isVisibleOnMobile: true,
          isSortable: true
        }
      ],
      [
        'expirationDate',
        {
          key: 'expirationDate',
          label: t('invoices.headers.due'),
          isVisibleOnMobile: false,
          isSortable: true
        }
      ],
      [
        'formattedId',
        {
          key: 'formattedId',
          label: t('invoices.headers.invoice'),
          isVisibleOnMobile: false,
          isSortable: true
        }
      ],
      [
        'amount',
        {
          key: 'amount',
          label: t('invoices.headers.amount'),
          isVisibleOnMobile: true,
          isSortable: true,
          align: 'end'
        }
      ],
      [
        'status',
        {
          key: 'payment_status',
          label: t('invoices.headers.payment_status'),
          isVisibleOnMobile: true,
          isSortable: false
        }
      ]
    ])
)

const kMsInSecond = 1000
const kDefaultDateFormat = 'DD MMM YYYY'
const kVisibleHashLength = 6

const isPaidInvoices = computed(() => router.currentRoute.value.name === kRoutes.paidInvoices.name)

const invoices = computed(() => {
  const rawInvoices = isPaidInvoices.value
    ? earningsStore.paidInvoices
    : earningsStore.unpaidInvoices

  return Array.isArray(rawInvoices)
    ? rawInvoices.map((invoice) => ({
      ...invoice,
      formattedId: `...${invoice.id.substring(invoice.id.length - kVisibleHashLength)}`,
      happ: invoice.happ.name,
      formattedExpirationDate: dayjs(new Date(invoice.expirationDate / kMsInSecond)).format(
        kDefaultDateFormat
      ),
      amount: Number(invoice.amount),
      formattedCompletedDate: dayjs(invoice.completedDate / kMsInSecond).format(
        kDefaultDateFormat
      ),
      formattedCreatedDate: dayjs(invoice.createdDate / kMsInSecond).format(kDefaultDateFormat),
      formattedAmount:
          invoice.amount && Number(invoice.amount) ? formatCurrency(Number(invoice.amount)) : 0,
      status: t(isPaidInvoices.value ? 'invoices.status.paid' : 'invoices.status.unpaid')
    }))
    : []
})

const kFilterCriteria = [
  {
    key: 'happ',
    type: EFilterTypes.string,
    minLength: 3,
    exact: false
  },
  {
    key: 'counterparty',
    type: EFilterTypes.string,
    minLength: 15,
    exact: true
  },
  {
    key: 'id',
    type: EFilterTypes.string,
    minLength: 15,
    exact: true
  },
  {
    key: 'amount',
    type: EFilterTypes.number,
    minLength: 3,
    exact: false
  }
]

const { filteredData, setFilter, filterValue } = useFilter({
  data: invoices,
  criteria: kFilterCriteria
})

const pageHeaderTranslationKey = computed(() =>
  isPaidInvoices.value ? 'earnings.paid_invoices' : 'earnings.unpaid_invoices'
)

const emptyMessageTranslationKey = computed(() =>
  isPaidInvoices.value ? 'invoices.errors.no_paid_invoices' : 'invoices.errors.no_unpaid_invoices'
)

const breadcrumbs = computed(() => [
  {
    label: t('$.earnings'),
    path: '/earnings'
  },
  {
    label: t(isPaidInvoices.value ? 'earnings.paid_invoices' : 'earnings.unpaid_invoices')
  }
])

async function getInvoices() {
  isError.value = false
  isLoading.value = true

  const rawInvoices = isPaidInvoices.value
    ? await earningsStore.getPaidInvoices()
    : await earningsStore.getUnpaidInvoices()

  isLoading.value = false

  if (!rawInvoices) {
    isError.value = true
  }
}

onMounted(async () => {
  await getInvoices()
})
</script>

<style scoped>
.controls {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding-bottom: 10px;
}
</style>
