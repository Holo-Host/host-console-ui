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
    value: props.data.cpu,
    unit: 'HF per min',
    prop: 'cpu',
    isDisabled: true
  },
  {
    label: t('$.storage'),
    value: props.data.storage,
    unit: 'HF per GB',
    prop: 'storage',
    isDisabled: true
  },
  {
    label: t('$.bandwidth'),
    value: props.data.bandwidth,
    unit: 'HF per GB',
    prop: 'bandwidth',
    isDisabled: true
  }
])

function updatePrice({ prop, value }) {
  emit('update:price', { prop, value })
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
