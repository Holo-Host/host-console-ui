<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SettingsSection from '../SettingsSection.vue'
import HostingPreferencesEditablePriceRow from './EditablePriceRow.vue'
import type { PricesData, UpdatePricePayload } from '@/types/types'
import CircleSpinner from "@uicommon/components/CircleSpinner.vue";

const { t } = useI18n()

const props = defineProps<{
  data: PricesData
  isLoading: boolean
}>()

const emit = defineEmits(['update:price'])

function updatePrice({ prop, value }: UpdatePricePayload): void {
  emit('update:price', { prop, value })
}

interface FormattedPrice {
  value: number | string
  unit: string
}

interface PriceItem {
  label: string
  value: string | number
  unit: string
  prop: string
  isDisabled: boolean
}

const prices = computed((): PriceItem[] => [
  {
    label: t('$.cpu'),
    value: props.data.cpu || 0,
    unit: t('hosting_preferences.prices.hfpermin'),
    prop: 'cpu',
    isDisabled: false
  },
  {
    label: t('$.data_transfer'),
    value: props.data.bandwidth || 0,
    unit: t('hosting_preferences.prices.hfpergb'),
    prop: 'bandwidth',
    isDisabled: false
  }
])
</script>

<template>
  <SettingsSection
    :title="$t('hosting_preferences.prices.header')"
    class="prices-section"
    :class="{ 'prices-section__is-loading': props.isLoading }"
  >
		<CircleSpinner v-if="props.isLoading" />
		<span class="prices-section__subtitle">
      {{ $t('hosting_preferences.prices.subheader') }}
    </span>

    <div class="prices-section__prices">
      <HostingPreferencesEditablePriceRow
        v-for="price in prices"
        :key="price.label"
        v-bind="price"
        class="prices-section__price"
        @update:value="updatePrice"
      />
    </div>
  </SettingsSection>
</template>

<style lang="scss" scoped>
.prices-section {
  &__is-loading {
    opacity: 0.5;
    pointer-events: none;
  }

  &__subtitle {
    color: var(--grey-dark-color);
    font-weight: 700;
  }

  &__prices {
    margin-top: 24px;
    margin-left: 40px;
  }

  &__price {
    margin-top: 6px;
  }
}
</style>
