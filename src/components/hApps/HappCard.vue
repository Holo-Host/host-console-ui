<template>
  <BaseCard class="happ-card" margin="sm">
    <div class="happ-card__content">
      <HAppImage
        :happ="happ"
        class="happ-card__desktop-image"
      />

      <div class="happ-card__details">
        <div class="happ-card__name">
          {{ happ.name }}
          <ArrowIcon class="happ-card__name-arrow-icon" />
        </div>

        <div class="happ-card__duration">
          <ClockIcon class="happ-card__duration-clock-icon" />
          {{ $t('hosted_happs.hosted_for') }}:&nbsp
          <span class="bold">
            {{ happ.hosted_for || 0 }} {{ $t('$.days') }}
          </span>
        </div>

        <div class="happ-card__earnings disabled">
          {{ $t('$.earnings') }}:
          <span class="bold">
            &nbsp;{{ earnings }} HF
          </span>
        </div>

        <HAppCardUsage :happ="happ" />
      </div>
    </div>
  </BaseCard>
</template>

<script setup>
import BaseCard from '@uicommon/components/BaseCard.vue'
import { formatCurrency } from '@uicommon/utils/numbers'
import HAppCardUsage from 'components/hApps/HAppCardUsage'
import HAppImage from 'components/hApps/HAppImage.vue'
import ArrowIcon from 'components/icons/ArrowIcon.vue'
import ClockIcon from 'components/icons/ClockIcon.vue'
import { computed } from 'vue'
import { happDetailsPath } from '../../router'

const props = defineProps({
  happ: {
    type: Object,
    required: true
  }
})

const earnings = computed(() =>
  props.happ.last7daysEarnings && Number(props.happ.last7daysEarnings)
    ? formatCurrency(Number(props.happ.last7daysEarnings))
    : 0
)

const pathToHapp = computed(() => happDetailsPath(this.happ))
</script>

<style lang="scss" scoped>
.happ-card {
  &__content {
    display: flex;
    background-color: var(--white-color);
    max-width: 546px;
    text-decoration: none;
    padding-left: 10px;
    padding-bottom: 12px;
  }

  &__details {
    display: flex;
    flex: 1;
    flex-direction: column;
    color: var(--grey-color);
    font-size: 14px;
    line-height: 19px;
    font-weight: 600;
    margin-top: 4px;
  }

  &__mobile-image {
    display: none;
  }

  &__name {
    display: flex;
    align-items: center;
    margin: 1px 0;
    color: var(--grey-dark-color);
    font-size: 22px;
    font-weight: bold;

    &-arrow-icon {
      margin-left: auto;
      opacity: 0.2;
    }
  }

  &__duration {
    display: flex;
    align-items: center;
    margin-top: 6px;
    margin-bottom: 8px;

    &-clock-icon {
      margin-left: 1px;
      margin-right: 7px;
    }
  }

  &__earnings {
    display: flex;
    align-items: center;
    color: var(--grey-dark-color);
    margin: 24px 0 10px 4px;
  }
}

/* Temporary, remove once we have all live data */
.disabled {
  opacity: 0.2;
}

.bold {
  font-weight: 700;
}

@media screen and (max-width: 1050px) {
  .happ-card {
    &__desktop-image {
      display: none;
    }

    &__content {
      margin-right: 0;
      max-width: none;
      flex-basis: 0;
    }
  }
}
</style>
