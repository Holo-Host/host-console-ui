<script setup lang="ts">
import HAppImage from '@uicommon/components/HAppImage.vue'
import { useI18n } from 'vue-i18n'
import CategoryChip from '@/components/CategoryChip.vue'
import HAppDetailsEarnings from '@/components/hAppDetails/HAppDetailsEarnings.vue'
import HAppDetailsStopHosting from '@/components/hAppDetails/HAppDetailsStopHosting.vue'
import HAppDetailsUsage from '@/components/hAppDetails/HAppDetailsUsage.vue'
import LeftChevronIcon from '@/components/icons/LeftChevronIcon.vue'
import type { HAppDetails } from '@/interfaces/HposInterface'

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

        <div class="happ-details__left-column-categories">
          <CategoryChip
            v-for="category in props.hApp.categories"
            :key="category"
            :label="category"
            :custom-theme="{
              fontColor: 'gray',
              backgroundColor: 'grey-light-color'
            }"
            class="happ-details__left-column-category"
          />
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

        <HAppDetailsEarnings
          :h-app="props.hApp"
          class="happ-details__main-column-earnings"
        />

        <HAppDetailsUsage
          :h-app="props.hApp"
          class="happ-details__main-column-usage"
        />

        <!--        <HAppDetailsStopHosting-->
        <!--          :h-app="props.hApp"-->
        <!--          class="happ-details__main-column-stop-hosting"-->
        <!--        />-->
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
      margin-bottom: 38px;
    }

    &-description-label {
      margin-bottom: 4px;
    }

    &-description {
      font-weight: 700;
      color: var(--grey-dark-color);
    }

    &-categories {
      margin-top: 48px;
    }

    &-category {
      display: block;
      margin-top: 13px;
      width: fit-content;
      block-size: fit-content;
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

    &-earnings {
      margin-top: 2px;
    }

    &-usage {
      margin-top: 32px;
    }

    &-stop-hosting {
      margin-top: 32px;
    }
  }
}

@media screen and (max-width: 1050px) {
  .happ-details {
    margin: 0 0 20px 0;
    padding: 18px;

    &__main-column {
      margin: 0 4px;

      &-mobile {
        display: block;
        align-items: center;
        flex-direction: column;
      }

      &-name {
        margin-top: 12px;
        margin-bottom: 12px;
      }

      &-description {
        font-size: 11px;
        margin-bottom: 24px;
      }
    }
  }

  .mobile-column {
    display: flex;
  }

  .desktop {
    display: none;
  }
}
</style>
