<template>
  <BaseModal
    :is-visible="visibleModal === EModal.go_to_springboard"
    @close="hideModal"
  >
    <div class="go-to-springboard-modal">
      <img
        src="../../assets/images/holo-logo.png"
        class="go-to-springboard-modal__springboard-logo"
        alt="springboard-logo"
      />

      <p class="go-to-springboard-modal__title">
        {{ $t('springboard.title') }}
      </p>

      <p class="go-to-springboard-modal__description">
        {{ $t('springboard.description') }}
      </p>
    </div>

    <template #buttons>
      <div class="go-to-springboard-modal__buttons">
        <BaseButton
          :type="EButtonType.custom"
          :custom-theme="{
            fontColor: 'white',
            backgroundColor: '#5C4DA6',
            spinnerColor: 'white'
          }"
          class="go-to-springboard-modal__button"
          @click="handleSpringboardLogin"
        >
          {{ $t('springboard.go_to_springboard') }}
        </BaseButton>
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import { useModals } from '@uicommon/composables/useModals'
import { EButtonType } from '@uicommon/types/ui'
import { EModal } from '@/constants/ui'
import BaseButton from '@uicommon/components/BaseButton.vue'
import BaseModal from '@uicommon/components/BaseModal.vue'
import { kSpringboardUrl } from '@/constants';

const { visibleModal, hideModal } = useModals()

const emit = defineEmits(['login'])

function handleSpringboardLogin() {
  hideModal()

  const tabName = `host-console-springboard`
  window.open(`${kSpringboardUrl}/home?kyc=true`, tabName).focus()
}
</script>

<style scoped lang="scss">
.go-to-springboard-modal {
  &__springboard-logo {
    height: 50px;
    margin: 0 auto;
  }

  &__title {
    margin-top: 6px;
    font-size: 26px;
    font-weight: 600;
    text-align: center;
  }

  &__description {
    margin-top: 40px;
    padding: 0 46px;
  }

  &__buttons {
    display: flex;
    flex-direction: column;
  }

  &__button {
    margin-top: 8px;
    margin-bottom: 12px;
  }
}
</style>
