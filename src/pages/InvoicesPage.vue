<template>
  <PrimaryLayout
    :title="$t(pageHeaderTranslationKey)"
    :breadcrumbs="breadcrumbs"
    data-testid="earnings-invoices-page"
  >
    <div class="controls">
      <div class="label">
        Filter by:&nbsp;
      </div>
    </div>

    <BaseTable
      v-slot="{ items }"
      :headers="[...headersMap.values()]"
      initial-sort-by="completed_date"
      :items="invoices"
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
import BaseTable from '@uicommon/components/BaseTable'
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

const invoices = computed(() => {
  const rawInvoices = isPaidInvoices.value
    ? earningsStore.paidInvoices
    : earningsStore.unpaidInvoices

  return rawInvoices.map((invoice) => ({
    ...invoice,
    formattedId: `...${invoice.id.substring(invoice.id.length - kVisibleHashLength)}`,
    happ: invoice.note.split(':')[1],
    formattedExpirationDate: dayjs(new Date(invoice.expiration_date / kMsInSecond)).format(
      kDefaultDateFormat
    ),
    amount: Number(invoice.amount),
    formattedCompletedDate: dayjs(invoice.completed_date / kMsInSecond).format(kDefaultDateFormat),
    formattedCreatedDate: dayjs(invoice.created_date / kMsInSecond).format(kDefaultDateFormat),
    formattedAmount:
      invoice.amount && Number(invoice.amount) ? formatCurrency(Number(invoice.amount)) : 0,
    status: t(isPaidInvoices.value ? 'invoices.status.paid' : 'invoices.status.unpaid')
  }))
})

const isPaidInvoices = computed(() => router.currentRoute.value.name === kRoutes.paidInvoices.name)

const pageHeaderTranslationKey = computed(() =>
  isPaidInvoices.value ? 'earnings.paid_invoices' : 'earnings.unpaid_invoices'
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
  isLoading.value = true
  isPaidInvoices.value ? await earningsStore.getPaidInvoices() : earningsStore.getUnpaidInvoices()
  isLoading.value = false
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

.controls .label {
  color: var(--grey-color);
  font-size: 12px;
  margin-left: 30px;
  margin-right: 2px;
}
</style>
