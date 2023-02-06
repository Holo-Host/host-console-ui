<template>
  <BaseTableRow>
    <BaseTableRowItem
      :value="invoice.happ"
      is-visible-on-mobile
      is-bold
    />

    <BaseTableRowItem>
      <Identicon
        v-if="invoice.counterparty"
        size="27"
        :agent-key="decodeAgentId(invoice.counterparty)"
        role="img"
        aria-label="Agent Identity Icon"
      />
    </BaseTableRowItem>

    <BaseTableRowItem
      :value="isPaid ? invoice.formattedCompletedDate : invoice.formattedCreatedDate"
      is-visible-on-mobile
    />

    <BaseTableRowItem
      :value="invoice.formattedExpirationDate"
    />

    <BaseTableRowItem
      :value="invoice.formattedId"
    />

    <BaseTableRowItem
      :value="invoice.formattedAmount"
      is-visible-on-mobile
      is-bold
      align="end"
    />

    <BaseTableRowItem
      :value="invoice.status"
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
import Identicon from '@uicommon/components/Identicon'
import { decodeAgentId } from '@uicommon/utils/agent'
import PaidInvoicesExpandableContent from '@/components/invoices/PaidInvoicesExpandableContent'

defineProps({
  invoice: {
    type: Object,
    required: true
  },

  isPaid: {
    type: Boolean,
    default: false
  }
})
</script>
