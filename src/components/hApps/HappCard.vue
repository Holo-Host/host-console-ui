<template>
  <BaseCard class="happ-card" margin="sm">
    <div
      v-if="isEmpty"
      class="happ-card__content happ-card__content--empty"
    >
      {{ $t('hosted_happs.no_happs') }}
    </div>

    <div
      v-if="isError"
      class="happ-card__content happ-card__content--empty"
    >
      {{ $t('hosted_happs.no_happs') }}
    </div>

    <div
      v-if="!isEmpty && !isError"
      class="happ-card__content"
    >
      <HAppImage
        :happ="happ"
        class="happ-card__desktop-image"
      />

      <div class="happ-card__details">
        <div class="happ-card__name">
          {{ happ.name }}

          <div
            v-if="happ.isPaused"
            class="happ-card__paused-chip"
          >
            {{ $t('$.paused') }}
          </div>

          <ArrowIcon class="happ-card__name-arrow-icon" />
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
import { computed } from 'vue'
import { happDetailsPath } from '../../router'

const props = defineProps({
  happ: {
    type: Object,
    default: () => {}
  },

  isEmpty: {
    type: Boolean,
    default: false
  },

  isError: {
    type: Boolean,
    default: false
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

    &--empty {
      display: flex;
      align-items: center;
      justify-content: center;
      margin: auto;
      padding-top: 24px;
      padding-left: 0;
      font-size: 14px;
      line-height: 19px;
      font-weight: 700;
      color: var(--grey-color);
    }
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

  &__paused-chip {
    align-items: center;
    display: inline-flex;
    justify-content: center;
    background-color: var(--primary-light-color);
    border-radius: 9999px;
    padding: 1px 13px;
    margin-left: 10px;
    font-size: 14px;
    font-style: italic;
    font-weight: 600;
    color: var(--grey-color);
  }

  &__earnings {
    display: flex;
    align-items: center;
    color: var(--grey-dark-color);
    margin: 60px 0 10px 4px;
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

      &--empty {
        width: 100%;
      }
    }
  }
}
</style>
