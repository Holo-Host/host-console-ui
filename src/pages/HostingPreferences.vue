<template>
  <PrimaryLayout :title="$t('hosting_preferences.header')">
    <PricesSection />

    <InvoicesSection
      :data="invoicesSettings"
      class="hosting-preferences__invoices"
      @update:frequency="updateFrequency"
      @update:due="updateDue"
    />

    <section class="card">
      <div class="greyed-out">
        <h3 class="card-title selection-title">
          hApp Selection
        </h3>

        <div class="card-content">
          <div class="selection-row">
            <span class="selection-label">Jurisdiction Exclusions</span>
            <span class="selection-choices">None</span>
            <PencilIcon class="pencil" />
          </div>

          <div class="selection-parent-row">
            <span class="selection-label">Category Tags:</span>
            <div class="selection-child-row">
              <span class="selection-label">Exclude</span>
              <span class="selection-choices">None</span>
              <PencilIcon class="pencil" />
            </div>
            <div class="selection-child-row">
              <span class="selection-label">Include</span>
              <span class="selection-choices">None</span>
              <PencilIcon class="pencil" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </PrimaryLayout>
</template>

<script setup>
import PencilIcon from 'components/icons/PencilIcon'
import PrimaryLayout from 'components/PrimaryLayout.vue'
import InvoicesSection from 'components/settings/hostingPreferences/InvoicesSection.vue'
import PricesSection from 'components/settings/hostingPreferences/PricesSection.vue'
import { reactive } from 'vue'

const invoicesSettings = reactive({
  frequency: {
    amount: 100,
    period: 7
  },
  due: {
    period: 7
  }
})

function updateFrequency(value) {
  invoicesSettings.frequency = value
}

function updateDue(value) {
  invoicesSettings.due = value
}
</script>

<style lang="scss" scoped>
.hosting-preferences {
  &__invoices {
    margin-top: 18px;
  }
}
</style>
