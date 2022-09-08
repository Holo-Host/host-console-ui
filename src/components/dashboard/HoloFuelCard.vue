<template>
  <BaseCard title="HoloFuel">
    <CircleSpinner v-if="isLoading" class="card-spinner" />
    <div
      v-for="{ label, value, isActive } in items"
      v-else
      :key="label"
      class="margin-bottom"
    >
      <span
        class="card-info-row"
        :class="{ 'inactive': !isActive }"
      >
        {{ label }}
      </span>
      <span
        class="card-info-row bold"
        :class="{ 'inactive': !isActive }"
      >
        {{ value }} HF
      </span>
    </div>

    <button v-if="!isLoading" class="redeem-button">
      Redeem HoloFuel
    </button>
  </BaseCard>
</template>

<script setup >
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
    label: 'Balance',
    value: props.data && props.data.balance ? formatCurrency(Number(props.data.balance)) : '--',
    isActive: true
  },
  {
    label: 'Redeemable',
    value:
      props.data && props.data.redeemable ? formatCurrency(Number(props.data.redeemable)) : '--',
    isActive: false
  }
])
</script>

<style scoped>
.redeem-button {
  margin-top: 10px;
  align-self: center;
  border: none;
  color: white;
  font-size: 12px;
  line-height: 16px;
  background: rgba(8, 112, 163, 0.18);
  border-radius: 100px;
  height: 35px;
  padding: 0 25px;
  cursor: pointer;
  margin-bottom: 10px;
}

.margin-bottom {
  margin-bottom: 10px;
}

.card-spinner {
  height: 130px;
}
</style>
