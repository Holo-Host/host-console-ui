<template>
  <BaseCard
    :is-loading="isLoading"
    :is-error="isError"
    :title="$t('earnings.title')"
    @try-again-clicked="emit('try-again-clicked')"
  >
    <div>
      <div
        v-for="{ label, value } in items"
        :key="label"
        class="earnings-info-row"
      >
        <span class="earnings-label">{{ label }}</span>
        <span class="bold">{{ value }} HF</span>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@uicommon/components/BaseCard'
import { formatCurrency } from '@uicommon/utils/numbers'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  data: {
    type: Object,
    required: true
  },

  isLoading: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['try-again-clicked'])

const isError = computed(() => !!props.data.error)

const items = computed(() => [
  {
    label: t('earnings.last_30_days'),
    value:
      props.data && Number(props.data.last30days)
        ? formatCurrency(Number(props.data.last30days))
        : 0
  },
  {
    label: t('earnings.last_7_days'),
    value:
      props.data && Number(props.data.last7days) ? formatCurrency(Number(props.data.last7days)) : 0
  },
  {
    label: t('earnings.last_day'),
    value: props.data && Number(props.data.lastday) ? formatCurrency(Number(props.data.lastday)) : 0
  }
])
</script>

<style scoped>
.earnings-info-row {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  line-height: 19px;
  color: var(--grey-color);
  margin-bottom: 20px;
  margin-right: 50px;
}

@media screen and (max-width: 1350px) {
  .earnings-info-row {
    margin-right: 0;
  }
}
</style>
