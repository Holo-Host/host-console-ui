<script setup lang="ts">
import { ChevronLeftIcon } from '@heroicons/vue/20/solid'
import BaseButton from '@uicommon/components/BaseButton.vue'
import BaseCard from '@uicommon/components/BaseCard.vue'
import { useBanner } from '@uicommon/composables/useBanner'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import RedeemHoloFuelFormStepOne from './RedeemHoloFuelFormStepOne.vue'
import RedeemHoloFuelFormStepTwo from './RedeemHoloFuelFormStepTwo.vue'
import { RedemptionTransaction, useHposInterface } from '@/interfaces/HposInterface'
import { kRoutes } from '@/router'
import { useDashboardStore } from '@/store/dashboard'
import { isError } from '@/types/predicates'

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const { showBanner } = useBanner()
const { t } = useI18n()
const { redeemHoloFuel } = useHposInterface()
const router = useRouter()
const dashboardStore = useDashboardStore()

const props = defineProps<{
  isLoading: boolean
}>()

const emit = defineEmits(['submitted'])

const amount = ref('')
const hotAddress = ref('')
const partialRedemptionTermsAccepted = ref(false)
const step = ref(1)
const isBusy = ref(false)
const isStepOneValid = ref(false)

const canSubmit = computed((): boolean => {
  if (step.value === 1) {
    return isStepOneValid.value
  } else {
    return partialRedemptionTermsAccepted.value
  }
})

const redeemableHoloFuel = computed(() => {
  if (isError(dashboardStore.hostEarnings)) {
    return dashboardStore.hostEarnings
  }

  return dashboardStore.hostEarnings.holofuel.redeemable || '0'
})

interface StepOneProps {
  amount: string
  hotAddress: string
}

interface StepTwoProps {
  partialRedemptionTermsAccepted: boolean
}

async function handleSubmit(): Promise<void> {
  if (step.value === 1) {
    step.value = 2
  } else {
    isBusy.value = true

    await dashboardStore.getEarnings()

    if (Number(redeemableHoloFuel.value) < Number(amount.value)) {
      partialRedemptionTermsAccepted.value = false
      step.value = 1
      isBusy.value = false
      return
    }

    const transaction: RedemptionTransaction = await redeemHoloFuel({
      amount: amount.value,
      note: JSON.stringify({ eth_address: hotAddress })
    })

    if (transaction) {
      emit('submitted', { ...transaction, hotAddress })
    } else {
      step.value = 1
      isBusy.value = false

      showBanner({ message: t('redeem_holofuel.errors.redemption_failed') })
    }
  }
}

function updateData(updateProps: StepOneProps & StepTwoProps): void {
  if (step.value === 1) {
    amount.value = updateProps.amount
    hotAddress.value = updateProps.hotAddress
  } else {
    partialRedemptionTermsAccepted.value = updateProps.partialRedemptionTermsAccepted
  }
}
</script>

<template>
  <BaseCard :is-loading="props.isLoading">
    <div class="redeem-card-header">
      <ChevronLeftIcon class="redeem-card-header__back-icon" />
      <span
        class="redeem-card-header__back-label"
        @click="step === 1 ? router.push({ name: kRoutes.earnings.name }) : step = 1"
      >
        {{ $t('$.back') }}
      </span>
    </div>

    <div class="redeem-card-content">
      <div class="redeem-card-content__title">
        {{ $t('redeem_holofuel.title') }}
      </div>

      <div class="redeem-card-content__form">
        <RedeemHoloFuelFormStepOne
          v-if="step === 1"
          :redeemable-amount="Number(redeemableHoloFuel)"
          :amount="amount"
          :hot-address="hotAddress"
          @update="updateData"
          @update:is-valid="isStepOneValid = $event"
        />

        <RedeemHoloFuelFormStepTwo
          v-if="step === 2"
          :amount="amount"
          :hot-address="hotAddress"
          :partial-redemption-terms-accepted="partialRedemptionTermsAccepted"
          @update="updateData"
        />
      </div>

      <div
        class="redeem-card-content__buttons"
        :class="[
          { 'redeem-card-content__buttons--step-1': step === 1 },
          { 'redeem-card-content__buttons--step-2': step === 2 }
        ]"
      >
        <span
          class="redeem-card-content__cancel-button"
          @click="router.push({ name: kRoutes.earnings.name })"
        >
          {{ $t('$.cancel') }}
        </span>

        <BaseButton
          :is-disabled="!canSubmit"
          :is-busy="isBusy"
          class="redeem-card-content__submit-button"
          @click="handleSubmit"
        >
          {{ step === 1 ? $t('$.next') : $t('redeem_holofuel.confirm_and_redeem') }}
        </BaseButton>
      </div>
    </div>
  </BaseCard>
</template>

<style lang="scss" scoped>
.redeem-card-header {
  display: flex;
  justify-items: center;
  color: var(--grey-dark-color);
  cursor: pointer;

  &__back-icon {
    height: 16px;
  }

  &__back-label {
    margin-left: 3px;
    font-size: 14px;
  }
}

.redeem-card-content {
  margin-top: 30px;
  margin-left: 200px;
  color: var(--grey-dark-color);

  &__title {
    font-size: 22px;
    font-weight: 700;
  }

  &__form {
    margin-left: 2px;
  }

  &__buttons {
    margin-top: 54px;
    margin-left: 40px;

    &--step-1 {
      margin-bottom: 228px;
    }

    &--step-2 {
      margin-bottom: 75px;
    }
  }

  &__cancel-button {
    color: var(--grey-dark-color);
    cursor: pointer;
    font-size: 14px;
  }

  &__submit-button {
    margin-left: 20px;
  }
}

@media screen and (max-width: 1050px) {
  .redeem-card-content {
    margin-left: 0;
  }
}
</style>
