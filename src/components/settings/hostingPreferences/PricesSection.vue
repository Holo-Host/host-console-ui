<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import SettingsSection from '../SettingsSection.vue'
import PricingHistogram from './PricingHistogram.vue'
import HostingPreferencesEditablePriceRow from './EditablePriceRow.vue'
import type { PricesData } from '@/types/types'
import { EPricingOptions } from '@/types/types'

const { t } = useI18n()

const props = defineProps<{
  data: PricesData
}>()

const emit = defineEmits(['update:price'])

const editPricingOption = ref<EPricingOptions | null>(null)

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
  pricingOption: EPricingOptions
  isDisabled: boolean
}

const prices = computed((): PriceItem[] => [
  {
    label: t('$.cpu'),
    value: props.data.cpu || 0,
    unit: 'HF per min',
    prop: 'cpu',
    isDisabled: false,
    pricingOption: EPricingOptions.compute
  },
  ////////////////////////////////////////////////////////////////
  // REMOVE OR COMMENT OUT THE FOLLOWING LINES BEFORE MERGING
  ////////////////////////////////////////////////////////////////
  {
    label: t('$.storage'),
    value: props.data.storage ? formatPrice(props.data.storage).value : 0,
    unit: props.data.storage ? formatPrice(props.data.storage).unit : '',
    prop: 'storage',
    isDisabled: false,
    pricingOption: EPricingOptions.storage 
  },
  ////////////////////////////////////////////////////////////////
  // REMOVE OR COMMENT OUT THE LINES ABOVE BEFORE MERGING
  ////////////////////////////////////////////////////////////////
  {
    label: t('$.data_transfer'),
    value: props.data.bandwidth ? formatPrice(props.data.bandwidth).value : 0,
    unit: props.data.bandwidth ? formatPrice(props.data.bandwidth).unit : '',
    prop: 'bandwidth',
    isDisabled: false,
    pricingOption: EPricingOptions.data_transfer 
  }
])

const selectedPricingValue = computed(() => {
  if (editPricingOption.value === EPricingOptions.compute) {
    return props.data.cpu
  } else if (editPricingOption.value === EPricingOptions.storage) {
    return props.data.storage
  } else if (editPricingOption.value === EPricingOptions.data_transfer) {
    return props.data.bandwidth
  } else {
    return 0
  }
})

const updatePrice = (newPrice: number) => {
  if (editPricingOption.value === EPricingOptions.compute) {
    props.data.cpu = newPrice
  } else if (editPricingOption.value === EPricingOptions.storage) {
    props.data.storage = newPrice
  } else if (editPricingOption.value === EPricingOptions.data_transfer) {
    props.data.bandwidth = newPrice
  }

  // emit('update:price', { prop, value })  
}

</script>

<template>
  <SettingsSection
    :title="$t('hosting_preferences.prices.header')"
    class="prices-section"
  >
    <span class="prices-section__subtitle">
      {{ $t('hosting_preferences.prices.subheader') }}
    </span>

    <div class="prices-configuration">
      <div class="prices-section__prices">
        <HostingPreferencesEditablePriceRow
          v-for="price in prices"
          :key="price.label"
          v-bind="price"
          :selected_pricing_option="editPricingOption"
          class="prices-section__price"
          @begin_edit="(payload) => editPricingOption = payload.pricingOption"
          @cancel_update="editPricingOption = null"
        />
      </div>

      <PricingHistogram v-if="editPricingOption !== null"
        :selected_pricing_option="editPricingOption"
        @update_price="updatePrice"
        :disabled="false"
        :price="selectedPricingValue"
      >
      </PricingHistogram>    
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
    display: flex;
    flex-direction: column;
    margin-top: 24px;
    margin-left: 40px;
    margin-right: 24px;
  }

  &__price {
    margin-top: 6px;
  }

  .prices-configuration {
    display: flex;
    flex-direction: row;
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    color: #313c59;
  }
}
</style>
