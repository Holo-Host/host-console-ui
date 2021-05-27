<template>
  <PrimaryLayout :breadcrumbs="breadcrumbs">
    <div class="controls">
      <div class="label">
        Filter:&nbsp;
      </div>
      <select v-model="filter" class="filter">
        <option v-for="option in filterOptions" :value="option" :key="option">
          {{ option }}
        </option>
      </select>
    </div>
    <div class='invoices-padding'>
      <table class="invoices">
        <tr class='header-row'>
          <th v-for="header in headers"
            :key='header'
            @click="handleHeaderClick(header)"
            :class="{ selected: header === sort }"
            :title="header"
          >
            {{ header }}
            <ShortUpArrowIcon :color="header === sort ? '#000' : '#FFF'" :class="{ 'upside-down': sortDesc }"/>
          </th>
        </tr>
        <tr v-for="invoice in filteredSortedInvoices" class='invoice-row' :key='invoice.id'>
          <td class='happ-cell'>
            {{ invoice.happ }}
          </td>
          <td>
            {{ presentPublisherHash(invoice.publisher) }}
          </td>
          <td>
            {{ presentDate(invoice.date_created) }}
          </td>
          <td>
            {{ presentDate(invoice.date_due) }}
          </td>
          <td>
            {{ invoice.id }}
          </td>
          <td class='amount-cell'>
            {{ presentHolofuelAmount(invoice.amount) }}
          </td>
          <td>
            {{ invoice.payment_status }}
          </td>
          <td>
            {{ invoice.exception_status }}
          </td>
        </tr>
      </table>
    </div>
  </PrimaryLayout>
</template>

<script>

import PrimaryLayout from 'components/PrimaryLayout.vue'
import ShortUpArrowIcon from 'components/icons/ShortUpArrowIcon.vue'
import mockInvoiceData, { PSTATUS_LATE, PSTATUS_PAID, PSTATUS_UNPAID, ESTATUS_EXCEPTION } from 'src/mockInvoiceData'
import { presentPublisherHash, presentHolofuelAmount } from 'src/utils'

const SORT_HAPP = 'hApp'
const SORT_PUBLISHER = 'Publisher'
const SORT_CREATED = 'Date Created'
const SORT_DUE = 'Date Due'
const SORT_INVOICE = 'Invoice #'
const SORT_AMOUNT = 'Amount'
const SORT_PAYMENT = 'Payment Status'
const SORT_EXCEPTION_STATUS = 'Exception Status'

const FILTER_ALL = 'All'
const FILTER_UNPAID_LATE = 'Unpaid & Late'
const FILTER_PAID = 'Paid'
const FILTER_EXCEPTIONS = 'Exceptions'

export default {
  name: 'EarningsInvoices',
  components: {
    PrimaryLayout,
    ShortUpArrowIcon
  },
  data () {
    return {
      invoices: mockInvoiceData,
      headers: [
        SORT_HAPP,
        SORT_PUBLISHER,
        SORT_CREATED,
        SORT_DUE,
        SORT_INVOICE,
        SORT_AMOUNT,
        SORT_PAYMENT,
        SORT_EXCEPTION_STATUS
      ],
      filter: FILTER_ALL,
      sort: SORT_CREATED,
      sortDesc: true
    }
  },
  computed: {
    breadcrumbs () {
      return [{
        label: 'Earnings',
        path: '/earnings'
      }, {
        label: 'Invoices'
      }]
    },
    filterOptions: () => [FILTER_ALL, FILTER_UNPAID_LATE, FILTER_PAID, FILTER_EXCEPTIONS],
    filteredSortedInvoices () {
      let filtered
      switch (this.filter) {
        case FILTER_ALL:
            filtered = this.invoices
          break;
        case FILTER_UNPAID_LATE:
            filtered = this.invoices.filter(invoice => invoice.payment_status === PSTATUS_UNPAID || invoice.payment_status === PSTATUS_LATE)
          break;
        case FILTER_PAID:
            filtered = this.invoices.filter(invoice => invoice.payment_status === PSTATUS_PAID)
          break;
        case FILTER_EXCEPTIONS:
            filtered = this.invoices.filter(invoice => invoice.exception_status === ESTATUS_EXCEPTION)
          break;
        default:
            filtered = this.invoices
          break;
      }

      const sortKey = ({
        [SORT_HAPP]: 'happ',
        [SORT_PUBLISHER]: 'publisher',
        [SORT_CREATED]: 'date_created',
        [SORT_DUE]: 'date_due',
        [SORT_INVOICE]: 'id',
        [SORT_AMOUNT]: 'amount',
        [SORT_PAYMENT]: 'payment_status',
        [SORT_EXCEPTION_STATUS]: 'exception_status'
      })[this.sort]

      return filtered.sort((a, b) =>
        this.sortDesc
          ? a[sortKey] > b[sortKey]
            ? -1
            : 1
          : a[sortKey] < b[sortKey]
            ? -1
            : 1)
    }
  },
  methods: {
    presentPublisherHash,
    presentDate (date) {
      return date.format("D MMM YYYY")
    },
    presentHolofuelAmount,
    handleHeaderClick (header) {
      if (this.sort === header) {
        this.sortDesc = !this.sortDesc
      } else {
        this.sort = header
      }
    }
  }
}

</script>

<style scoped>
.controls {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  padding: 9px 0;
}
.label {
  color: #606C8B;
  font-size: 12px;
  margin-left: 30px;
  margin-right: 2px;
}
.filter {
  appearance: none;
  border: none;
  background-color: transparent;
  font-size: 12px;
  font-weight: 600;
  color: #313C59;
  padding: 4px 16px 4px 4px;
  background-image: url(/images/chevron.svg);
  background-repeat: no-repeat;
  background-position: right;
}
.invoices-padding {
  background: #FFFFFF;
  box-shadow: 0px 4px 20px #ECEEF1;
  border-radius: 12px;
  padding: 0 10px;
}
.invoices {
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: #606C8B;
  border-collapse: collapse;
  width: 100%;
}
.header-row {
  font-size: 16px;
  line-height: 22px;
  color: #313C59;
  border-bottom: 0.5px solid #BCBFC6;
}
.header-row th {
  text-align: start;
  padding: 20px 0 30px 22px;
  font-weight: 600;
  cursor: pointer;
}

.upside-down {
  transform: rotate(180deg);
}
th.selected {
  font-weight: 700;
}
/* this rule prevents the layout from jumping when the font-weight changes */
th::after {
  display: block;
  content: attr(title);
  font-weight: 700;
  height: 1px;
  color: transparent;
  overflow: hidden;
  visibility: hidden;
}
.invoice-row {
  border-bottom: 0.5px solid #BCBFC6;
}
.invoice-row:last-child {
  border: none;
}
.invoice-row td {
  text-align: start;
  padding: 10px 0 14px 20px;
}
.happ-cell, .amount-cell {
  font-weight: bold;
}

@media screen and (max-width: 1050px) {

}
</style>