<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SettingsSection from '../SettingsSection.vue'
import HostingPreferencesEditablePriceRow from './EditablePriceRow.vue'
import type { PricesData, UpdatePricePayload } from '@/types/types'

const { t } = useI18n()

const props = defineProps<{
  data: PricesData
}>()

const emit = defineEmits(['update:price'])

function updatePrice({ prop, value }: UpdatePricePayload): void {
  emit('update:price', { prop, value })
}

interface FormattedPrice {
  value: number | string
  unit: string
}

function formatPrice(pricePerByte: number): FormattedPrice {
  if (isNaN(pricePerByte)) {
    return {
      value: '--',
      unit: 'HF per GB'
    }
  }

  if (pricePerByte === 0) {
    return {
      value: 0,
      unit: 'HF per GB'
    }
  }

  const k = 1024
  const sizes = ['byte', 'kB', 'MB', 'GB', 'TB']

  // eslint-disable-next-line no-magic-numbers,@typescript-eslint/no-magic-numbers
  const zerosAfterDecimal = -Math.floor(Math.log(pricePerByte) / Math.log(10))

  if (zerosAfterDecimal <= 0) {
    return {
      // eslint-disable-next-line no-magic-numbers
      value: parseFloat(pricePerByte).toFixed(0),
      unit: `HF per ${sizes[0]}`
    }
  }

  // eslint-disable-next-line no-magic-numbers,@typescript-eslint/no-magic-numbers
  const unitIndex = Math.floor(zerosAfterDecimal / 3)

  return {
    // eslint-disable-next-line no-magic-numbers,@typescript-eslint/no-magic-numbers
    value: parseFloat((pricePerByte * Math.pow(k, unitIndex)).toFixed(3)),
    unit: `HF per ${sizes[unitIndex]}`
  }
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
    unit: 'HF per hour',
    prop: 'cpu',
    isDisabled: false
  },
  {
    label: t('$.data_transfer'),
    value: props.data.bandwidth ? formatPrice(props.data.bandwidth).value : 0,
    unit: 'HF per Gb',
    prop: 'bandwidth',
    isDisabled: false
  }
])
</script>

<template>
  <SettingsSection
    :title="$t('hosting_preferences.prices.header')"
    class="prices-section"
  >
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
