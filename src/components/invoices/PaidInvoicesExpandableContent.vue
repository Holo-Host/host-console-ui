<template>
  <td colspan="4" class="paid-invoices-expandable-content">
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
    key: 'publisher',
    label: t('invoices.headers.publisher'),
    value: props.invoice.publisher
  },
  {
    key: 'date_completed',
    label: t('invoices.headers.completed'),
    value: props.invoice.date_completed
  },
  {
    key: 'id',
    label: t('invoices.headers.invoice'),
    value: props.invoice.id
  }
])
</script>

<style lang="scss" scoped>
.paid-invoices-expandable-content {
  padding-left: 20px;
  padding-bottom: 10px;
  font-size: 14px;
  line-height: 19px;
  color: var(--grey-color);
  font-weight: 600;

  &__item {
    margin-top: 3px;
  }

  &__label {
    font-weight: 700;
  }

  &__value {
    margin-left: 8px;
  }
}
</style>
