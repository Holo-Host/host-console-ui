<template>
  <PrimaryLayout
    :title="$t('earnings.paid_invoices')"
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
import mockPaidInvoicesData from 'src/mockInvoiceData'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const headersMap = new Map([
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
    'completed_date',
    {
      key: 'completed_date',
      label: t('invoices.headers.completed'),
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

const rawInvoices = ref(mockPaidInvoicesData)

const kMsInSecond = 1000
const kDefaultDateFormat = 'D MMM YYYY'
const kVisibleHashLength = 6

const invoices = computed(() =>
  rawInvoices.value.map((invoice) => ({
    ...invoice,
    formattedId: `...${invoice.id.substring(invoice.id.length - kVisibleHashLength)}`,
    happ: invoice.note.split(':')[1],
    formattedExpirationDate: dayjs(new Date(invoice.expiration_date / kMsInSecond)).format(
      kDefaultDateFormat
    ),
    amount: Number(invoice.amount),
    formattedCompletedDate: dayjs(invoice.completed_date / kMsInSecond).format(kDefaultDateFormat),
    formattedAmount:
      invoice.amount && Number(invoice.amount) ? formatCurrency(Number(invoice.amount)) : 0,
    status: t('invoices.status.paid')
  }))
)

const breadcrumbs = computed(() => [
  {
    label: t('$.earnings'),
    path: '/earnings'
  },
  {
    label: t('earnings.paid_invoices')
  }
])
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
