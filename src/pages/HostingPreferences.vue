<template>
  <PrimaryLayout title="Hosting Preferences">
    <section class='card'>
      <h3 class='card-title'>Price Configuration</h3>
      <div class='card-content'>
        <h4 class='card-subtitle'>Default rates</h4>

        <div class='rate-row'>
          <span class='rate-label'>CPU</span>
          <span class='rate-value'>100</span>
          <span class='rate-unit'>HF per min</span>
          <PencilIcon class='pencil' />
        </div>

        <div class='rate-row'>
          <span class='rate-label'>Storage</span>
          <span class='rate-value'>100</span>
          <span class='rate-unit'>HF per GB</span>
          <PencilIcon class='pencil' />
        </div>

        <div class='rate-row'>
          <span class='rate-label'>Bandwidth</span>
          <span class='rate-value'>100</span>
          <span class='rate-unit'>HF per GB</span>
          <PencilIcon class='pencil' />
        </div>
      </div>
    </section>

    <section class='card'>
      <h3 class='card-title'>Invoice & Payment Terms</h3>

      <div class='card-content'>
        <div>
          <div class='terms-row'>
            <span class='terms-label'>Frequency of Invoicing:</span>
            <span class='terms-info'>
              <span>Invoice hApp publishers the earlier of every</span>
              <select class='time-dropdown'><option>7 Days</option></select>
              <span>or when an invoice amount reaches</span>
              <span class='invoice-limit'><span class='invoice-limit-amount'>100HF</span><PencilIcon class='pencil' /></span>
            </span>
          </div>

          <div class='terms-row'>
            <span class='terms-label'>Payment Terms (Net):</span>
            <span class='terms-info'>
              Payment is due
              <select class='time-dropdown'><option>{{ paymentDue }} Days</option></select>
              after invoice date
            </span>
          </div>
        </div>

        <div class='fine-print'>*hApps will be paused from hosting if payment is not received <span class='num-days'>{{ paymentDue * 2 }} days</span> after invoice date</div>
        <div class='fine-print'>*hApps will be removed if payment is not received <span class='num-days'>{{ paymentDue * 4 }} days</span> after invoice date</div>
      </div>
    </section>

    <section class='card'>
      <div class='greyed-out'>
        <h3 class='card-title selection-title'>hApp Selection</h3>

        <div class='card-content'>
          <div class='selection-row'>
            <span class='selection-label'>Jurisdiction Exclusions</span>
            <span class='selection-choices'>None</span>
            <PencilIcon class='pencil' />
          </div>

          <div class='selection-parent-row'>
            <span class='selection-label'>Category Tags:</span>
            <div class=selection-child-row>
              <span class='selection-label'>Exclude</span>
              <span class='selection-choices'>None</span>
              <PencilIcon class='pencil' />
            </div>
            <div class=selection-child-row>
              <span class='selection-label'>Include</span>
              <span class='selection-choices'>None</span>
              <PencilIcon class='pencil' />
            </div>
          </div>
        </div>
      </div>
    </section>

  </PrimaryLayout>
</template>

<script>
import PrimaryLayout from 'components/PrimaryLayout.vue'
import PencilIcon from 'components/icons/PencilIcon'

export default {
  name: 'Earnings',
  components: {
    PrimaryLayout,
    PencilIcon
  },
  data () {
    return {
      paymentDue: 7
    }
  }
}

</script>

<style scoped>
.card {
  background: #FFFFFF;
  box-shadow: 0px 4px 20px #ECEEF1;
  border-radius: 12px;
  margin-bottom: 55px;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: #313C59;
}
.card-content {
  padding: 0px 90px 35px 90px;
}
.card-title {
  margin: 0 0 5px 0;
  padding: 35px 90px 0px 90px;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  color: #313C59;
}
.card-subtitle {
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  color: #313C59;
}
.rate-row {
  line-height: 46px;
  display: flex;
  align-items: center;
  padding-left: 42px;
}
.rate-label {
  flex-basis: 108px;
}
.rate-value {
  flex-basis: 54px;
}
.rate-unit {
  flex-basis: 86px;
}

.terms-row {
  display: flex;
  align-items: center;
  line-height: 32px;
}
.terms-row:last-child {
  margin-bottom: 10px;
}
.terms-label {
  flex-basis: 184px;
}
.terms-info {

}
.time-dropdown {
  font-weight: 800;
  font-size: 14px;
  line-height: 19px;
  color: #606C8B;
  border: 1px solid rgba(96, 108, 139, 0.18);
  box-sizing: border-box;
  border-radius: 5px;
  padding: 2px 6px;
  pointer-events: none;
}
.invoice-limit {
  display: flex;
  align-items: center;
}
.invoice-limit-amount {
  font-weight: 700;
  border-bottom: 1px solid #313C59;
}
.fine-print {
  line-height: 24px;
  font-weight: 400;
  font-size: 12px;
  color: #606C8B;
}
.num-days {
  font-weight: 700;
}
.pencil {
  cursor: pointer;
  opacity: 0.2;
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
    box-shadow: 0px 4px 20px #ECEEF1;
  }
  .card-title {
    background-color: #F0FCFD;
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
  .time-dropdown {
    margin-right: auto;
  }
  .invoice-limit {
    margin-right: auto;
  }
  .invoice-limit-amount {
    margin-right: auto;
    border: none;
  }
  .fine-print {
    display: none;
  }
}
</style>
