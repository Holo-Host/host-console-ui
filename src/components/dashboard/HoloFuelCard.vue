<template>
  <BaseCard
    :is-loading="isLoading"
    :is-error="isError"
    :title="$t('holofuel.title')"
    @try-again-clicked="emit('try-again-clicked')"
  >
    <div
      v-for="{ label, value, isActive } in items"
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

    <button class="redeem-button">
      {{ $t('holofuel.redeem_holofuel') }}
    </button>
  </BaseCard>
</template>

<script setup lang="ts">
import BaseCard from '@uicommon/components/BaseCard.vue'
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

const isError = computed(() => !!props.data.error)

const emit = defineEmits(['try-again-clicked'])

const items = computed(() => [
  {
    label: t('holofuel.balance'),
    value:
      props.data && Number(props.data.available) ? formatCurrency(Number(props.data.available)) : 0,
    isActive: true
  },
  {
    label: t('holofuel.redeemable'),
    value:
      props.data && Number(props.data.redeemable)
        ? formatCurrency(Number(props.data.redeemable))
        : 0,
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
</style>
