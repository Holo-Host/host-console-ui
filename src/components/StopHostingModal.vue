<script lang="ts" setup>
import BaseButton from '@uicommon/components/BaseButton'
import BaseModal from '@uicommon/components/BaseModal'
import { EButtonType } from '@uicommon/types/ui'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BigCheckIcon from '@/components/icons/BigCheckIcon'
import ExclamationIcon from '@/components/icons/ExclamationIcon'
import { HAppDetails } from '@/interfaces/HposInterface'

const { t } = useI18n()

const props = defineProps<{
  hApp: HAppDetails
}>()

const emit = defineEmits(['close'])

const isConfirmed = ref(false)

function confirm(): void {
  stopHostingHApp()
  isConfirmed.value = true
}

function close(): void {
  emit('close')
}

function stopHostingHApp(): void {
  console.log('NOT YET IMPLEMENTED: Stopping hosting happ', props.hApp.name)
}
</script>

<template>
  <BaseModal
    is-visible
    content-padding="sm"
    @close="emit('close')"
  >
    <div
      v-if="!isConfirmed"
      class="stop-hosting-modal"
    >
      <ExclamationIcon />
      <p class="stop-hosting-modal__title">
        {{ t('happ_details.disable_hosting_modal.title') }}
      </p>
      <span class="stop-hosting-modal__description">
        {{ t('happ_details.disable_hosting_modal.description_one') }}
      </span>
      <span>{{ t('happ_details.disable_hosting_modal.description_two') }}</span>
    </div>

    <div
      v-if="isConfirmed"
      class="stop-hosting-modal"
    >
      <BigCheckIcon />
      <p class="stop-hosting-modal__title">
        {{ t('happ_details.disable_hosting_modal.success.title') }}
      </p>
      <p class="stop-hosting-modal__description">
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
        @click="close"
      >
        {{ t('$.cancel') }}
      </BaseButton>

      <BaseButton
        class="stop-hosting-modal__confirm-button"
        @click="confirm"
      >
        {{ t('happ_details.disable_hosting_modal.confirmation_button') }}
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
