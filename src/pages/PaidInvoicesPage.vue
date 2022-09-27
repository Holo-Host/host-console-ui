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
      initial-sort-by="date_created"
      :items="invoices"
    >
      <InvoicesTableItem
        v-for="item in items"
        :key="item.id"
        :invoice="item"
      />
    </BaseTable>
  </PrimaryLayout>
</template>

<script setup>
import BaseTable from '@uicommon/components/BaseTable'
import InvoicesTableItem from 'components/invoices/InvoicesTableItem'
import PrimaryLayout from 'components/PrimaryLayout.vue'
import mockInvoiceData from 'src/mockInvoiceData'
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const headersMap = new Map([
  [
    'happ',
    {
      key: 'happ',
      label: t('invoices.headers.happ'),
      isVisibleOnMobile: true
    }
  ],
  [
    'publisher',
    {
      key: 'publisher',
      label: t('invoices.headers.publisher'),
      isVisibleOnMobile: false
    }
  ],
  [
    'date_created',
    {
      key: 'date_created',
      label: t('invoices.headers.created'),
      isVisibleOnMobile: true
    }
  ],
  [
    'date_completed',
    {
      key: 'date_completed',
      label: t('invoices.headers.completed'),
      isVisibleOnMobile: false
    }
  ],
  [
    'id',
    {
      key: 'id',
      label: t('invoices.headers.invoice'),
      isVisibleOnMobile: false
    }
  ],
  [
    'amount',
    {
      key: 'amount',
      label: t('invoices.headers.amount'),
      isVisibleOnMobile: true,
      align: 'end'
    }
  ],
  [
    'payment_status',
    {
      key: 'payment_status',
      label: t('invoices.headers.payment_status'),
      isVisibleOnMobile: true
    }
  ]
])

const invoices = ref(
  mockInvoiceData.map((invoice) => ({
    ...invoice,
    publisher: 'mocked-data'
  }))
)

// eslint-disable-next-line no-magic-numbers

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
