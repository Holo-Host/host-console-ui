<script setup lang="ts">
import BaseCard from '@uicommon/components/BaseCard.vue'
import { formatCurrency } from '@uicommon/utils/numbers'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Earnings } from '@/interfaces/HposInterface'
import { isError as isErrorPredicate } from '@/types/predicates'
import type { DashboardCardItem } from '@/types/types'

const { t } = useI18n()

const props = defineProps<{
  data: Earnings | { error: unknown }
  isLoading: boolean
}>()

const emit = defineEmits(['try-again-clicked'])

const isError = computed((): boolean => isErrorPredicate(props.data) && !!props.data.error)

/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call */
const items = computed((): DashboardCardItem[] => [
  {
    label: t('earnings.last_30_days'),
    value:
      !isErrorPredicate(props.data) && Number(props.data.last30days)
        ? formatCurrency(Number(props.data.last30days))
        : 0
  },
  {
    label: t('earnings.last_7_days'),
    value:
      !isErrorPredicate(props.data) && Number(props.data.last7days)
        ? formatCurrency(Number(props.data.last7days))
        : 0
  },
  {
    label: t('earnings.last_day'),
    value:
      !isErrorPredicate(props.data) && Number(props.data.lastday)
        ? formatCurrency(Number(props.data.lastday))
        : 0
  }
])
/* eslint-enable @typescript-eslint/no-unsafe-assignment */
</script>

<template>
  <BaseCard
    :is-loading="props.isLoading"
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
