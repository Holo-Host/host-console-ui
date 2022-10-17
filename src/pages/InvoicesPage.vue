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
        :is-disabled="isLoading || isError || invoices.length === 0"
        label-translation-key="$.filter_by"
        @update="onFilterChange"
      />
    </div>

    <BaseTable
      v-slot="{ items }"
      :is-loading="isLoading"
      :is-error="isError"
      :headers="[...headersMap.values()]"
      initial-sort-by="completed_date"
      :items="filteredInvoices"
      :empty-message-translation-key="emptyMessageTranslationKey"
      @try-again-clicked="getInvoices"
    >
      <InvoicesTableRow
        v-for="item in items"
        :key="item.id"
        is-paid
        :invoice="item"
      />
    </BaseTable>
  </PrimaryLayout>
</template>

<script setup>
import BaseSearchInput from '@uicommon/components/BaseSearchInput'
import BaseTable from '@uicommon/components/BaseTable'
import { formatCurrency } from '@uicommon/utils/numbers'
import InvoicesTableRow from 'components/invoices/InvoicesTableRow'
import PrimaryLayout from 'components/PrimaryLayout.vue'
import dayjs from 'dayjs'
import { ref, computed, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { kRoutes } from '../router'
import { useEarningsStore } from '../store/earnings'

const { t } = useI18n()
const router = useRouter()

const isLoading = ref(false)
const isError = ref(false)

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
        isPaidInvoices.value ? 'completed_date' : 'created_date',
        {
          key: isPaidInvoices.value ? 'completed_date' : 'created_date',
          label: t(
            isPaidInvoices.value ? 'invoices.headers.completed' : 'invoices.headers.created'
          ),
          isVisibleOnMobile: true,
          isSortable: true
        }
      ],
      [
        'expiration_date',
        {
          key: 'expiration_date',
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

const filterValue = ref('')
const filterIsActive = ref(false)

function onFilterChange({ value, isActive }) {
  filterIsActive.value = isActive
  filterValue.value = value
}

const invoices = computed(() => {
  const rawInvoices = isPaidInvoices.value
    ? earningsStore.paidInvoices
    : earningsStore.unpaidInvoices

  return Array.isArray(rawInvoices)
    ? rawInvoices.map((invoice) => ({
      ...invoice,
      formattedId: `...${invoice.id.substring(invoice.id.length - kVisibleHashLength)}`,
      happ: invoice.note.split(':')[1],
      formattedExpirationDate: dayjs(new Date(invoice.expiration_date / kMsInSecond)).format(
        kDefaultDateFormat
      ),
      amount: Number(invoice.amount),
      formattedCompletedDate: dayjs(invoice.completed_date / kMsInSecond).format(
        kDefaultDateFormat
      ),
      formattedCreatedDate: dayjs(invoice.created_date / kMsInSecond).format(kDefaultDateFormat),
      formattedAmount:
          invoice.amount && Number(invoice.amount) ? formatCurrency(Number(invoice.amount)) : 0,
      status: t(isPaidInvoices.value ? 'invoices.status.paid' : 'invoices.status.unpaid')
    }))
    : []
})

const kFilterCriteria = [
  {
    key: 'happ',
    minLength: 3,
    exact: false
  },
  {
    key: 'counterparty',
    minLength: 15,
    exact: true
  },
  {
    key: 'id',
    minLength: 15,
    exact: true
  },
  {
    key: 'amount',
    minLength: 3,
    exact: true
  }
]

const activeFilterCriteria = computed(() => {
  return kFilterCriteria.filter((criteria) => criteria.minLength <= filterValue.value.length)
})

const filteredInvoices = computed(() => {
  if (filterIsActive.value && filterValue.value) {
    let filteredInvoices = new Set([])

    console.log(activeFilterCriteria.value)

    activeFilterCriteria.value.forEach((criteria) => {
      filteredInvoices = new Set([
        ...filteredInvoices,
        ...invoices.value.filter((invoice) => {
          if (criteria.key === 'amount') {
            return (
              Number(`${invoice[criteria.key]}`.split('.')[0]) ===
              Number(filterValue.value.split('.')[0])
            )
          } else {
            return invoice[criteria.key].toLowerCase().includes(filterValue.value.toLowerCase())
          }
        })
      ])
    })

    return [...filteredInvoices]
  } else {
    return invoices.value
  }
})

const isPaidInvoices = computed(() => router.currentRoute.value.name === kRoutes.paidInvoices.name)

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
