<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import ChainIcon from '@/components/icons/ChainIcon.vue'
import ClockIcon from '@/components/icons/ClockIcon.vue'
import type { HAppDetails } from '@/interfaces/HposInterface'
import { presentBytes, presentMicroSeconds } from '@/utils'

const { t } = useI18n()

const props = defineProps<{
  hApp: HAppDetails
}>()
</script>

<template>
  <div>
    <div class="happ-details-usage__info-row">
      <ClockIcon class="happ-details-usage__clock-icon" /> {{ t('hosted_happs.hosted_for') }}:&nbsp;<span class="happ-details-usage__info-row-value">{{ props.hApp.daysHosted }} {{ t('$.days') }}</span>
    </div>
    <div class="happ-details-usage__info-row happ-details-usage__source-chains mobile-margin">
      <ChainIcon class="happ-details-usage__chain-icon" /> {{ t('happ_details.total_source_chains') }}:&nbsp;<span class="happ-details-usage__info-row-value">{{ props.hApp.sourceChains }}</span>
    </div>

    <div class="happ-details-usage__usage-row">
      <span class="happ-details-usage__usage-row-label">{{ t('happ_details.seven_day_usage') }}:</span>
      <div class="happ-details-usage__usage-row-value-wrapper">
        <span class="happ-details-usage__usage-row-value">{{ presentMicroSeconds(props.hApp.last7DaysUsage.cpu) }}</span> {{ t('$.cpu') }}
      </div>
      <div class="happ-details-usage__usage-row-value-wrapper happ-details-usage__storage">
        <span class="happ-details-usage__usage-row-value">{{ presentBytes(props.hApp.last7DaysUsage.storage) }}</span> {{ t('$.storage') }}
      </div>
      <div class="happ-details-usage__usage-row-value-wrapper happ-details-usage__data-transfer">
        <span class="happ-details-usage__usage-row-value">{{ presentBytes(props.hApp.last7DaysUsage.bandwidth) }}</span> {{ t('$.bandwidth') }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.happ-details-usage {
  &__info-row {
    display: flex;
    align-items: center;
    color: var(--grey-color);
    margin-left: 0;
    font-size: 14px;

    &-value {
      font-weight: 700;
      color: var(--grey-dark-color);
    }
  }

  &__clock-icon {
    margin-right: 8px;
  }

  &__chain-icon {
    margin-right: 4px;
  }

  &__source-chains {
    margin-top: 10px;
  }

  &__usage-row {
    display: flex;
    color: var(--grey-dark-color);
    font-size: 12px;
    font-weight: 600;
    padding-right: 36px;
    margin-top: 36px;

    &-label {
      font-size: 14px;
    }

    &-value-wrapper {
      display: flex;
      margin-left: 14px;
    }

    &-value {
      padding: 0 5px;
      border-bottom: 2px solid var(--primary-color);
      font-size: 13px;
      font-weight: 800;
    }
  }

  &__storage,
  &__data-transfer {
    margin-left: 30px;
  }
}

@media screen and (max-width: 1050px) {
  .happ-details-usage {
    &__info-row {
      font-size: 14px;
    }

    &__clock-icon {
      margin-left: 2px;
      margin-right: 10px;
    }

    &__chain-icon {
      margin-right: 8px;
    }

    &__usage-row {
      flex-direction: column;
      margin-bottom: 24px;

      &-label {
        margin-bottom: 10px;
      }

      &-value-wrapper {
        margin: 0 0 10px 0;
      }
    }
  }
}
</style>
