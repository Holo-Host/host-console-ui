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

<script setup >
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import SettingsSection from '../SettingsSection.vue'
import HostingPreferencesEditablePriceRow from './EditablePriceRow.vue'

const { t } = useI18n()

const props = defineProps({
  data: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['update:price'])

const prices = computed(() => [
  {
    label: t('$.cpu'),
    value: props.data.cpu || 0,
    unit: 'HF per min',
    prop: 'cpu',
    isDisabled: true
  },
  {
    label: t('$.storage'),
    value: props.data.storage ? formatPrice(props.data.storage).value : 0,
    unit: props.data.storage ? formatPrice(props.data.storage).unit : '',
    prop: 'storage',
    isDisabled: true
  },
  {
    label: t('$.bandwidth'),
    value: props.data.bandwidth ? formatPrice(props.data.bandwidth).value : 0,
    unit: props.data.bandwidth ? formatPrice(props.data.bandwidth).unit : '',
    prop: 'bandwidth',
    isDisabled: true
  }
])

function updatePrice({ prop, value }) {
  emit('update:price', { prop, value })
}

function formatPrice(pricePerByte) {
  if (isNaN(pricePerByte)) {
    return '-- GB'
  }

  if (pricePerByte === 0) {
    return '0 GB'
  }

  const k = 1024
  const sizes = ['byte', 'kB', 'MB', 'GB', 'TB']

  // eslint-disable-next-line no-magic-numbers
  const zerosAfterDecimal = -Math.floor(Math.log(pricePerByte) / Math.log(10))

  if (zerosAfterDecimal <= 0) {
    return {
      // eslint-disable-next-line no-magic-numbers
      value: parseFloat(pricePerByte).toFixed(0),
      unit: `HF per ${sizes[0]}`
    }
  }

  // eslint-disable-next-line no-magic-numbers
  const unitIndex = Math.floor(zerosAfterDecimal / 3)

  return {
    // eslint-disable-next-line no-magic-numbers
    value: parseFloat((pricePerByte * Math.pow(k, unitIndex)).toFixed(2)),
    unit: `HF per ${sizes[unitIndex]}`
  }
}
</script>

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
