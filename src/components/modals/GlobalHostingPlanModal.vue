<script lang="ts" setup>
import { ExclamationCircleIcon, CheckCircleIcon } from '@heroicons/vue/24/outline'
import BaseButton from '@uicommon/components/BaseButton'
import BaseModal from '@uicommon/components/BaseModal'
import { useModals } from '@uicommon/composables/useModals'
import { EButtonType } from '@uicommon/types/ui'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { EModal } from '@/constants/ui'
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

function cancel(): void {
  isBusy.value = false
  isConfirmed.value = false
  isError.value = false
  emit('cancel')
}

function confirm(): void {
  isBusy.value = true
  emit('update:hosting-plan', props.planValue)
  // const result = null
  //
  // if (!result) {
  // If failed
  // cancel()

  // setTimeout(() => {
  //   showModal(EModal.error_modal)
  // }, 300)
  // } else {
  // If success
  // isBusy.value = false
  // isConfirmed.value = true
  //
  // isBusy.value = true
  // }
}
</script>

<template>
  <BaseModal
    is-visible
    @close="cancel"
  >
    <div
      v-if="!isError"
      class="stop-hosting-modal"
    >
      <ExclamationCircleIcon class="stop-hosting-modal__icon" />
      <p class="stop-hosting-modal__title">
        {{ props.planValue === 'free' ? t('hosting_preferences.toggle_paid_hosting_modal.free.title') : t('hosting_preferences.toggle_paid_hosting_modal.paid.title') }}
      </p>

      <p class="stop-hosting-modal__description">
        {{ props.planValue === 'free' ? t('hosting_preferences.toggle_paid_hosting_modal.free.description') : t('hosting_preferences.toggle_paid_hosting_modal.paid.description') }}
      </p>
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
        {{ props.planValue === 'free' ? t('hosting_preferences.toggle_paid_hosting_modal.free.confirmation_button_label') : t('hosting_preferences.toggle_paid_hosting_modal.paid.confirmation_button_label') }}
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
    font-weight: 700;

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
