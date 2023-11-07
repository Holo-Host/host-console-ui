<script lang="ts" setup>
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'
import BaseButton from '@uicommon/components/BaseButton'
import BaseModal from '@uicommon/components/BaseModal'
import { useModals } from '@uicommon/composables/useModals'
import { EButtonType } from '@uicommon/types/ui'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { EModal } from '@/constants/ui'
import { HAppDetails } from '@/interfaces/HposInterface'

const { t } = useI18n()

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const { showModal } = useModals()

const props = defineProps<{
  hApp: HAppDetails
}>()

const emit = defineEmits(['close'])

const isConfirmed = ref(false)
const isBusy = ref(false)
const isError = ref(false)

function confirm(): void {
  isBusy.value = true

  setTimeout(() => {
    if (props.hApp.hostingPlan === 'paid') {
      startFreeHosting()
    } else {
      startPaidHosting()
    }

    // If failed
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
    // showModal(EModal.error_modal)
    // emit('close')
    //
    // isBusy.value = false
    // isConfirmed.value = false

    // If success
    isBusy.value = false
    isConfirmed.value = true
  }, 2000)
}

function close(): void {
  isBusy.value = false
  isConfirmed.value = false
  isError.value = false
  emit('close')
}

function startFreeHosting(): void {
  console.log('NOT YET IMPLEMENTED: Starting free hosting happ', props.hApp.name)
}

function startPaidHosting(): void {
  console.log('NOT YET IMPLEMENTED: Starting paid hosting happ', props.hApp.name)
}
</script>

<template>
  <BaseModal
    is-visible
    @close="emit('close')"
  >
    <div
      v-if="!isConfirmed && !isError"
      class="stop-hosting-modal"
    >
      <ExclamationCircleIcon class="stop-hosting-modal__icon" />
      <p class="stop-hosting-modal__title">
        {{ props.hApp.hostingPlan === 'paid' ? t('hosting_plan.free.title') : t('hosting_plan.paid.title') }}
      </p>
    </div>

    <div
      v-if="isConfirmed"
      class="stop-hosting-modal"
    >
      <CheckCircleIcon class="stop-hosting-modal__icon" />
      <p class="stop-hosting-modal__title--success">
        {{ props.hApp.hostingPlan === 'paid' ? t('hosting_plan.free.success_title') : t('hosting_plan.paid.success_title') }}
      </p>
      <p class="stop-hosting-modal__description">
        {{ props.hApp.hostingPlan === 'paid' ? t('hosting_plan.free.success_description') : t('hosting_plan.paid.success_description') }}
      </p>
    </div>

    <template
      v-if="isConfirmed"
      #buttons
    >
      <BaseButton
        @click="close"
      >
        {{ t('$.close') }}
      </BaseButton>
    </template>

    <template
      v-else
      #buttons
    >
      <BaseButton
        :type="EButtonType.tertiary"
        :is-disabled="isBusy"
        @click="close"
      >
        {{ t('$.cancel') }}
      </BaseButton>

      <BaseButton
        class="stop-hosting-modal__confirm-button"
        :is-busy="isBusy"
        :is-disabled="isBusy"
        @click="confirm"
      >
        {{ props.hApp.hostingPlan === 'paid' ? t('hosting_plan.free.confirmation_button_label') : t('hosting_plan.paid.confirmation_button_label') }}
      </BaseButton>
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
    font-weight: 600;

		&--success {
			font-weight: 800;
		}
  }

  &__description {
    margin-top: 8px;
    font-weight: 600;
  }

  &__confirm-button {
    margin-left: 16px;
  }
}
</style>
