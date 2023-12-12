<script lang="ts" setup>
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'
import BaseButton from '@uicommon/components/BaseButton'
import BaseModal from '@uicommon/components/BaseModal'
import { useModals } from '@uicommon/composables/useModals'
import { EButtonType } from '@uicommon/types/ui'
import { computed, markRaw, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import PaidHostingWizardStepOne from '@/components/settings/hostingPreferences/PaidHostingWizardStepOne.vue'
import PaidHostingWizardStepTwo from '@/components/settings/hostingPreferences/PaidHostingWizardStepTwo.vue'
import { EModal, PaidHostingWizardStep } from '@/constants/ui'
import { useHposInterface } from '@/interfaces/HposInterface'
import { isError as isErrorPredicate } from '@/types/predicates'

const { t } = useI18n()

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const { showModal } = useModals()
const { updateHAppHostingPlan } = useHposInterface()

const props = defineProps<{
  planValue: 'free' | 'paid'
}>()

const emit = defineEmits(['close', 'cancel', 'update:hosting-plan'])

const isConfirmed = ref(false)
const isBusy = ref(false)
const isError = ref(false)

const transitionName = ref('')

const prices = ref({
  cpu: null,
  dataTransfer: null
})

const hApps = ref([])

const steps = ref<[PaidHostingWizardStep, PaidHostingWizardStep]>([
  {
    id: 1,
    title: t('hosting_preferences.toggle_paid_hosting_modal.step_one.title'),
    description: t('hosting_preferences.toggle_paid_hosting_modal.step_one.description'),
    nextButtonLabel: '$.next',
    props: prices.value
  },
  {
    id: 2,
    title: t('hosting_preferences.toggle_paid_hosting_modal.step_two.title'),
    description: t('hosting_preferences.toggle_paid_hosting_modal.step_two.description'),
    backButtonLabel: '$.back',
    nextButtonLabel: '$.next',
    props: { hApps: hApps.value }
  }
])

const stepComponents = ref([markRaw(PaidHostingWizardStepOne), markRaw(PaidHostingWizardStepTwo)])

const currentStep = ref(0)

const backButtonLabel = computed(() => {
  return steps.value[currentStep.value - 1]?.backButtonLabel ?? '$.cancel'
})

const nextButtonLabel = computed(() => {
  if (currentStep.value === 0) {
    return props.planValue === 'free'
      ? 'hosting_preferences.toggle_paid_hosting_modal.free.confirmation_button_label'
      : 'hosting_preferences.toggle_paid_hosting_modal.paid.confirmation_button_label'
  } else {
    return steps.value[currentStep.value - 1]?.nextButtonLabel ?? '$.next'
  }
})

// Steps management
function goToPreviousStep(): void {
  transitionName.value = 'slide-right'

  if (currentStep.value > 1) {
    currentStep.value -= 1
  } else {
    cancel()
  }
}

const isNextButtonDisabled = computed((): boolean => {
  if (currentStep.value === 1) {
    return prices.value.cpu === null || prices.value.dataTransfer === null
  }

  if (currentStep.value === 2) {
    return false
  }

  return false
})

function updateValue({ prop, value }: { prop: string; value: string | number }): void {
  switch (prop) {
  case 'cpu':
    prices.value.cpu = value
    break

  case 'dataTransfer':
    prices.value.dataTransfer = value
    break

  default:
    console.error('Unknown prop')
  }
}

function goToNextStep(): void {
  transitionName.value = 'slide-left'

  /* eslint-disable @typescript-eslint/no-magic-numbers */
  switch (currentStep.value) {
  case 0:
    currentStep.value = 1
    break

  case steps.value[0]?.id:
    currentStep.value = 2
    break

  case steps.value[1]?.id:
    confirm()
    break

  default:
    console.error('Sorry, there are no more steps, you are falling into oblivion.')
  }
  /* eslint-enable @typescript-eslint/no-magic-numbers */
}

function cancel(): void {
  isBusy.value = false
  isConfirmed.value = false
  isError.value = false
  emit('cancel')
}

function confirm(): void {
  isBusy.value = true
  emit('update:hosting-plan', props.planValue)

  isBusy.value = false

  const result = null

  // if (!result) {
  //   // If failed
  //   cancel()
  //
  //   setTimeout(() => {
  //     showModal(EModal.error_modal)
  //   }, 300)
  // } else {
  //   // If success
  //   isBusy.value = false
  //   isConfirmed.value = true
  // }
}
</script>

<template>
  <BaseModal
    is-visible
    :content-padding="currentStep === 0 ? 'md' : 'sm'"
    @close="cancel"
  >
    <div
      v-if="!isError"
      class="stop-hosting-modal"
    >
      <Transition
        :name="transitionName"
        mode="out-in"
      >
        <component
          :is="stepComponents[currentStep - 1]"
          :steps="steps"
          class="mt-16 ml-1 sm:mt-6"
          @update:value="updateValue"
          @go-to-next-step="goToNextStep"
          @go-to-previous-step="goToPreviousStep"
        />
      </Transition>

      <div v-if="currentStep === 0">
        <ExclamationCircleIcon
          class="stop-hosting-modal__icon"
        />
        <p class="stop-hosting-modal__title">
          {{ props.planValue === 'free' ? t('hosting_preferences.toggle_paid_hosting_modal.free.title') : t('hosting_preferences.toggle_paid_hosting_modal.paid.title') }}
        </p>

        <p class="stop-hosting-modal__description">
          {{ props.planValue === 'free' ? t('hosting_preferences.toggle_paid_hosting_modal.free.description') : t('hosting_preferences.toggle_paid_hosting_modal.paid.description') }}
        </p>
      </div>
    </div>

    <template
      v-if="isConfirmed"
      #buttons
    >
      <BaseButton
        @click="cancel"
      >
        {{ t('$.close') }}
      </BaseButton>
    </template>

    <template
      v-else
      #buttons
    >
      <div class="stop-hosting-modal__form-buttons">
        <BaseButton
          :type="EButtonType.tertiary"
          :is-disabled="isBusy"
          class="stop-hosting-modal__form-buttons-back-button"
          @click="goToPreviousStep"
        >
          {{ t(backButtonLabel) }}
        </BaseButton>

        <BaseButton
          :is-busy="isBusy"
          :is-disabled="isBusy || isNextButtonDisabled"
          class="stop-hosting-modal__form-buttons-next-button"
          @click="goToNextStep"
        >
          {{ t(nextButtonLabel) }}
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<style lang="scss" scoped>
.stop-hosting-modal {
  display: flex;
  align-items: center;
  flex-direction: column;
  font-weight: 600;

  &__icon {
    width: 66px;
    height: 66px;
    color: var(--primary-color);
  }

  &__title {
    margin-top: 20px;
    font-weight: 700;

    &--success {
      font-weight: 800;
    }
  }

  &__description {
    margin-top: 8px;
    font-weight: 600;
  }

  &__form-buttons {
    width: 100%;
    display: flex;
    margin-top: 8px;
    padding: 0 12px;

    &-back-button {
      width: 100%;
    }

    &-next-button {
      width: 100%;
      margin-left: 16px;
    }
  }
}
</style>
