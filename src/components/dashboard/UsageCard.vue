<script setup lang="ts">
import BaseCard from '@uicommon/components/BaseCard.vue'
import { computed } from 'vue'
import GearIcon from '@/components/icons/GearIcon.vue'
import type { UsageResponse } from '@/interfaces/HposInterface'
import { isError as isErrorPredicate } from '@/types/predicates'
import { presentMicroSeconds, presentBytes } from '@/utils'

const props = defineProps<{
  data: UsageResponse | { error: unknown }
  isLoading: boolean
}>()

const emit = defineEmits(['try-again-clicked'])

const isError = computed((): boolean => isErrorPredicate(props.data) && !!props.data.error)
</script>

<template>
  <BaseCard
    :is-loading="props.isLoading"
    :is-error="isError"
    :title="$t('usage.title')"
    @try-again-clicked="emit('try-again-clicked')"
  >
    <template #left>
      <h3 class="inner-title">
        {{ $t('$.happs') }}
      </h3>
      <div class="info-row usage-row">
        <span
          class="bold"
          data-testid="happ-no"
        >{{ props.data ? props.data.totalHostedHapps : 0 }}&nbsp;</span> {{ $t('usage.total_happs_hosted') }}
      </div>

      <div class="info-row usage-row">
        <span
          class="bold"
          data-testid="sc-no"
        >{{ props.data ? props.data.totalHostedAgents : 0 }}&nbsp;</span> {{ $t('usage.total_users_hosted') }}
      </div>

      <router-link
        to="/preferences"
        class="info-row usage-row hosting-preferences"
        active-class="active-link"
      >
        <GearIcon
          class="gear-icon"
          color="#606C8B"
        />
        {{ $t('$.hosting_preferences') }}
      </router-link>
    </template>

    <template #right>
      <h3 class="inner-title">
        {{ $t('usage.daily_snapshot') }}
      </h3>

      <div class="info-row daily-row inactive">
        <span class="daily-label">
          {{ $t('$.cpu') }}
        </span>
        <span class="bold">
          {{ presentMicroSeconds(props.data ? props.data.totalUsage?.cpu : 0 ) }}
        </span>
      </div>

      <div class="info-row daily-row inactive">
        <span class="daily-label">
          {{ $t('$.storage') }}
        </span>
        <span class="bold">
          {{ presentBytes(props.data ? props.data.currentTotalStorage : 0) }}
        </span>
      </div>
      <div class="info-row daily-row">
        <span class="daily-label">
          {{ $t('$.data_transfer') }}
        </span>
        <span class="bold">{{ presentBytes(props.data ? props.data.totalUsage?.bandwidth : 0) }}
        </span>
      </div>
    </template>
  </BaseCard>
</template>

<style scoped>
.info-row {
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 19px;
  color: var(--grey-color);
  margin-bottom: 10px;
}

.usage-row {
  width: 200px;
}

.daily-row {
  justify-content: space-between;
  width: 180px;
}

.gear-icon {
  margin-right: 5px;
}

.bold {
  font-weight: bold;
}

.inner-title {
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  margin: 0 0 20px;
}

@media screen and (max-width: 1050px) {
  /* Hiding hosting preferences link in mobile view as dictated in the designs */
  .hosting-preferences {
    display: none;
  }
}
</style>
