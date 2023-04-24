<script setup lang="ts">
import { ChevronLeftIcon } from '@heroicons/vue/20/solid'
import BaseButton from '@uicommon/components/BaseButton.vue'
import BaseCard from '@uicommon/components/BaseCard.vue'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import RedeemHoloFuelFormStepOne from './RedeemHoloFuelFormStepOne.vue'
import RedeemHoloFuelFormStepTwo from './RedeemHoloFuelFormStepTwo.vue'
import { kRoutes } from '@/router'

const router = useRouter()

const props = defineProps<{
  redeemableHoloFuel: string | number
  isLoading: boolean
}>()

const amount = ref('')
const hotAddress = ref('')

const step = ref(1)

const canSubmit = computed((): boolean => {
  if (step.value === 1) {
    return amount.value !== '' && hotAddress.value !== ''
  }

  return true
})

interface SubmitProps {
  amount?: string
  hotAddress?: string
}

interface StepOneProps {
  amount?: string
  hotAddress?: string
}

function handleSubmit(props: SubmitProps): void {
  if (step.value === 1) {
    step.value = 2
  }
}

function updateData(updateProps: StepOneProps): void {
  amount.value = updateProps.amount ?? ''
  hotAddress.value = updateProps.hotAddress ?? ''
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
          :redeemable-amount="Number(props.redeemableHoloFuel)"
          @update="updateData"
        />

        <RedeemHoloFuelFormStepTwo
          v-if="step === 2"
          :amount="amount"
          :hot-address="hotAddress"
          @update="updateData"
        />
      </div>

      <div class="redeem-card-content__buttons">
        <span
          class="redeem-card-content__cancel-button"
          @click="router.push({ name: kRoutes.earnings.name })"
        >
          {{ $t('$.cancel') }}
        </span>

        <BaseButton
          :is-disabled="!canSubmit"
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
</style>
