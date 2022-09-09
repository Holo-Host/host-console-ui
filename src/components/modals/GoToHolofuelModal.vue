<template>
  <BaseModal
    :is-visible="isVisible"
    @close="emit('close')"
  >
    <div class="go-to-holofuel-modal">
      <img
        src="/images/holofuel-logo.svg"
        class="holofuel-logo"
        alt="holofuel-logo"
      />

      <p class="go-to-holofuel-modal__description">
        {{ $t('holofuel_modal.description') }}
      </p>
    </div>

    <template #buttons>
      <div class="go-to-holofuel-modal__buttons">
        <BaseButton
          :type="EButtonType.custom"
          :custom-theme="{
            fontColor: 'white',
            backgroundColor: '#21BE98',
            spinnerColor: 'white'
          }"
          class="go-to-holofuel-modal__button"
          @click="handleHolofuelLogin"
        >
          {{ $t('$.go_to_holofuel') }}
        </BaseButton>

        <BaseCheckbox
          id="go-to-holofuel-modal-checkbox"
          :checked="false"
          :label="$t('$.dont_show_this_message_again')"
          label-size="small"
          custom-color="#21BE98"
          class="go-to-holofuel-modal__checkbox"
          @update:checked="setDontShowGoToHoloFuelModalAgain"
        />
      </div>
    </template>
  </BaseModal>
</template>

<script setup>
import BaseButton from '@uicommon/components/BaseButton.vue'
import BaseModal from '@uicommon/components/BaseModal.vue'
import { EButtonType } from '@uicommon/types/ui'
import { postNotification } from '@uicommon/utils/notifications'
import { ref } from 'vue'
import { EProjectNotification } from '../../utils/notifications'
import BaseCheckbox from '../BaseCheckbox.vue'

defineProps({
  isVisible: {
    type: Boolean,
    required: true
  }
})

const dontShowGoToHoloFuelModalAgain = ref(
  localStorage.getItem('host-console-ui-dont-show-go-to-holofuel-modal-again')
)

const emit = defineEmits(['close'])

function handleHolofuelLogin() {
  postNotification(EProjectNotification.hideGoToHolofuelModal)

  if (dontShowGoToHoloFuelModalAgain.value) {
    localStorage.setItem('host-console-ui-dont-show-go-to-holofuel-modal-again', 'true')
  }

  location.replace(`https://${location.host}/holofuel`)
}

function setDontShowGoToHoloFuelModalAgain(value) {
  dontShowGoToHoloFuelModalAgain.value = value
}
</script>

<style scoped lang="scss">
.go-to-holofuel-modal {
  &__description {
    margin-top: 24px;
    padding: 0 46px;
  }

  &__buttons {
    display: flex;
    flex-direction: column;
  }

  &__button {
    margin-top: 18px;
  }

  &__checkbox {
    margin-top: 32px;
  }
}
</style>
