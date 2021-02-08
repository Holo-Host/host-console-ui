<template>
  <PrimaryLayout :breadcrumbs="breadcrumbs">
    <div class='happ-details'>
      <router-link class="back-link" to="/">
        <LeftChevronIcon class="left-chevron" />
        Back
      </router-link>
      <div class='columns'>
        <div class='left-column'>
          <div class='avatar'>{{ initials }}</div>
          <div class='description-label'>Description</div>
          <div class='description'>{{ happ.description }}</div>
        </div>
        <div class='main-column'>
          <h2 class="name">{{ happ.name }}</h2>
          <div class="info-row large-text">
            <HoloIcon class='holo-icon' /> Total Earnings:<span class="info">&nbsp;{{ formatHolofuelAmount(happ.earnings) }} TF</span>
          </div>
          <div class="info-row">
            Earned in last 7 days:<span class="info">&nbsp;{{ formatHolofuelAmount(happ.sevenDayEarnings) }} TF</span>
          </div>
          <div class="info-row earnings-margin">
            Average weekly earnings:<span class="info">&nbsp;223,005 TF</span>
          </div>
          <div class="info-row">
            <ClockIcon class="clock-icon" /> Hosted for:&nbsp;<span class="info">{{ happ.hostedDays }} days</span>
          </div>
          <div class="info-row chains-margin">
            <ChainIcon class="chain-icon" /> Total source chains:&nbsp;<span class="info">{{ happ.sourceChains }}</span>
          </div>
          <div class="usage-row">
            <span class='usage-label'>Total usage:</span>
            <div class='usage'>
              <span class="usage-value">{{ happ.usage.cpu }}ms</span> CPU
            </div>
            <div class='usage'>
              <span class="usage-value">{{ happ.usage.storage }}MB</span> Storage
            </div>
            <div class='usage'>
              <span class="usage-value">{{ happ.usage.bandwidth }}Mb</span> Bandwidth            
            </div>
          </div>
          <div class='rates-title'>
            Rates (Default) <PencilIcon class='pencil-icon' @click="editRates" />
          </div>
          <div class="rate-row">
            <div class='rate-label'>CPU</div><span class="rate-value">26323653 ZPT</span>
          </div>          
          <div class="rate-row">
            <div class='rate-label'>Bandwidth</div><span class="rate-value">134 HF per Mb</span>
          </div>          
          <div class="rate-row rates-margin">
            <div class='rate-label'>Storage</div><span class="rate-value">119 HF per MB</span>
          </div>
          <div class="stop-hosting-row">
            <div class="stop-hosting" @click="stopHosting">Stop hosting</div>
            <div class="stop-hosting-warning">
              <AlertCircleIcon class="alert-circle-icon" />Stopping hosting will move any source chains to another host
            </div>
          </div>
        </div>
      </div>
    </div>
  </PrimaryLayout>
</template>

<script>

import PrimaryLayout from 'components/PrimaryLayout.vue'
import ClockIcon from 'components/icons/ClockIcon.vue'
import HoloIcon from 'components/icons/HoloIcon.vue'
import LeftChevronIcon from 'components/icons/LeftChevronIcon.vue'
import ChainIcon from 'components/icons/ChainIcon.vue'
import PencilIcon from 'components/icons/PencilIcon.vue'
import AlertCircleIcon from 'components/icons/AlertCircleIcon.vue'
import { formatHolofuelAmount } from 'src/utils'
import HposInterface from 'src/interfaces/HposInterface'

export default {
  name: 'HappDetails',
  components: {
    PrimaryLayout,
    ClockIcon,
    HoloIcon,
    LeftChevronIcon,
    ChainIcon,
    PencilIcon,
    AlertCircleIcon
  },
  data() {
    return {
      happ: {
        name: '',
        usage: {}
      }
    }
  },
  created: async function () {
    const happs = await HposInterface.hostedHapps()
    const happId = Number(this.$route.params.id)
    const happ = happs.find(({ id }) => id === happId)
    if (!happ) {
      throw new Error(`Failed to load happ with id: ${happId}`)
    }
    this.happ = happ
  },
  methods: {
    editRates () {
      alert('Editing rates is not implemented in this version')
    },
    stopHosting () {
      alert('Stopping hosting is not implemented in this version')
    },
    formatHolofuelAmount
  },
  computed: {
    breadcrumbs () {
      return [{
        label: 'hApps',
        path: '/'
      }, {
        label: this.happ.name || 'loading'
      }]
    },
    initials() {
      return this.happ.name.replace(/[^a-z]/gi, '').slice(0,2).toUpperCase()
    },
  }
}

</script>

<style scoped>
.happ-details {
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0px 4px 20px #ECEEF1;
  border-radius: 5px;
  margin: 40px 10px 20px 12px;
  padding: 30px;
  color: #606C8B;
  font-size: 14px;
  line-height: 19px;
  font-weight: 600;
}
.back-link {
  color: #606C8B;
  text-decoration: none;
  font-size: 14px;
  margin-bottom: 32px;
}
.columns {
  display: flex;
}
.left-column {
  display: flex;
  flex: 0;
  flex-direction: column;
  margin-right: 32px;
}
.avatar {
  width: 178px;
  height: 178px;
  border: 1px solid #606C8B;
  border-radius: 12px;
  text-align: center;  
  line-height: 178px;
  font-size: 40px;
  font-weight: bold;
  color:rgba(96, 108, 139, 0.46);
  margin-right: 10px;
  margin-bottom: 34px;
}
.description-label {
  margin-bottom: 4px;
}
.description {
  font-weight: 700;
  color: #313C59;
}
.main-column {
  display: flex;
  flex: 1;
  flex-direction: column;  
}
.name {
  margin: 0 0 34px 0;
  color: #313C59;
  font-weight: bold;
  font-size: 22px;
  line-height: 30px;
}
.arrow-icon {
  margin-left: auto;
}
.snapshot-label {
  margin-left: 3px;
  margin-bottom: 3px;
}
.info-row {
  display: flex;
  align-items: center;
  color: #606C8B;
  margin-bottom: 14px;
  font-size: 14px;
}
.large-text {
  font-size: 16px;
}
.info {
  font-weight: 700;
  color: #313C59;
}
.earnings-margin {
  margin-bottom: 48px;
}
.chains-margin {
  margin-bottom: 38px;
}
.holo-icon {
  margin-right: 4px;
}
.clock-icon {
  margin-right: 12px;
}
.chain-icon {
  margin-right: 8px;
}
.usage-row {
  display: flex;
  color: #313C59;
  font-size: 12px;
  font-weight: 600;
  padding-right: 36px;
  margin-bottom: 42px;
}
.usage-label {
  font-size: 14px;
}
.usage {
  display: flex;
  margin-left: 30px;
}
.usage-value {
  padding: 0 5px;
  border-bottom: 2px solid #00CAD9;
  font-size: 13px;
  font-weight: 700;
  margin-right: 7px;
}
.rates-title {
  display: flex;
  color: #313C59;
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
}
.pencil-icon {
  margin-left: 8px;
  cursor: pointer;
  opacity: 0.3;  
}
.rate-row {
  display: flex;
  margin-bottom: 14px;
}
.rate-label {
  flex: 0 0 100px;
}
.rate-value {
  color: #313C59;
  font-weight: 700;
}
.rates-margin {
  margin-bottom: 120px;
}
.stop-hosting-row {
  display: flex;
  align-items: center;
}
.stop-hosting {
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  text-decoration-line: underline;
  color: #313C59;
  margin-right: 10px;
}
.stop-hosting-warning {
  display: flex;
  align-items: center;
  background: #F3F5F8;
  border-radius: 4px;
  color: #313C59;
  font-size: 12px;
  font-weight: 400;
  padding: 4px 12px;
}
.alert-circle-icon {
  margin-right: 12px;
}
</style>
