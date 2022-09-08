<template>
  <BaseCard title="Earnings">
    <CircleSpinner v-if="isLoading" class="card-spinner" />
    <div v-else class="body">
      <div
        v-for="{ label, value } in items"
        :key="label"
        class="earnings-info-row"
      >
        <span class="earnings-label">{{ label }}</span>
        <span class="bold">{{ value || '--' }} HF</span>
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@uicommon/components/BaseCard'
import CircleSpinner from '@uicommon/components/CircleSpinner'
import { formatCurrency } from '@uicommon/utils/numbers'
import { computed } from 'vue'

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

const items = computed(() => [
  {
    label: 'Last 30 days',
    value:
      props.data && props.data.last30days ? formatCurrency(Number(props.data.last30days)) : '--'
  },
  {
    label: 'Last 7 days',
    value: props.data && props.data.last7days ? formatCurrency(Number(props.data.last7days)) : '--'
  },
  {
    label: 'Last day',
    value: props.data && props.data.lastday ? formatCurrency(Number(props.data.lastday)) : '--'
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

.card-spinner {
  height: 156px;
}
</style>
