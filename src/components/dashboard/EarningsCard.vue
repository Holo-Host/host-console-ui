<template>
  <BaseCard title="Earnings">
    <div class="body">
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
import BaseCard from '@uicommon/components/BaseCard.vue'
import { formatCurrency } from '@uicommon/utils/numbers'
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const items = computed(() => [
  {
    label: 'Last 30 days',
    value: props.data && props.data.last30Days ? formatCurrency(props.data.last30Days) : '--'
  },
  {
    label: 'Last 7 days',
    value: props.data && props.data.last7Days ? formatCurrency(props.data.last7Days) : '--'
  },
  {
    label: 'Last day',
    value: props.data && props.data.lastDay ? formatCurrency(props.data.lastDay) : '--'
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
</style>
