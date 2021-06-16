<template>
  <PrimaryLayout title="Dashboard">
    <div class="row">
      <div class="card two-columns">
        <h2 class="title">Usage</h2>
        <div class="inner-row">
          <div class="inner-column">
            <h3 class="inner-title">hApps</h3>
            <div class="info-row">
              <span class="bold" data-testid='happ-no'>{{ totalHostedHapps }}&nbsp;</span> Total hApps hosted
            </div>
            <div class="info-row">
              <span class="bold" data-testid='sc-no'>{{ dashboard.totalSourceChains }}&nbsp;</span> Total source chains hosted
            </div>
            <router-link to="/preferences" class='info-row hosting-preferences' active-class="active-link">
              <GearIcon class="gear-icon" color="#606C8B" />Hosting Preferences
            </router-link>
          </div>
          <div class="inner-column">
            <h3 class="inner-title">Daily Snapshot</h3>
            <div class="info-row">
              <span class="daily-label">CPU</span>
              <span class="bold">{{ presentMicroSeconds(dashboard.usage.cpu) }}</span>
            </div>
            <div class="info-row">
              <span class="daily-label">Storage</span>
              <span class="bold">{{ presentBytes(dashboard.currentTotalStorage) }}</span>
            </div>
            <div class="info-row">
              <span class="daily-label">Bandwidth</span>
              <span class="bold">{{ presentBytes(dashboard.usage.bandwidth) }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="card">
        <h2 class="title grayed-out">HoloFuel</h2>
        <div class="body">
          <div class="holofuel-info-row grayed-out">Balance</div>
          <div class="holofuel-info-row margin-bottom grayed-out">-- HF</div>
          <div class="holofuel-info-row grayed-out">Redeemable</div>
          <div class="holofuel-info-row grayed-out">-- HF</div>
          <button class="redeem-button">Redeem HoloFuel</button>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="card">
        <h2 class="title grayed-out">Top Hosted hApps</h2>
        <div class="body grayed-out">
          <div v-if="!topHostedHapps || topHostedHapps.length === 0">Currently no hApps to display</div>
          <div v-for="happ in topHostedHapps" class="top-happ-row" :key="happ.id">
            <div class='logo'><MissingLogoExIcon class='ex-icon' /></div>
            <div class='top-happ-details'>
              <div class="holofuel-info-row grayed-out">{{ happ.name }}</div>
              <div class="holofuel-info-row margin-bottom grayed-out">-- HF</div>
            </div>
          </div>
          <a class='more'>
            More <RightArrowIcon class='right-arrow-icon' />
          </a>
        </div>
      </div>
      <div class="card">
        <h2 class="title grayed-out">
          Earnings
          <h3 class="subtitle grayed-out">Last 7 days</h3>
        </h2>
        <div class="body">
          <div class="earnings-info-row grayed-out">
            <span class="earnings-label">Total HF invoiced:</span>
            -- HF
          </div>
          <div class="earnings-info-row grayed-out">
            <span class="earnings-label">Average Weekly:</span>
            -- HF
          </div>
          <div class="earnings-info-row grayed-out">
            <span class="earnings-label">Weekly Change:</span>
            -- %
          </div>
          <a class='more'>
            More <RightArrowIcon class='right-arrow-icon' />
          </a>
        </div>
      </div>
      <div class="card">
        <h2 class="title grayed-out">Recent Payments</h2>
        <div class="body grayed-out">
          <div v-if="!recentPayments || recentPayments.length === 0">Currently no payments to display</div>
          <div v-for="payment in recentPayments" class="payment-row" :key="payment.id">
            <div class="payment-amount">-- HF</div>
            <div class="payment-details">
              <div class="">Received</div>
              <div class="payment-happ">{{ payment.happ }}</div>
            </div>
            <div class="payment-time">{{ payment.time }}</div>
          </div>
          <a class='more'>
            More <RightArrowIcon class='right-arrow-icon' />
          </a>
        </div>
      </div>
    </div>
  </PrimaryLayout>
</template>

<script>
import PrimaryLayout from 'components/PrimaryLayout.vue'
import GearIcon from 'components/icons/GearIcon'
import RightArrowIcon from 'components/icons/RightArrowIcon'
import MissingLogoExIcon from 'components/icons/MissingLogoExIcon'
import HposInterface from 'src/interfaces/HposInterface'
import { presentMicroSeconds, presentBytes } from 'src/utils'

const topHostedHapps = [
  {
    id: 1,
    name: "HoloFuel"
  },
  {
    id: 2,
    name: "HC-Wiki"
  },
  {
    id: 3,
    name: "SF GeoChat"
  }
]

const recentPayments = [
  {
    id: 1,
    time: '13:09',
    happ: 'HoloFuel'
  },
  {
    id: 2,
    time: '10:33',
    happ: 'SF GeoChat'
  },
  {
    id: 2,
    time: '08:56',
    happ: 'HC-Wiki'
  }
]

export default {
  name: 'Dashboard',
  components: {
    PrimaryLayout,
    GearIcon,
    RightArrowIcon,
    MissingLogoExIcon
  },
  data () {
    return {
      dashboard: {
        usage: {}
      },
      totalHostedHapps: '--',
      topHostedHapps,
      recentPayments
    }
  },
  created: async function () {
    this.dashboard = await HposInterface.dashboard()
    this.totalHostedHapps = (await HposInterface.hostedHapps()).length
  },
  methods: {
    presentMicroSeconds,
    presentBytes
  }
}

</script>

<style scoped>
.row {
  display: flex;
  flex-direction: row;
  margin-bottom: 32px;
}
.card {
  display: flex;
  flex-direction: column;
  margin-right: 30px;
  flex-basis: 33%;
  background-color: white;
  box-shadow: 0px 4px 20px #ECEEF1;
  border-radius: 12px;
}
.card:last-child {
  margin-right: 14px;
}
.two-columns {
  flex-basis: 69%;
}
.title {
  display: flex;
  align-items: center;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background-color: #F0FCFD;
  font-weight: bold;
  font-size: 22px;
  line-height: 30px;
  color: black;
  padding: 10px 28px;
  margin: 0;
}
.subtitle {
  margin: 0;
  margin-left: auto;
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  color: #606C8B;
}
.body {
  margin: 26px 26px 13px 26px;
  display: flex;
  flex-direction: column;
  flex-basis: 68%;
}
.inner-row {
  display: flex;
  flex-direction: row;
}
.inner-column {
  flex-basis: 50%;
  padding: 26px 30px;
}
.inner-title {
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  margin: 0;
  margin-bottom: 20px;
}
.more {
  font-size: 14px;
  line-height: 19px;
  color: rgba(0, 202, 217, 0.18);
  margin: auto 0 0 auto;
  display: flex;
  align-items: center;
  cursor: pointer;
}
.info-row {
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 19px;
  color: #606C8B;
  margin-bottom: 10px;
}
.daily-label {
  min-width: 118px;
}
.holofuel-info-row {
  display: flex;
  align-items: center;
  font-size: 14px;
  font-weight: 600;
  line-height: 19px;
  color: #606C8B;
}
.top-happ-row {
  display: flex;
  margin-bottom: 4px;
}
.earnings-info-row {
  display: flex;
  align-items: center;
  font-size: 14px;
  line-height: 19px;
  color: #606C8B;
  margin-bottom: 20px;
}
.earnings-label {
  min-width: 128px;
}
.payment-row {
  display: flex;
  align-items: flex-start;
  font-size: 14px;
  line-height: 19px;
  margin-bottom: 16px;
}
.payment-amount {
  min-width: 128px;
  font-weight: bold;
}
.payment-details {
  min-width: 72px;
}
.payment-happ {
  font-style: italic;
  font-size: 12px;
  line-height: 16px;
}
.payment-time {
  font-size: 9px;
  line-height: 12px;
  margin-top: 4px;
}
.logo {
  border: 1px solid #E7E9ED;
  box-sizing: border-box;
  border-radius: 5px;
  width: 37px;
  height: 37px;
  margin: 0 16px;
}
.redeem-button {
  margin-top: 20px;
  align-self: center;
  border: none;
  color: white;
  font-size: 12px;
  line-height: 16px;
  background: rgba(8, 112, 163, 0.18);
  border-radius: 100px;
  height: 35px;
  padding: 0 25px;
  cursor: pointer;
  margin-bottom: 10px;
}
.right-arrow-icon {
  margin-top: 2px;
}
.gear-icon {
  margin-right: 5px;
}
.bold {
  font-weight: bold;
}
.margin-bottom {
  margin-bottom: 10px;
}
/* Temporary, remove once we have all live data */
.grayed-out {
  color: rgba(96, 108, 139, 0.18);
}

@media screen and (max-width: 1050px) {
  .row {
    flex-direction: column;
    margin: 0;
  }

  .card {
    margin-bottom: 28px;
    margin-right: 0;
  }

  .card:last-child {
    margin-right: 0;
  }

  .inner-row {
    flex-direction: column;
  }

  /* Hiding hosting preferences link in mobile view as dictated in the designs */
  .hosting-preferences {
    display: none;
  }
}
</style>
