<template>
  <PrimaryLayout :title="$t('$.earnings')">
    <BaseCard
      :is-loading="isLoading"
      :is-error="isError"
      @try-again-clicked="emit('try-again-clicked')"
    >
      <template #left>
        <WeeklyEarnings :weekly-earnings="weeklyEarnings" />
      </template>
      <template #right>
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
      </template>
    </BaseCard>

    <section class="card">
      <h3 class="card-title">
        Redeemable HoloFuel
      </h3>
      <div class="card-content">
        <div class="hf-amount">
          {{ redeemableHoloFuel }} HF
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

<script setup>
import BaseCard from '@uicommon/components/BaseCard'
import { formatCurrency } from '@uicommon/utils/numbers'
import WeeklyEarnings from 'components/earnings/WeeklyEarnings'
import FatArrowIcon from 'components/icons/FatArrowIcon'
import FilledExclamationIcon from 'components/icons/FilledExclamationIcon'
import LeaveSiteIcon from 'components/icons/LeaveSiteIcon'
import PaymentIcon from 'components/icons/PaymentIcon'
import RedemptionHistoryIcon from 'components/icons/RedemptionHistoryIcon'
import RightChevronIcon from 'components/icons/RightChevronIcon'
import TmpGraphIcon from 'components/icons/TmpGraphIcon'
import UnpaidLateIcon from 'components/icons/UnpaidLateIcon'
import PrimaryLayout from 'components/PrimaryLayout.vue'
import { computed, onMounted, ref } from 'vue'
import { useDashboardStore } from '@/store/dashboard'
import { useEarningsStore } from '@/store/earnings'

const dashboardStore = useDashboardStore()

const isLoading = ref(false)
const isError = ref(false)

const rawWeeklyEarnings = computed(() => dashboardStore.hostEarnings.earnings.last7days)

const weeklyEarnings = computed(() =>
  rawWeeklyEarnings.value && Number(rawWeeklyEarnings.value)
    ? formatCurrency(Number(rawWeeklyEarnings.value))
    : 0
)

const redeemableHoloFuel = computed(() => 0)

async function getEarnings() {
  isLoading.value = true
  await dashboardStore.getEarnings()
  isLoading.value = false
}

onMounted(async () => {
  if (!weeklyEarnings.value) {
    await getEarnings()
  }
})
</script>

<style scoped>
.card-content {
  padding: 0 50px 35px;
}

.card-title {
  margin: 10px 0 0 62px;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  color: var(--grey-dark-color);
}

.main-links {
  padding-top: 36px;
}

.hf-amount {
  font-weight: bold;
  font-size: 14px;
  line-height: 19px;
  color: var(--grey-color);
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
  color: var(--grey-dark-color);
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
