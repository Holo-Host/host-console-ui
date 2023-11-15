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
import { isError as isErrorPredicate } from '@/types/predicates'

const { t } = useI18n()
const { stopHostingHApp, startHostingHApp } = useHposInterface()

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const { showModal } = useModals()

const props = defineProps<{
  hApp: HAppDetails
}>()

const emit = defineEmits(['close', 'update:hosting'])

const isConfirmed = ref(false)
const isBusy = ref(false)
const isError = ref(false)

async function confirm(): Promise<void> {
  isBusy.value = true
  let result = null

  if (props.hApp.enabled) {
    result = await stopHostingHApp(props.hApp.id)
  } else {
    result = await startHostingHApp(props.hApp.id)
  }

  // If failed
  if (isErrorPredicate(result)) {
    emit('close')

    isBusy.value = false
    isConfirmed.value = false

    setTimeout(() => {
      showModal(EModal.error_modal)
    }, 300)

    return
  }

  // If success
  isBusy.value = false
  isConfirmed.value = true
}

function close(): void {
  isBusy.value = false
  isConfirmed.value = false
  isError.value = false
  emit('close')
  emit('update:hosting', !props.hApp.enabled)
}
</script>

<template>
  <BaseModal
    is-visible
    :content-padding=" props.hApp.enabled ? 'sm': 'md'"
    @close="emit('close')"
  >
    <div
      v-if="!isConfirmed && !isError"
      class="stop-hosting-modal"
    >
      <ExclamationCircleIcon class="stop-hosting-modal__icon" />
      <p class="stop-hosting-modal__title">
        {{ props.hApp.enabled ? t('happ_details.disable_hosting_modal.title') : t('happ_details.enable_hosting_modal.title') }}
      </p>
      <span class="stop-hosting-modal__description">
        {{ props.hApp.enabled ? t('happ_details.disable_hosting_modal.description_one') : t('happ_details.enable_hosting_modal.description_one') }}
      </span>
      <span v-if="props.hApp.enabled">{{ t('happ_details.disable_hosting_modal.description_two') }}</span>
    </div>

    <div
      v-if="isConfirmed"
      class="stop-hosting-modal"
    >
      <CheckCircleIcon class="stop-hosting-modal__icon" />
      <p class="stop-hosting-modal__title">
        {{ props.hApp.enabled ? t('happ_details.disable_hosting_modal.success.title') : t('happ_details.enable_hosting_modal.success.title') }}
      </p>
      <p
        v-if="props.hApp.enabled"
        class="stop-hosting-modal__description"
      >
        {{ t('happ_details.disable_hosting_modal.success.description') }}
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
        {{ props.hApp.enabled ? t('happ_details.disable_hosting_modal.confirmation_button') : t('happ_details.enable_hosting_modal.confirmation_button') }}
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
