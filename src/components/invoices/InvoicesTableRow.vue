<script setup lang="ts">
import BaseTableRow from '@uicommon/components/BaseTableRow.vue'
import BaseTableRowItem from '@uicommon/components/BaseTableRowItem.vue'
import Identicon from '@uicommon/components/Identicon.vue'
import { decodeAgentId } from '@uicommon/utils/agent'
import PaidInvoicesExpandableContent from '@/components/invoices/PaidInvoicesExpandableContent.vue'
import type { Transaction } from '@/interfaces/HposInterface'

interface ExtendedTransaction extends Transaction {
  formattedId: string
  happ: string
  formattedCompletedDate: string
  formattedCreatedDate: string
  formattedExpirationDate: string
  formattedAmount: string
}

const props = withDefaults(
  defineProps<{
    invoice: ExtendedTransaction
    isPaid?: boolean
  }>(),
  {
    isPaid: false
  }
)
</script>

<template>
  <BaseTableRow>
    <BaseTableRowItem
      :value="props.invoice.happ"
      is-visible-on-mobile
      is-bold
    />

    <BaseTableRowItem>
      <Identicon
        v-if="props.invoice.counterparty"
        size="27"
        :agent-key="decodeAgentId(props.invoice.counterparty)"
        role="img"
        aria-label="Agent Identity Icon"
      />
    </BaseTableRowItem>

    <BaseTableRowItem
      :value="isPaid ? props.invoice.formattedCompletedDate : props.invoice.formattedCreatedDate"
      is-visible-on-mobile
    />

    <BaseTableRowItem
      :value="props.invoice.formattedExpirationDate"
    />

    <BaseTableRowItem
      :value="props.invoice.formattedId"
    />

    <BaseTableRowItem
      :value="props.invoice.formattedAmount"
      is-visible-on-mobile
      is-bold
      align="end"
    />

    <BaseTableRowItem
      :value="props.invoice.status"
      is-visible-on-mobile
    />

    <template #expanded-content>
      <PaidInvoicesExpandableContent
        :invoice="props.invoice"
      />
    </template>
  </BaseTableRow>
</template>
