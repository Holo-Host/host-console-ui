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
        :label="price.label"
        :value="price.value"
        :unit="price.unit"
        class="prices-section__price"
      />
    </div>
  </SettingsSection>
</template>

<script setup >
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import HostingPreferencesEditablePriceRow from './HostingPreferencesEditablePriceRow.vue'
import SettingsSection from './SettingsSection'

const { t } = useI18n()

const prices = ref([
  {
    label: t('$.cpu'),
    value: 100,
    unit: 'HF per min'
  },
  {
    label: t('$.storage'),
    value: 100,
    unit: 'HF per GB'
  },
  {
    label: t('$.bandwidth'),
    value: 100,
    unit: 'HF per GB'
  }
])
</script>

<style lang="scss" scoped>
.prices-section {
  &__subtitle {
    color: var(--grey-dark-color);
    font-weight: 700;
  }

  &__prices {
    margin-top: 30px;
    margin-left: 40px;
  }

  &__price {
    margin-top: 6px;
  }
}
</style>
