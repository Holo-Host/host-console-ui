<template>
  <PrimaryLayout title="Earnings">
    <section class='top-row'>
      <span class='available-label'>Total Available HF: </span><span class='available-hf'>{{ availableHF.toLocaleString() }}</span>
      <a href='' class='holofuel-link'><LeaveSiteIcon class='leave-site-icon' />Go to HoloFuel</a>
    </section>
    <section class='card row'>
      <div class='column'>
        <h3 class='card-title'>Weekly Earnings</h3>
        <div class='hf-amount'>{{ weeklyEarnings.toLocaleString() }} HF</div>
        <div class='graph' />
      </div>
      <div class='column main-links'>
        <router-link to='/earnings/invoices' class='main-link'>
          <PaymentIcon class='main-link-icon'/>Payments <RightChevronIcon class='right-chevron-icon' color="#606C8B" />
        </router-link>
        <router-link :to="{ path: '/earnings/invoices', query: { filter: 'unpaid'} }" class='main-link'>
          <PaymentIcon class='main-link-icon'/>Unpaid & Late <RightChevronIcon class='right-chevron-icon' color="#606C8B" />
        </router-link>
        <router-link :to="{ path: '/earnings/invoices', query: { filter: 'exceptions'} }" class='main-link'>
          <PaymentIcon class='main-link-icon'/>Exceptions <RightChevronIcon class='right-chevron-icon' color="#606C8B" />
        </router-link>
      </div>
    </section>

    <section class='card'>
      <h3 class='card-title'>Redeemable HoloFuel</h3>
      <div class='hf-amount'>{{ redeemableHF.toLocaleString() }} HF</div>
      <div class='redemption-links'>
        <router-link to='/earnings' class='main-link'>
          <PaymentIcon class='main-link-icon'/>Redemption History
        </router-link>
        <router-link to='/earnings' class='main-link'>
          <PaymentIcon class='main-link-icon'/>Redeem HoloFuel
        </router-link>
      </div>
    </section>
  </PrimaryLayout>
</template>

<script>
import PrimaryLayout from 'components/PrimaryLayout.vue'
import LeaveSiteIcon from 'components/icons/LeaveSiteIcon'
import PaymentIcon from 'components/icons/PaymentIcon'
import RightChevronIcon from 'components/icons/RightChevronIcon'

export default {
  name: 'Earnings',
  components: {
    PrimaryLayout,
    LeaveSiteIcon,
    PaymentIcon,
    RightChevronIcon
  },
  data () {
    return {
      availableHF: 4_233_456.0665,
      redeemableHF: 2_990_348.0342,
      lastWeekOfEarnings: [
        150_000.78,
        200_000,
        75_000,
        225_000,
        150_000,
        240_000,
        275_000,
      ]
    }
  },
  computed: {
    weeklyEarnings () {
      return this.lastWeekOfEarnings.reduce((sum, day) => sum + day, 0)
    }
  },
  methods: {

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
  color: #606C8B;
  margin-right: 10px;
}
.available-hf {
  font-weight: bold;
  font-size: 18px;
  line-height: 25px;
  color: #313C59;
  margin-right: 52px;
}
.holofuel-link {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-decoration-line: underline;
  color: #313C59;
}
.leave-site-icon {
  margin-right: 10px;
}
.card {
  background: #FFFFFF;
  box-shadow: 0px 4px 20px #ECEEF1;
  border-radius: 12px;
  padding: 35px 90px;
  margin-bottom: 55px;
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
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  color: #313C59;
}
.hf-amount {
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  color: #606C8B;
  margin-bottom: 40px;
}
.graph {
  width: 200px;
  height: 123px;
  border: 1px solid lightgray;
  border-radius: 4px;
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
  color: #313C59;
  display: flex;
  align-items: center;
}
.main-link-icon {
  margin-right: 14px;
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
}


@media screen and (max-width: 1050px) {
  .card.row {
    flex-direction: column;
  }
  .column {
    flex-basis: initial;
  }
  .redemption-links {
    flex-direction: column;
  }
  .main-link {
    margin-right: 0;
  }
}
</style>
