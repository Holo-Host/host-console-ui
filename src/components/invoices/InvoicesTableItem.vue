<template>
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
      :value="presentDate(invoice.date_created)"
      is-visible-on-mobile
    />

    <BaseTableRowItem
      :value="presentDate(invoice.date_completed)"
    />

    <BaseTableRowItem
      :value="invoice.id"
    />

    <BaseTableRowItem
      :value="presentHolofuelAmount(invoice.amount)"
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

<script setup>
import BaseTableRow from '@uicommon/components/BaseTableRow'
import BaseTableRowItem from '@uicommon/components/BaseTableRowItem'
import PaidInvoicesExpandableContent from 'components/invoices/PaidInvoicesExpandableContent'
import dayjs from 'dayjs'
import { presentHolofuelAmount } from 'utils'

defineProps({
  invoice: {
    type: Object,
    required: true
  }
})

function presentDate(date) {
  return dayjs(date).format('DD MMM YYYY')
}
</script>
