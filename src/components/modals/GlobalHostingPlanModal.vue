<script lang="ts" setup>
import { ExclamationCircleIcon } from '@heroicons/vue/24/outline'
import BaseButton from '@uicommon/components/BaseButton'
import BaseModal from '@uicommon/components/BaseModal'
import { useModals } from '@uicommon/composables/useModals'
import { EButtonType } from '@uicommon/types/ui'
import { computed, markRaw, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import PaidHostingWizardStepFour from '@/components/settings/hostingPreferences/PaidHostingWizardStepFour.vue'
import PaidHostingWizardStepOne from '@/components/settings/hostingPreferences/PaidHostingWizardStepOne.vue'
import PaidHostingWizardStepThree from '@/components/settings/hostingPreferences/PaidHostingWizardStepThree.vue'
import PaidHostingWizardStepTwo from '@/components/settings/hostingPreferences/PaidHostingWizardStepTwo.vue'
import { PaidHostingWizardStep } from '@/constants/ui'
import { HApp, useHposInterface } from '@/interfaces/HposInterface'
import { useDashboardStore } from '@/store/dashboard'
import { usePreferencesStore } from '@/store/preferences'
import { isError as isErrorPredicate } from '@/types/predicates'
import { EHostingPlan, MappedHApp } from '@/types/types'

const { t } = useI18n()
const dashboardStore = useDashboardStore()
const preferencesStore = usePreferencesStore()

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const { showModal } = useModals()
const { updateHAppHostingPlan } = useHposInterface()

const props = defineProps<{
  planValue: EHostingPlan
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

const isLoading = ref(false)
const hApps = ref(dashboardStore.hostedHApps)

const mappedHApps = ref<MappedHApp[]>([])

onMounted(async () => {
  // Check if hApps are already loaded, we won't have them if we load hosting preferences directly
  if (isErrorPredicate(hApps.value) || !hApps.value?.length) {
    try {
      isLoading.value = true
      await dashboardStore.getHostedHApps()

      if (!isErrorPredicate(hApps.value)) {
        mappedHApps.value = dashboardStore.hostedHApps.map((hApp: HApp) => ({
          id: hApp.id,
          name: hApp.name,
          icon: hApp.icon ?? null,
          hostingPlan: EHostingPlan.paid
        }))
      } else {
        mappedHApps.value = []
      }
    } finally {
      isLoading.value = false
    }
  } else {
    // If we have hApps, we need to map them to the list format
    mappedHApps.value = hApps.value.map((hApp: HApp): MappedHApp[] => ({
      id: hApp.id,
      name: hApp.name,
      icon: hApp.icon ?? null,
      hostingPlan: EHostingPlan.paid
    }))
  }
})

const steps = computed(
  (): [PaidHostingWizardStep, PaidHostingWizardStep, PaidHostingWizardStep] => [
    {
      id: 1,
      title: t('hosting_preferences.toggle_paid_hosting_modal.step_one.title'),
      description: t('hosting_preferences.toggle_paid_hosting_modal.step_one.description'),
      nextButtonLabel: '$.next',
      props: prices.value,
      isDismissible: true,
      hasCloseButton: true
    },
    {
      id: 2,
      title: t('hosting_preferences.toggle_paid_hosting_modal.step_two.title'),
      description: t('hosting_preferences.toggle_paid_hosting_modal.step_two.description'),
      backButtonLabel: '$.back',
      nextButtonLabel: '$.confirm',
      props: { hApps: mappedHApps.value },
      isDismissible: true,
      hasCloseButton: true
    },
    {
      id: 3,
      title: t('hosting_preferences.toggle_paid_hosting_modal.step_three.description_part_one'),
      description: t(
        'hosting_preferences.toggle_paid_hosting_modal.step_three.description_part_two'
      ),
      props: { progressValue: progress.value },
      isDismissible: false,
      hasCloseButton: false
    },
    {
      id: 4,
      title: t('hosting_preferences.toggle_paid_hosting_modal.step_four.title'),
      description: t('hosting_preferences.toggle_paid_hosting_modal.step_four.description'),
      props: { progressValue: progress.value },
      isDismissible: true,
      hasCloseButton: true
    }
  ]
)

const stepComponents = ref([
  markRaw(PaidHostingWizardStepOne),
  markRaw(PaidHostingWizardStepTwo),
  markRaw(PaidHostingWizardStepThree),
  markRaw(PaidHostingWizardStepFour)
])

const currentStep = ref(0)

const backButtonLabel = computed(() => {
  return steps.value[currentStep.value - 1]?.backButtonLabel ?? '$.cancel'
})

const nextButtonLabel = computed(() => {
  if (currentStep.value === 0) {
    return props.planValue === EHostingPlan.free
      ? 'hosting_preferences.toggle_paid_hosting_modal.free.confirmation_button_label'
      : 'hosting_preferences.toggle_paid_hosting_modal.paid.confirmation_button_label'
  } else {
    return steps.value[currentStep.value - 1]?.nextButtonLabel ?? '$.next'
  }
})

function cancel(): void {
  isBusy.value = false
  isConfirmed.value = false
  isError.value = false

  if (currentStep.value === 4) {
    emit('close')
  } else {
    emit('cancel')
  }
}

function close(): void {
  isBusy.value = false
  isConfirmed.value = false
  isError.value = false
  emit('close')
}

// Steps management
function goToPreviousStep(): void {
  transitionName.value = 'slide-right'

  if (currentStep.value > 1) {
    currentStep.value -= 1
  } else {
    cancel()
  }
}

async function goToNextStep(): Promise<void> {
  transitionName.value = 'slide-left'

  /* eslint-disable @typescript-eslint/no-magic-numbers */
  switch (currentStep.value) {
  case 0:
    if (props.planValue === EHostingPlan.free) {
      currentStep.value = 3
      await setDefaultHostPreferences()
      await updateHApps(EHostingPlan.free)
    } else {
      currentStep.value = 1
    }

    break

  case steps.value[0]?.id:
    currentStep.value = 2
    break

  case steps.value[1]?.id:
    currentStep.value = 3
    await setDefaultHostPreferences()
    await updateHApps()
    break

  case steps.value[2]?.id:
    currentStep.value = 4
    break

  default:
    console.error('Sorry, there are no more steps, you are falling into oblivion.')
  }
  /* eslint-enable @typescript-eslint/no-magic-numbers */
}

const isNextButtonDisabled = computed((): boolean => {
  if (currentStep.value === 1) {
    return (
      prices.value.cpu === null ||
      prices.value.dataTransfer === null ||
      (prices.value.cpu === 0 && prices.value.dataTransfer === 0)
    )
  }

  if (currentStep.value === 2) {
    return false
  }

  return false
})

interface HAppUpdateTaskProps {
  id: string
  value: EHostingPlan
  isUpdated: boolean
  isError: boolean
}

const hAppsToBeUpdated = ref<HAppUpdateTaskProps[]>([])

async function hAppUpdateTask(hApp): Promise<void> {
  try {
    const result = await updateHAppHostingPlan(hApp)

    if (result) {
      hAppsToBeUpdated.value = hAppsToBeUpdated.value.map((hAppToBeUpdated) => {
        if (hAppToBeUpdated.id === hApp.id) {
          hAppToBeUpdated.isUpdated = true
        }

        return hAppToBeUpdated
      })
    } else {
      hAppsToBeUpdated.value = hAppsToBeUpdated.value.map((hAppToBeUpdated) => {
        if (hAppToBeUpdated.id === hApp.id) {
          hAppToBeUpdated.isError = true
        }

        return hAppToBeUpdated
      })
    }
  } catch (error) {
    hAppsToBeUpdated.value = hAppsToBeUpdated.value.map((hAppToBeUpdated) => {
      if (hAppToBeUpdated.id === hApp.id) {
        hAppToBeUpdated.isError = true
      }

      return hAppToBeUpdated
    })
  }
}

const progress = computed(() => {
  const updatedHApps = hAppsToBeUpdated.value.filter((hApp) => hApp.isUpdated || hApp.isError)
  return (updatedHApps.length / hAppsToBeUpdated.value.length) * 100
})

async function setDefaultHostPreferences(): Promise<void> {
  try {
    preferencesStore.updatePrice('cpu', prices.value.cpu)
    preferencesStore.updatePrice('bandwidth', prices.value.dataTransfer)
    await preferencesStore.setDefaultPreferences()
  } catch (e) {
    isError.value = true
  }
}

async function updateHApps(valueForAllHApps = null): Promise<void> {
  hAppsToBeUpdated.value = mappedHApps.value.map((hApp) => {
    return {
      id: hApp.id,
      value: valueForAllHApps ?? hApp.hostingPlan,
      isUpdated: false,
      isError: false
    }
  })

  const promises = hAppsToBeUpdated.value.map(async (hApp) => hAppUpdateTask(hApp))

  await Promise.all(promises)
  await goToNextStep()

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

interface UpdateHAppPlanPayload {
  id: string
  value: EHostingPlan
}

type UpdatePricePayload = string | number | null

interface UpdatePayload {
  prop: string
  value: UpdatePricePayload | UpdateHAppPlanPayload
}

function isUpdatePricePayload(
  target: UpdatePricePayload | UpdateHAppPlanPayload
): target is UpdatePricePayload {
  return target !== null
}

function isUpdateHAppPlanPayload(
  target: UpdatePricePayload | UpdateHAppPlanPayload
): target is UpdateHAppPlanPayload {
  return target !== null
}

function setAllHAppsPlan(payload: UpdateHAppPlanPayload): void {
  mappedHApps.value = mappedHApps.value.map((hApp) => ({
    ...hApp,
    hostingPlan: payload.value
  }))
}

function setSingleHAppPlan({ id, value }: UpdateHAppPlanPayload): void {
  mappedHApps.value = mappedHApps.value.map((mappedHApp) => ({
    ...mappedHApp,
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    hostingPlan: mappedHApp.id === id ? value : mappedHApp.hostingPlan
  }))
}

function updateValue(payload: UpdatePayload): void {
  switch (payload.prop) {
  case 'cpu':
    if (isUpdatePricePayload(payload.value)) {
      prices.value.cpu = payload.value
    }

    break

  case 'dataTransfer':
    if (isUpdatePricePayload(payload.value)) {
      prices.value.dataTransfer = payload.value
    }

    break

  case 'plan':
    if (isUpdateHAppPlanPayload(payload.value)) {
      if (payload.value.id === 'all') {
        setAllHAppsPlan(payload.value)
      } else {
        setSingleHAppPlan(payload.value)
      }
    }

    break

  default:
    console.error('Unknown prop')
  }
}
</script>

<template>
  <BaseModal
    :is-clickable-outside="false"
    :is-dismissible="steps[currentStep - 1]?.isDismissible"
    :has-close-button="steps[currentStep - 1]?.hasCloseButton"
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
          {{ props.planValue === EHostingPlan.free ? t('hosting_preferences.toggle_paid_hosting_modal.free.title') : t('hosting_preferences.toggle_paid_hosting_modal.paid.title') }}
        </p>

        <p class="stop-hosting-modal__description">
          {{ props.planValue === EHostingPlan.free ? t('hosting_preferences.toggle_paid_hosting_modal.free.description') : t('hosting_preferences.toggle_paid_hosting_modal.paid.description') }}
        </p>
      </div>
    </div>

    <template
      v-if="currentStep === 4"
      #buttons
    >
      <BaseButton
        @click="close"
      >
        {{ t('$.close') }}
      </BaseButton>
    </template>

    <template
      v-else-if="currentStep !== 3"
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
