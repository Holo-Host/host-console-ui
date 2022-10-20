<template>
  <PrimaryLayout title="Hosting Preferences">
    <PricesSection />

    <section class="card">
      <h3 class="card-title">
        Invoice &amp; Payment Terms
      </h3>

      <div class="card-content">
        <div class="terms-rows">
          <div class="terms-row">
            <span class="terms-label">Frequency of Invoicing:</span>
            <span class="terms-info">
              Invoice hApp publishers the earlier of every
              <select class="time-dropdown"><option>7 Days</option></select>
              or when an invoice amount reaches
              <span class="invoice-limit"><span class="invoice-limit-amount">100 HF</span><PencilIcon class="pencil" /></span>
            </span>
          </div>

          <div class="terms-row">
            <span class="terms-label">Payment Terms (Net):</span>
            <span class="terms-info net">
              Payment is due
              <select class="time-dropdown"><option>{{ paymentDue }} Days</option></select>
              after invoice date
            </span>
          </div>
        </div>

        <div class="fine-print">
          *hApps will be paused from hosting if payment is not received <span class="num-days">{{ paymentDue * 2 }} days</span> after invoice date
        </div>
        <div class="fine-print">
          *hApps will be removed if payment is not received <span class="num-days">{{ paymentDue * 4 }} days</span> after invoice date
        </div>
      </div>
    </section>

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
import PricesSection from 'components/settings/HostingPreferencesPricesSection.vue'
import { ref } from 'vue'

const paymentDue = ref(7)
</script>

<style scoped>
.card {
  background: #ffffff;
  box-shadow: 0 4px 20px #eceef1;
  border-radius: 12px;
  margin-bottom: 32px;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: var(--grey-dark-color);
}
.card-content {
  padding: 0 90px 35px 90px;
}
.card-title {
  margin: 0 0 5px 0;
  padding: 35px 90px 0 90px;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  color: var(--grey-dark-color);
}

.terms-rows {
  margin-bottom: 60px;
}
.terms-row {
  display: flex;
  align-items: center;
  line-height: 32px;
  flex-flow: wrap;
}
.terms-row:first-child {
  margin-top: 12px;
  margin-bottom: 18px;
}
.terms-row:last-child {
  margin-bottom: 10px;
}
.terms-label {
  flex-basis: 184px;
}
.terms-info {
  display: flex;
  flex-wrap: wrap;
}
.time-dropdown {
  font-weight: 800;
  font-size: 14px;
  line-height: 19px;
  color: var(--grey-color);
  border: 1px solid rgba(96, 108, 139, 0.18);
  box-sizing: border-box;
  border-radius: 5px;
  padding: 2px 6px;
  margin: 0 4px;
  pointer-events: none;
}
.invoice-limit {
  display: flex;
  align-items: center;
  margin-left: 4px;
}
.invoice-limit-amount {
  font-weight: 700;
  border-bottom: 1px solid var(--grey-dark-color);
  height: 24px;
  margin-bottom: 5px;
}
.fine-print {
  line-height: 24px;
  font-weight: 400;
  font-size: 12px;
  color: var(--grey-color);
}
.num-days {
  font-weight: 700;
}
.pencil {
  cursor: pointer;
  opacity: 0.2;
}
.invoice-limit .pencil {
  margin-left: 6px;
  margin-top: 7px;
}
.greyed-out {
  opacity: 0.2;
}
.selection-title {
  margin-bottom: 14px;
}
.selection-row {
  line-height: 44px;
  display: flex;
  align-items: center;
}
.selection-parent-row {
  line-height: 32px;
}
.selection-label {
  flex-basis: 184px;
}
.selection-choices {
  flex-basis: 44px;
}
.selection-child-row {
  line-height: 22px;
  padding-left: 40px;
  display: flex;
  align-items: center;
}
.selection-child-row .selection-label {
  flex-basis: 144px;
}

@media screen and (max-width: 1050px) {
  .card {
    box-shadow: 0 4px 20px #eceef1;
  }
  .card-title {
    background-color: #f0fcfd;
    padding: 0 0 0 20px;
    height: 45px;
    display: flex;
    align-items: center;
  }
  .card-content {
    padding: 0 20px 18px 20px;
  }
  .card-subtitle {
    margin-bottom: 8px;
  }
  .rate-row {
    padding-left: 0;
    line-height: 30px;
  }
  .terms-rows {
    margin-bottom: 0;
  }
  .terms-row {
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: 12px;
  }
  .terms-label {
    font-weight: bold;
    flex-basis: initial;
  }
  .terms-info {
    display: flex;
    flex-direction: column;
  }
  .terms-info.net {
    flex-direction: row;
  }
  .time-dropdown {
    margin-right: auto;
  }
  .invoice-limit {
    margin-right: auto;
    margin-left: 0;
  }
  .invoice-limit-amount {
    margin-right: auto;
    border: none;
    height: initial;
    margin-bottom: initial;
  }
  .fine-print {
    display: none;
  }
  .pencil {
    margin-top: 0;
  }
}
</style>
