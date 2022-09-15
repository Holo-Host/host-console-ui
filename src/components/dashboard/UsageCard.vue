<template>
  <BaseCard
    :is-loading="isLoading"
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
        >{{ data ? data.totalHostedHapps : '--' }}&nbsp;</span> {{ $t('usage.total_happs_hosted') }}
      </div>

      <div class="info-row usage-row">
        <span
          class="bold"
          data-testid="sc-no"
        >{{ data ? data.totalSourceChains : '--' }}&nbsp;</span> {{ $t('usage.total_source_chains_hosted') }}
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
          {{ (data && data.cpu) ? presentMicroSeconds(data.cpu) : '--' }}
        </span>
      </div>

      <div class="info-row daily-row inactive">
        <span class="daily-label">
          {{ $t('$.storage') }}
        </span>
        <span class="bold">
          {{ (data && data.currentTotalStorage) ? presentBytes(data.currentTotalStorage) : '--' }}
        </span>
      </div>
      <div class="info-row daily-row">
        <span class="daily-label">
          {{ $t('$.bandwidth') }}
        </span>
        <span class="bold">{{ (data && data.bandwidth) ? presentBytes(data.bandwidth) : '--' }}
        </span>
      </div>
    </template>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@uicommon/components/BaseCard'
import GearIcon from 'components/icons/GearIcon'
import { presentMicroSeconds, presentBytes } from 'src/utils'
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

const emit = defineEmits(['try-again-clicked'])

const isError = computed(() => !!props.data.error)
</script>

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
