<script setup lang="ts">
import { ChevronLeftIcon } from '@heroicons/vue/20/solid'
import BaseCard from '@uicommon/components/BaseCard.vue'

const props = defineProps<{
  data: string | number
  isLoading: boolean
}>()
</script>

<template>
  <BaseCard :is-loading="props.isLoading">
    <div class="redeem-card-header">
      <ChevronLeftIcon class="redeem-card-header__back-icon" />
      <span class="redeem-card-header__back-label">{{ $t('$.back') }}</span>
    </div>

		<div class="redeem-card-content">

		</div>
  </BaseCard>
</template>

<style lang="scss" scoped>
.redeem-card-header {
  display: flex;
  justify-items: center;
  color: var(--grey-dark-color);

  &__back-icon {
    height: 16px;
  }

  &__back-label {
    margin-left: 3px;
    font-size: 14px;
  }
}
</style>
