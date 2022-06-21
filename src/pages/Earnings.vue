<template>
  <PrimaryLayout title="Earnings">
    <section class="top-row">
      <span class="available"><span class="available-label">Total Available HF: </span><span class="available-hf">{{ availableHF.toLocaleString() }}</span></span>
      <a
        href=""
        class="holofuel-link"
      ><LeaveSiteIcon class="leave-site-icon" />Go to HoloFuel</a>
    </section>
    <section class="card">
      <h3 class="card-title">
        Weekly Earnings
      </h3>
      <div class="card-content row">
        <div class="column">
          <div class="hf-amount">
            {{ weeklyEarnings.toLocaleString() }} HF
          </div>
          <TmpGraphIcon class="graph" />
        </div>
        <div class="column main-links">
          <router-link
            to="/earnings/invoices"
            class="main-link"
          >
            <PaymentIcon class="main-link-icon" />Payments <RightChevronIcon
              class="right-chevron-icon"
              color="#606C8B"
            />
          </router-link>
          <router-link
            :to="{ path: '/earnings/invoices', query: { filter: 'unpaid'} }"
            class="main-link"
          >
            <UnpaidLateIcon class="main-link-icon" />Unpaid &amp; Late <RightChevronIcon
              class="right-chevron-icon"
              color="#606C8B"
            />
          </router-link>
          <router-link
            :to="{ path: '/earnings/invoices', query: { filter: 'exceptions'} }"
            class="main-link"
          >
            <FilledExclamationIcon class="main-link-icon" />Exceptions
            <span class="notification">2 new</span>
            <RightChevronIcon
              class="right-chevron-icon"
              color="#606C8B"
            />
          </router-link>
        </div>
      </div>
    </section>

    <section class="card">
      <h3 class="card-title">
        Redeemable HoloFuel
      </h3>
      <div class="card-content">
        <div class="hf-amount">
          {{ redeemableHF.toLocaleString() }} HF
        </div>
        <div class="redemption-links">
          <router-link
            to="/earnings"
            class="main-link"
          >
            <RedemptionHistoryIcon class="main-link-icon" />Redemption History
          </router-link>
          <router-link
            to="/earnings"
            class="main-link"
          >
            <FatArrowIcon class="main-link-icon" />Redeem HoloFuel
          </router-link>
        </div>
      </div>
    </section>
  </PrimaryLayout>
</template>

<script>
import FatArrowIcon from 'components/icons/FatArrowIcon'
import FilledExclamationIcon from 'components/icons/FilledExclamationIcon'
import LeaveSiteIcon from 'components/icons/LeaveSiteIcon'
import PaymentIcon from 'components/icons/PaymentIcon'
import RedemptionHistoryIcon from 'components/icons/RedemptionHistoryIcon'
import RightChevronIcon from 'components/icons/RightChevronIcon'
import TmpGraphIcon from 'components/icons/TmpGraphIcon'
import UnpaidLateIcon from 'components/icons/UnpaidLateIcon'
import PrimaryLayout from 'components/PrimaryLayout.vue'

export default {
  name: 'EarningsPage',

  components: {
    PrimaryLayout,
    LeaveSiteIcon,
    PaymentIcon,
    UnpaidLateIcon,
    FilledExclamationIcon,
    RedemptionHistoryIcon,
    FatArrowIcon,
    RightChevronIcon,
    TmpGraphIcon
  },

  data() {
    return {
      availableHF: 4233456.0665,
      redeemableHF: 2990348.0342,
      // eslint-disable-next-line no-magic-numbers
      lastWeekOfEarnings: [150000.78, 200000, 75000, 225000, 150000, 240000, 275000]
    }
  },

  computed: {
    weeklyEarnings() {
      return this.lastWeekOfEarnings.reduce((sum, day) => sum + day, 0)
    }
  }
}
</script>

<style scoped>
.top-row {
  display: flex;
  flex-direction: row;
  margin-bottom: 32px;
}
.available-label {
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  color: #606c8b;
  margin-right: 10px;
}
.available-hf {
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  color: #313c59;
  margin-right: 52px;
}
.holofuel-link {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-decoration-line: underline;
  color: #313c59;
}
.leave-site-icon {
  margin-right: 10px;
}
.card {
  background: #ffffff;
  box-shadow: 0 4px 20px #eceef1;
  border-radius: 12px;
  margin-bottom: 55px;
}
.card-content {
  padding: 0 90px 35px 90px;
}
.row {
  display: flex;
  justify-content: space-between;
}
.column {
  display: flex;
  flex-direction: column;
  flex-basis: 50%;
}
.main-links {
  padding-top: 26px;
}
.card-title {
  margin: 0 0 5px 0;
  padding: 35px 90px 0 90px;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  color: #313c59;
}
.hf-amount {
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  color: #606c8b;
  margin-bottom: 40px;
}
.main-link {
  height: 52px;
  margin: 0 28px 24px 0;
  padding: 0 14px 0 50px;
  background: rgba(176, 236, 240, 0.72);
  border-radius: 5px;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  color: #313c59;
  display: flex;
  align-items: center;
  text-decoration: none;
}
.main-link-icon {
  margin-right: 14px;
}
.notification {
  background-color: white;
  font-weight: bold;
  font-size: 9px;
  line-height: 12px;
  color: #000000;
  border-radius: 5px;
  margin-left: 18px;
  padding: 2px 8px;
}
.right-chevron-icon {
  margin-left: auto;
  transform: scale(1.8);
}
.redemption-links {
  display: flex;
}
.redemption-links .main-link {
  padding-left: 35px;
  padding-right: 35px;
  min-width: 185px;
}

@media screen and (max-width: 1050px) {
  .card {
    box-shadow: 0 4px 20px #eceef1;
    margin-bottom: 28px;
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
  .card-content.row {
    flex-direction: column;
  }
  .top-row {
    flex-direction: column;
  }
  .available {
    margin-bottom: 16px;
  }
  .available-hf {
    margin-right: 0;
  }
  .card.row {
    flex-direction: column;
  }
  .column {
    flex-basis: initial;
  }
  .hf-amount {
    line-height: 56px;
    margin-bottom: 0;
  }
  .redemption-links {
    flex-direction: column;
  }
  .main-links {
    padding-top: 0;
  }
  .main-link {
    margin-right: 0;
  }
  .main-link:last-child {
    margin-bottom: 8px;
  }
  .graph {
    display: none;
  }
}
</style>
