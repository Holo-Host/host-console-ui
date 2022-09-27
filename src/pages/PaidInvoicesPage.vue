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
      <select
        v-model="filter"
        class="dropdown"
      >
        <option value="All">
          {{ 'All' }}
        </option>
      </select>
    </div>

    <BaseCard>
      <table class="invoices">
        <BaseTableHeader
          :headers="headersMap.values()"
          :sort-by="sortBy"
          @sort-by-changed="onSortByChanged"
        />

        <template
          v-for="invoice in pagedInvoices"
          :key="invoice.id"
        >
          <BaseTableRow>
            <BaseTableRowItem
              :value="invoice.happ"
              is-visible-on-mobile
              is-bold
            />

            <BaseTableRowItem
              :value="invoice.publisher"
            />

            <BaseTableRowItem
              :value="invoice.date_created"
              is-visible-on-mobile
            />

            <BaseTableRowItem
              :value="invoice.date_completed"
            />

            <BaseTableRowItem
              :value="invoice.id"
            />

            <BaseTableRowItem
              :value="invoice.amount"
              is-visible-on-mobile
              is-bold
              align="end"
            />

            <BaseTableRowItem
              :value="invoice.payment_status"
              is-visible-on-mobile
            />

            <template #expanded-content>
              <PaidInvoicesExpandableContent
                :invoice="invoice"
              />
            </template>
          </BaseTableRow>
        </template>
      </table>
    </BaseCard>
    <div class="footer">
      Rows per page:&nbsp;&nbsp;
      <select
        v-model="pageSize"
        class="dropdown"
      >
        <option
          v-for="option in pageSizeOptions"
          :key="option"
          :value="option"
        >
          {{ option }}
        </option>
      </select>
      <div class="pagination">
        {{ paginationLegend }}
        <RightChevronIcon
          class="page-arrow-left"
          :color="hasPrevPage ? '#00CAD9' : '#606C8B'"
          @click="hasPrevPage && goToPrevPage()"
        />
        <RightChevronIcon
          class="page-arrow-right"
          :color="hasNextPage ? '#00CAD9' : '#606C8B'"
          @click="hasNextPage && goToNextPage()"
        />
      </div>
    </div>
  </PrimaryLayout>
</template>

<script setup>
import BaseCard from '@uicommon/components/BaseCard'
import BaseTableHeader from '@uicommon/components/BaseTableHeader'
import BaseTableRow from '@uicommon/components/BaseTableRow'
import BaseTableRowItem from '@uicommon/components/BaseTableRowItem'
import RightChevronIcon from 'components/icons/RightChevronIcon.vue'
import PaidInvoicesExpandableContent from 'components/invoices/PaidInvoicesExpandableContent'
import PrimaryLayout from 'components/PrimaryLayout.vue'
import dayjs from 'dayjs'
import mockInvoiceData from 'src/mockInvoiceData'
import { presentHolofuelAmount } from 'src/utils'
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const pageSizeOptions = ref([5, 10, 20, 30, 50])

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
    amount: presentHolofuelAmount(invoice.amount),
    date_created: presentDate(invoice.date_created),
    date_completed: presentDate(invoice.date_completed)
  }))
)
const filter = ref('All')
const sortBy = ref('date_created')
const sortDesc = ref(true)
const pageSize = ref(10)
const page = ref(0)

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

const paginationLegend = computed(() => {
  const first = page.value * pageSize.value + 1
  const last = first + pagedInvoices.value.length - 1
  return `${first}-${last} of ${invoiceCount.value} items`
})

const hasPrevPage = computed(() => page.value > 0)
const hasNextPage = computed(() => (page.value + 1) * pageSize.value <= invoiceCount.value)

const sortedInvoices = computed(() => {
  const sortKey = sortBy.value
  const sortDescValue = sortDesc.value

  const invoicesCopy = [...invoices.value]

  return invoicesCopy.sort((a, b) => {
    if (a[sortKey] === b[sortKey]) {
      return 0
    }

    if (sortDescValue) {
      return a[sortKey] > b[sortKey] ? -1 : 1
    } else {
      return a[sortKey] < b[sortKey] ? -1 : 1
    }
  })
})

const pagedInvoices = computed(() => {
  const startIndex = page.value * pageSize.value
  const endIndex = (page.value + 1) * pageSize.value
  return sortedInvoices.value.slice(startIndex, endIndex)
})

const invoiceCount = computed(() => sortedInvoices.value.length)

watch(pageSize, () => (page.value = 0))
watch(filter, () => (page.value = 0))

function presentDate(date) {
  return dayjs(date).format('DD MMM YYYY')
}

function onSortByChanged({ key, direction }) {
  sortBy.value = key
  sortDesc.value = direction === 'desc'
}

function goToPrevPage() {
  if (hasPrevPage.value) {
    page.value = page.value - 1
  }
}

function goToNextPage() {
  if (hasNextPage.value) {
    page.value = page.value + 1
  }
}
</script>

<style scoped>
.controls {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 300px;
  padding-bottom: 10px;
}

.controls .label {
  color: var(--grey-color);
  font-size: 12px;
  margin-left: 30px;
  margin-right: 2px;
}

.dropdown {
  appearance: none;
  border: none;
  background-color: transparent;
  font-size: 12px;
  font-weight: 600;
  color: var(--grey-dark-color);
  padding: 4px 16px 4px 4px;
  background-image: url(/images/chevron.svg);
  background-repeat: no-repeat;
  background-position: right;
}

.invoices-padding {
  background: #ffffff;
  box-shadow: 0 4px 20px #eceef1;
  border-radius: 12px;
  padding: 0 10px;
  margin-bottom: 20px;
}

.invoices {
  border-collapse: collapse;
}

.footer {
  display: flex;
  width: 100%;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  color: var(--grey-dark-color);
  margin-bottom: 20px;
}

.pagination {
  margin-left: auto;
}

.page-arrow-right {
  margin-left: 40px;
  transform: scale(1.4);
}

.page-arrow-left {
  margin-left: 40px;
  transform: scale(1.4) rotate(180deg);
}
</style>
