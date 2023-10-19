<script setup lang="ts">
import HAppImage from '@uicommon/components/HAppImage.vue'
import { useI18n } from 'vue-i18n'
import HAppDetailsEarnings from '@/components/hAppDetails/HAppDetailsEarnings.vue'
import HAppDetailsStopHosting from '@/components/hAppDetails/HAppDetailsStopHosting.vue'
import HAppDetailsUsage from '@/components/hAppDetails/HAppDetailsUsage.vue'
import AlertCircleIcon from '@/components/icons/AlertCircleIcon.vue'
import ChainIcon from '@/components/icons/ChainIcon.vue'
import ClockIcon from '@/components/icons/ClockIcon.vue'
import LeftChevronIcon from '@/components/icons/LeftChevronIcon.vue'
import type { HAppDetails } from '@/interfaces/HposInterface'
import { presentHolofuelAmount, presentMicroSeconds, presentBytes } from '@/utils'

const { t } = useI18n()

const props = defineProps<{
  hApp: HAppDetails
}>()
</script>

<template>
  <div class="happ-details">
    <router-link
      class="happ-details__back-link"
      to="/happs"
    >
      <LeftChevronIcon />
      {{ t('$.back') }}
    </router-link>
    <div class="happ-details__columns">
      <div class="happ-details__left-column desktop">
        <HAppImage
          :happ="props.hApp"
          size="178px"
          class="happ-details__left-column-happ-image"
        />
        <div class="happ-details__left-column-description-label">
          {{ t('$.description') }}
        </div>
        <div class="happ-details__left-column-description">
          {{ props.hApp.description }}
        </div>
      </div>

      <div class="happ-details__main-column">
        <!-- Mobile -->
        <div class="happ-details__main-column-mobile">
          <HAppImage
            :happ="props.hApp"
            size="124px"
            class="happ-details__main-column-mobile-happ-image"
          />
          <h2 class="happ-details__main-column-name">
            {{ props.hApp.name }}
          </h2>
          <div class="happ-details__main-column-description">
            {{ props.hApp.description }}
          </div>
        </div>

        <!-- Desktop -->
        <h2 class="happ-details__main-column-name desktop">
          {{ props.hApp.name }}
        </h2>

        <HAppDetailsEarnings :h-app="props.hApp" />
        <HAppDetailsUsage :h-app="props.hApp" />
        <HAppDetailsStopHosting :h-app="props.hApp" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.happ-details {
  display: flex;
  flex-direction: column;
  background-color: var(--white-color);
  box-shadow: 0 4px 20px #eceef1;
  border-radius: 5px;
  margin: 0 10px 20px 0;
  padding: 30px;
  color: var(--grey-color);
  font-size: 14px;
  line-height: 19px;
  font-weight: 600;

  &__back-link {
    color: var(--grey-color);
    text-decoration: none;
    font-size: 14px;
    margin-bottom: 32px;
  }

  &__columns {
    display: flex;
  }

  &__left-column {
    display: flex;
    flex: 0;
    flex-direction: column;

    &-happ-image {
      margin-bottom: 34px;
    }

    &-description-label {
      margin-bottom: 4px;
    }

    &-description {
      font-weight: 700;
      color: var(--grey-dark-color);
    }
  }

  &__main-column {
    display: flex;
    flex: 1;
    flex-direction: column;
    margin-left: 22px;

    &-mobile {
      display: none;
      align-items: center;
      flex-direction: column;
    }

    &-name {
      margin: 0 0 40px 0;
      color: var(--grey-dark-color);
      font-weight: bold;
      font-size: 22px;
      line-height: 22px;
    }

    &-description {
      font-weight: 700;
      color: var(--grey-dark-color);
    }
  }
}

@media screen and (max-width: 1050px) {
  .happ-details {
    margin: 0 0 20px 0;
    padding: 18px;
  }
  .mobile-column {
    display: flex;
  }
  .main-column {
    margin: 0 4px;
  }
  .back-link {
    margin-bottom: 4px;
  }
  .desktop {
    display: none;
  }
  .happ-image {
    margin-bottom: 10px;
  }
  .name {
    margin-bottom: 8px;
  }
  .description {
    font-size: 11px;
    margin-bottom: 46px;
  }
}
</style>
