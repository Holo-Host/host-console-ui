<script setup lang="ts">
import BaseCard from '@uicommon/components/BaseCard.vue'
import { formatCurrency } from '@uicommon/utils/numbers'
import { capitalizeWord } from '@uicommon/utils/stringUtils'
import dayjs from 'dayjs'
import { computed } from 'vue'
import { isError as isErrorPredicate } from '@/types/predicates'

const props = defineProps<{
  data: unknown[] | { error: string }
  isLoading: boolean
}>()

const isError = computed((): boolean => isErrorPredicate(props.data) && !!props.data.error)
</script>

<template>
  <BaseCard
    :is-loading="props.isLoading"
    :is-error="isError"
    :title="$t('recent_payments.title')"
  >
    <div class="body">
      <div
        v-if="!props.data || props.data.length === 0"
        class="no-payments"
      >
        {{ $t('recent_payments.no_payments') }}
      </div>

      <div
        v-for="payment in props.data"
        :key="payment.id"
        class="payment-row"
      >
        <div class="payment-amount">
          {{ payment.amount && Number(payment.amount) ? formatCurrency(Number(payment.amount)) : 0 }} HF
        </div>
        <div class="payment-details">
          <div>
            {{ payment.status ? capitalizeWord(payment.status) : 0 }}
          </div>
          <div class="payment-happ">
            {{ payment.happ ? payment.happ.name : '--' }}
          </div>
        </div>
        <div class="payment-time">
          {{ payment?.completedDate ? dayjs(payment.completedDate).format('DD MMM') : '--' }}
          {{ payment?.completedDate ? dayjs(payment.updatedAt).format('HH:mm') : '' }}
        </div>
      </div>
    </div>
  </BaseCard>
</template>

<style scoped>
.body {
  height: 100%;
}

.payment-row {
  display: flex;
  align-items: flex-start;
  font-size: 14px;
  line-height: 19px;
  margin-bottom: 16px;
  color: var(--grey-color);
}

.payment-amount {
  min-width: 128px;
  font-weight: bold;
  text-align: end;
  padding-right: 30px;
  white-space: nowrap;
}

.payment-details {
  min-width: 72px;
}

.payment-happ {
  font-style: italic;
  font-size: 12px;
  line-height: 16px;
}

.payment-time {
  font-size: 9px;
  line-height: 12px;
  margin-top: 4px;
  margin-left: 3px;
}

.no-payments {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: var(--grey-color);
  font-weight: bold;
}
</style>
