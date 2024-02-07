<script lang="ts" setup>
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'
import BaseButton from '@uicommon/components/BaseButton'
import BaseModal from '@uicommon/components/BaseModal'
import { useModals } from '@uicommon/composables/useModals'
import { EButtonType } from '@uicommon/types/ui'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { EModal } from '@/constants/ui'
import { HAppDetails, useHposInterface } from '@/interfaces/HposInterface'

const { t } = useI18n()

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const { showModal } = useModals()
const { updateHAppHostingPlan } = useHposInterface()

const props = defineProps<{
  hApp: HAppDetails
  planValue: 'free' | 'paid'
}>()

const emit = defineEmits(['close', 'update:hosting-plan'])

const isConfirmed = ref(false)
const isBusy = ref(false)
const isError = ref(false)

function close(): void {
  if (!isConfirmed.value) {
    emit('update:hosting-plan', props.planValue === 'free' ? 'paid' : 'free')
  }

  isBusy.value = false
  isConfirmed.value = false
  isError.value = false
  emit('close')
}

function cancel(): void {
  isBusy.value = false
  isConfirmed.value = false
  isError.value = false
  emit('update:hosting-plan', props.planValue === 'free' ? 'paid' : 'free')
  emit('close')
}

async function confirm(): Promise<void> {
  isBusy.value = true
  let result = null

  if (props.planValue === 'paid') {
    result = await updateHAppHostingPlan({
      id: props.hApp.id,
      value: 'paid'
    })

    if (result) {
      emit('update:hosting-plan', 'paid')
    }
  } else {
    result = await updateHAppHostingPlan({ id: props.hApp.id, value: 'free' })

    if (result) {
      emit('update:hosting-plan', 'free')
    }
  }

  if (!result) {
    // If failed
    cancel()

    setTimeout(() => {
      showModal(EModal.error_modal)
    }, 300)
  } else {
    // If success
    isBusy.value = false
    isConfirmed.value = true

    isBusy.value = true
  }
}
</script>

<template>
  <BaseModal
    is-visible
    @close="close"
  >
    <div
      v-if="!isConfirmed && !isError"
      class="stop-hosting-modal"
    >
      <ExclamationCircleIcon class="stop-hosting-modal__icon" />
      <p class="stop-hosting-modal__title">
        {{ props.planValue === 'free' ? t('hosting_plan.free.title') : t('hosting_plan.paid.title') }}
      </p>
    </div>

    <div
      v-if="isConfirmed"
      class="stop-hosting-modal"
    >
      <CheckCircleIcon class="stop-hosting-modal__icon" />
      <p class="stop-hosting-modal__title--success">
        {{ props.planValue === 'free' ? t('hosting_plan.free.success_title') : t('hosting_plan.paid.success_title') }}
      </p>
      <p class="stop-hosting-modal__description">
        {{ props.planValue === 'free' ? t('hosting_plan.free.success_description') : t('hosting_plan.paid.success_description') }}
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
        @click="cancel"
      >
        {{ t('$.cancel') }}
      </BaseButton>

      <BaseButton
        class="stop-hosting-modal__confirm-button"
        :is-busy="isBusy"
        :is-disabled="isBusy"
        @click="confirm"
      >
        {{ props.planValue === 'free' ? t('hosting_plan.free.confirmation_button_label') : t('hosting_plan.paid.confirmation_button_label') }}
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
