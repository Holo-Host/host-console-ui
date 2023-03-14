<template>
  <SettingsSection
    :title="$t('hosting_preferences.invoices.header')"
    class="invoices-section"
  >
    <div class="invoices-section">
      <InvoicesFrequencyRow
        :data="props.data"
        @update:frequency="updateFrequency"
      />

      <InvoicesDueRow
        :data="props.data"
        class="invoices-section__due-row"
        @update:due="updateDue"
      />

      <div class="invoices-section__notes">
        <div>
          <span>{{ $t('hosting_preferences.invoices.note_one.part_one') }}</span>
          <span class="invoices-section__notes-value">{{ 2 * props.data.due.period || 'N/A' }} {{ $t('$.days') }}</span>
          <span>{{ $t('hosting_preferences.invoices.note_one.part_two') }}</span>
        </div>

        <div class="invoices-section__note-two">
          <span>{{ $t('hosting_preferences.invoices.note_two.part_one') }}</span>
          <span class="invoices-section__notes-value">{{ 4 * props.data.due.period || 'N/A' }} {{ $t('$.days') }}</span>
          <span>{{ $t('hosting_preferences.invoices.note_two.part_two') }}</span>
        </div>
      </div>
    </div>
  </SettingsSection>
</template>

<script setup lang="ts">
import SettingsSection from '../SettingsSection.vue'
import InvoicesDueRow from '@/components/settings/hostingPreferences/InvoicesDueRow.vue'
import InvoicesFrequencyRow from '@/components/settings/hostingPreferences/InvoicesFrequencyRow.vue'
import type { InvoicesData } from '@/types/types'

const props = defineProps<{
  data: InvoicesData
}>()

const emit = defineEmits(['update:frequency', 'update:due'])

function updateFrequency(value: number | string): void {
  emit('update:frequency', value)
}

function updateDue(value) {
  emit('update:due', value)
}
</script>

<style lang="scss" scoped>
.invoices-section {
  color: var(--grey-dark-color);
  padding-bottom: 18px;

  &__due-row {
    margin-top: 40px;
  }

  &__notes {
    opacity: 0.3;
    margin-top: 20px;
    font-size: 12px;
    color: var(--grey-color);

    &-value {
      margin: 0 3px;
      font-weight: 800;
    }
  }

  &__note-two {
    margin-top: 8px;
  }
}
</style>
