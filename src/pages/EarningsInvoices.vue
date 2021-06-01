<template>
  <PrimaryLayout :breadcrumbs="breadcrumbs">
    <div class="controls">
      <div class="label">
        Filter:&nbsp;
      </div>
      <select v-model="filter" class="dropdown">
        <option v-for="option in filterOptions" :value="option" :key="option">
          {{ option }}
        </option>
      </select>
    </div>
    <div class='invoices-padding'>
      <table class="invoices">
        <tr class='header-row'>
          <th v-for="{ name } in headers"
            :key='name'
            @click="handleHeaderClick(name)"
            :class="[{ selected: name === sort }, 'desktop-cell']"
            :title="name"
          >
            {{ name }}
            <ShortUpArrowIcon :color="name === sort ? '#000' : '#FFF'" :class="{ 'rotate-180': sortDesc }"/>
          </th>
          <th v-for="{ mobileName, name } in mobileHeaders"
            :key='mobileName'
            @click="handleHeaderClick(name)"
            :class="[{ selected: name === sort }, 'mobile-cell']"
            :title="mobileName"
          >
            {{ mobileName }}
            <ShortUpArrowIcon :color="name === sort ? '#000' : '#FFF'" :class="{ 'rotate-180': sortDesc }"/>
          </th>
        </tr>
        <template v-for="invoice in pagedInvoices" :key='invoice.id'>
          <tr :class="['invoice-row', {'expanded-parent-row': isExpanded(invoice)}]">
            <td class='happ-cell'>
              {{ invoice.happ }}
            </td>
            <td class='desktop-cell'>
              {{ presentPublisherHash(invoice.publisher) }}
            </td>
            <td class='desktop-cell'>
              {{ presentDate(invoice.date_created) }}
            </td>
            <td class='mobile-cell'>
              {{ presentShortDate(invoice.date_created) }}
            </td>
            <td class='desktop-cell'>
              {{ presentDate(invoice.date_due) }}
            </td>
            <td class='desktop-cell'>
              {{ invoice.id }}
            </td>
            <td class='amount-cell desktop-cell'>
              {{ presentHolofuelAmount(invoice.amount) }}
            </td>
            <td class='amount-cell mobile-cell'>
              {{ presentShortHolofuelAmount(invoice.amount) }}
            </td>
            <td class='pstatus-cell'>
              {{ invoice.payment_status }}
              <RightChevronIcon @click="toggleExpandInvoice(invoice)" :class="[isExpanded(invoice) ? 'up-chevron' : 'down-chevron']" color="#00CAD9" />
            </td>
            <td class='desktop-cell'>
              {{ invoice.exception_status }}
            </td>
          </tr>
          <tr v-if="isExpanded(invoice)" class='expanded-invoice-row'>
            <td class='expanded-invoice' colspan='4'>
              <div class='inner-row'>
                <span class='label'>Publisher</span><span class='data'>{{ presentPublisherHash(invoice.publisher) }}</span>
              </div>
              <div class='inner-row'>
                <span class='label'>Date Due</span><span class='data'>{{ presentDate(invoice.date_due) }}</span>
              </div>
              <div class='inner-row'>
                <span class='label'>Invoice #</span><span class='data'>{{ invoice.id }}</span>
              </div>
              <div class='inner-row'>
                <span class='label'>Exception Status</span><span class='data'>{{ invoice.exception_status }}</span>
              </div>
            </td>
          </tr>
        </template>
      </table>
    </div>
    <div class='footer'>
      Rows per page:&nbsp;&nbsp;
      <select v-model="pageSize" class="dropdown">
        <option v-for="option in pageSizeOptions" :value="option" :key="option">
          {{ option }}
        </option>
      </select>
      <div class='pagination'>
        {{ paginationLegend }}
        <RightChevronIcon @click="hasPrevPage && goToPrevPage()" class="page-arrow-left" :color="hasPrevPage ? '#00CAD9' : '#606C8B'" />
        <RightChevronIcon @click="hasNextPage && goToNextPage()" class="page-arrow-right" :color="hasNextPage ? '#00CAD9' : '#606C8B'" />
      </div>
    </div>
  </PrimaryLayout>
</template>

<script>

import PrimaryLayout from 'components/PrimaryLayout.vue'
import ShortUpArrowIcon from 'components/icons/ShortUpArrowIcon.vue'
import RightChevronIcon from 'components/icons/RightChevronIcon.vue'
import mockInvoiceData, { PSTATUS_LATE, PSTATUS_PAID, PSTATUS_UNPAID, ESTATUS_EXCEPTION } from 'src/mockInvoiceData'
import { presentPublisherHash, presentHolofuelAmount, presentShortHolofuelAmount } from 'src/utils'

const SORT_HAPP = 'hApp'
const SORT_PUBLISHER = 'Publisher'
const SORT_CREATED = 'Date Created'
const SORT_DUE = 'Date Due'
const SORT_INVOICE = 'Invoice #'
const SORT_AMOUNT = 'Amount'
const SORT_PAYMENT = 'Payment Status'
const SORT_EXCEPTION_STATUS = 'Exception Status'

const headers = [{
  name: SORT_HAPP,
  mobileName: SORT_HAPP
}, {
  name: SORT_PUBLISHER
}, {
  name: SORT_CREATED,
  mobileName: 'Date'
}, {
  name: SORT_DUE
}, {
  name: SORT_INVOICE,
}, {
  name: SORT_AMOUNT,
  mobileName: SORT_AMOUNT
}, {
  name: SORT_PAYMENT,
  mobileName: 'Status'
}, {
  name: SORT_EXCEPTION_STATUS
},
]

const FILTER_ALL = 'All'
const FILTER_UNPAID_LATE = 'Unpaid & Late'
const FILTER_PAID = 'Paid'
const FILTER_EXCEPTIONS = 'Exceptions'

export default {
  name: 'EarningsInvoices',
  components: {
    PrimaryLayout,
    ShortUpArrowIcon,
    RightChevronIcon
  },
  data () {
    return {
      invoices: mockInvoiceData,
      filter: FILTER_ALL,
      sort: SORT_CREATED,
      sortDesc: true,
      pageSize: 10,
      page: 0,
      expandedInvoiceId: null
    }
  },
  created () {
    this.filterOptions = [FILTER_ALL, FILTER_UNPAID_LATE, FILTER_PAID, FILTER_EXCEPTIONS]
    this.pageSizeOptions = [5, 10, 20, 30, 50]
    this.headers = headers
    this.mobileHeaders = headers.filter(header => header.mobileName)

    const queryFilter = this.$route.query.filter
    if (queryFilter === 'unpaid') {
      this.filter = FILTER_UNPAID_LATE
    } else if (queryFilter === 'exceptions') {
      this.filter = FILTER_EXCEPTIONS
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
    paginationLegend () {
      const first = (this.page * this.pageSize) + 1
      const last = first + this.pagedInvoices.length - 1
      return `${first}-${last} of ${this.invoiceCount} items`
    },
    hasPrevPage () {
      return this.page > 0
    },
    hasNextPage () {
      return ((this.page + 1) * this.pageSize <= this.invoiceCount)
    },
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
    },
    pagedInvoices () {
      const startIndex = this.page * this.pageSize
      const endIndex = (this.page + 1) * this.pageSize
      return this.filteredSortedInvoices.slice(startIndex, endIndex)
    },
    invoiceCount () {
      return this.filteredSortedInvoices.length
    },
  },
  methods: {
    presentPublisherHash,
    presentDate (date) {
      return date.format("D MMM YYYY")
    },
    presentShortDate (date) {
      return date.format("D MMM")
    },
    presentHolofuelAmount,
    presentShortHolofuelAmount,
    handleHeaderClick (header) {
      if (this.sort === header) {
        this.sortDesc = !this.sortDesc
      } else {
        this.sort = header
      }
    },
    goToPrevPage () {
      if (this.hasPrevPage) {
        this.page = this.page - 1
      }
    },
    goToNextPage () {
      if (this.hasNextPage) {
        this.page = this.page + 1
      }
    },
    isExpanded (invoice) {
      return invoice.id === this.expandedInvoiceId
    },
    toggleExpandInvoice (invoice) {
      if (this.isExpanded(invoice)) {
        this.expandedInvoiceId = null
      } else {
        this.expandedInvoiceId = invoice.id
      }
    }
  },
  watch: {
    pageSize () {
      this.page = 0
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
.controls .label {
  color: #606C8B;
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
  margin-bottom: 20px;
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

.rotate-180 {
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
  color: #313C59;
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
  box-shadow: 0px 2px 6px rgba(96, 108, 139, 0.4);
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
    color: #313C59;
  }

  .expanded-invoice .inner-row .data {
    flex-basis: 50%;
    font-weight: 600;
    font-size: 14px;
    color: #606C8B;
  }
}
</style>