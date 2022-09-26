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
        <InvoicesTableHeader
          :sort-by="sortBy"
          @sort-by-changed="onSortByChanged"
        />
        <template
          v-for="invoice in pagedInvoices"
          :key="invoice.id"
        >
          <tr :class="['invoice-row', {'expanded-parent-row': isExpanded(invoice)}]">
            <td class="happ-cell">
              {{ invoice.happ }}
            </td>
            <td class="desktop-cell">
              {{ presentPublisherHash(invoice.publisher) }}
            </td>
            <td class="desktop-cell">
              {{ presentDate(invoice.date_created) }}
            </td>
            <td class="mobile-cell">
              {{ presentShortDate(invoice.date_created) }}
            </td>
            <td class="desktop-cell">
              {{ presentDate(invoice.date_due) }}
            </td>
            <td class="desktop-cell">
              {{ invoice.id }}
            </td>
            <td class="amount-cell desktop-cell">
              {{ presentHolofuelAmount(invoice.amount) }}
            </td>
            <td class="amount-cell mobile-cell">
              {{ presentShortHolofuelAmount(invoice.amount) }}
            </td>
            <td class="pstatus-cell">
              {{ invoice.payment_status }}
              <RightChevronIcon
                :class="[isExpanded(invoice) ? 'up-chevron' : 'down-chevron']"
                color="#00CAD9"
                @click="toggleExpandInvoice(invoice)"
              />
            </td>
            <td class="desktop-cell">
              {{ invoice.exception_status }}
            </td>
          </tr>
          <tr
            v-if="isExpanded(invoice)"
            class="expanded-invoice-row"
          >
            <td
              class="expanded-invoice"
              colspan="4"
            >
              <div class="inner-row">
                <span class="label">Publisher</span><span class="data">{{ presentPublisherHash(invoice.publisher) }}</span>
              </div>
              <div class="inner-row">
                <span class="label">Date Due</span><span class="data">{{ presentDate(invoice.date_due) }}</span>
              </div>
              <div class="inner-row">
                <span class="label">Invoice #</span><span class="data">{{ invoice.id }}</span>
              </div>
              <div class="inner-row">
                <span class="label">Exception Status</span><span class="data">{{ invoice.exception_status }}</span>
              </div>
            </td>
          </tr>
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
import RightChevronIcon from 'components/icons/RightChevronIcon.vue'
import InvoicesTableHeader from 'components/InvoicesTableHeader'
import PrimaryLayout from 'components/PrimaryLayout.vue'
import mockInvoiceData from 'src/mockInvoiceData'
import { presentPublisherHash, presentHolofuelAmount, presentShortHolofuelAmount } from 'src/utils'
import { ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'

const SORT_HAPP = 'hApp'
const SORT_PUBLISHER = 'Publisher'
const SORT_CREATED = 'Date Created'
const SORT_DUE = 'Date Due'
const SORT_INVOICE = 'Invoice #'
const SORT_AMOUNT = 'HoloFuel'
const SORT_PAYMENT = 'Payment Status'
const SORT_EXCEPTION_STATUS = 'Exception Status'

const pageSizeOptions = ref([5, 10, 20, 30, 50])

const { t } = useI18n()

const invoices = ref(mockInvoiceData)
const filter = ref('All')
const sortBy = ref(SORT_CREATED)
const sortDesc = ref(true)
const pageSize = ref(10)
const page = ref(0)
const expandedInvoiceId = ref(null)

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
  const sortKey = {
    [SORT_HAPP]: 'happ',
    [SORT_PUBLISHER]: 'publisher',
    [SORT_CREATED]: 'date_created',
    [SORT_DUE]: 'date_due',
    [SORT_INVOICE]: 'id',
    [SORT_AMOUNT]: 'amount',
    [SORT_PAYMENT]: 'payment_status',
    [SORT_EXCEPTION_STATUS]: 'exception_status'
  }[sortBy.value]

  const invoicesCopy = [...invoices.value]

  return invoicesCopy.sort((a, b) => {
    if (a[sortKey] === b[sortKey]) {
      return 0
    }

    if (sortDesc.value) {
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
  date.format('DD MMM YYYY')
}

function presentShortDate(date) {
  return date.format('DD MMM')
}

function onSortByChanged({ name, direction }) {
  sortBy.value = name
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

function isExpanded(invoice) {
  return invoice.id === expandedInvoiceId.value
}

function toggleExpandInvoice(invoice) {
  if (isExpanded(invoice)) {
    expandedInvoiceId.value = null
  } else {
    expandedInvoiceId.value = invoice.id
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
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: var(--grey-color);
  border-collapse: collapse;
  width: 100%;
}

.invoice-row {
  border-bottom: 0.5px solid #bcbfc6;
}

.invoice-row:last-child {
  border: none;
}

.invoice-row td {
  text-align: start;
  padding: 10px 0 14px 20px;
}

.happ-cell,
.amount-cell {
  font-weight: bold;
}

.invoice-row td.amount-cell {
  text-align: end;
  padding-right: 20px;
}

.header-row th[title='HoloFuel'] {
  text-align: end;
}

.pstatus-cell {
  display: flex;
  align-items: center;
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

.up-chevron {
  display: none;
}

.down-chevron {
  display: none;
}

.mobile-cell {
  display: none;
}

.expanded-invoice-row {
  display: none;
  box-shadow: 0 2px 6px rgba(96, 108, 139, 0.4);
}

@media screen and (max-width: 1050px) {
  .desktop-cell {
    display: none;
  }
  .mobile-cell {
    display: table-cell;
  }

  .up-chevron {
    display: flex;
    transform: scale(1.4) rotate(270deg);
    padding: 5px;
    margin: -1px 0 0 auto;
  }

  .down-chevron {
    display: flex;
    transform: scale(1.4) rotate(90deg);
    padding: 5px;
    margin: 6px 0 -5px auto;
  }

  .expanded-invoice-row {
    display: table-row;
  }

  .expanded-parent-row {
    border-bottom: none;
    font-weight: 800;
  }

  .expanded-invoice {
    padding: 12px;
    line-height: 36px;
  }

  .expanded-invoice .inner-row {
    display: flex;
  }

  .expanded-invoice .inner-row .label {
    flex-basis: 50%;
    font-weight: 600;
    font-size: 16px;
    color: var(--grey-dark-color);
  }

  .expanded-invoice .inner-row .data {
    flex-basis: 50%;
    font-weight: 600;
    font-size: 14px;
    color: var(--grey-color);
  }

  .header-row th {
    padding: 20px 0 30px 0;
  }
  .invoice-row td {
    padding: 10px 0 14px 0;
  }
  .header-row th[title='HoloFuel'].selected {
    padding-right: 10px;
  }
  .invoice-row td.amount-cell {
    padding-right: 20px;
  }
}
</style>
