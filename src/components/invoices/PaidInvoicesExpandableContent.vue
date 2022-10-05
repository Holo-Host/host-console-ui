<template>
  <td colspan="4" class="paid-invoices-expandable-content">
    <div
      class="paid-invoices-expandable-content__item"
    >
      <span class="paid-invoices-expandable-content__label">
        {{ t('invoices.headers.publisher') }}:
      </span>
      <span class="paid-invoices-expandable-content__value">
        <Identicon
          v-if="invoice.counterparty"
          size="27"
          :agent-key="decodeAgentId(invoice.counterparty)"
          role="img"
          aria-label="Agent Identity Icon"
        />
      </span>
    </div>
    <div
      v-for="item in items"
      :key="item.key"
      class="paid-invoices-expandable-content__item"
    >
      <span class="paid-invoices-expandable-content__label">
        {{ item.label }}:
      </span>
      <span class="paid-invoices-expandable-content__value">
        {{ item.value }}
      </span>
    </div>
  </td>
</template>

<script setup>
import Identicon from '@uicommon/components/Identicon'
import { decodeAgentId } from '@uicommon/utils/agent'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  invoice: {
    type: Object,
    required: true
  }
})

const items = ref([
  {
    key: 'expiration_date',
    label: t('invoices.headers.due'),
    value: props.invoice.expiration_date
  },
  {
    key: 'id',
    label: t('invoices.headers.invoice'),
    value: props.invoice.formattedId
  }
])
</script>

<style lang="scss" scoped>
.paid-invoices-expandable-content {
  padding-left: 26px;
  padding-bottom: 10px;
  font-size: 14px;
  line-height: 19px;
  color: var(--grey-color);
  font-weight: 600;

  &__item {
    display: flex;
    align-items: center;
    margin-top: 3px;
    height: 27px;
  }

  &__label {
    font-weight: 700;
  }

  &__value {
    margin-left: 8px;
  }
}
</style>
