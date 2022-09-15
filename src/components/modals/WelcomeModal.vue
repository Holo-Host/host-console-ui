<template>
  <BaseModal
    :title="modalContent.title"
    :is-dismissible="step === 2"
    :has-close-button="false"
    :is-visible="isVisible"
  >
    <div class="welcome-modal">
      <section v-if="step === 1">
        <p class="welcome-modal__first-paragraph">
          {{ $t('welcome_modal.first_paragraph') }}
        </p>
        <p class="welcome-modal__second-paragraph">
          {{ $t('welcome_modal.second_paragraph') }}
        </p>

        <BaseInput
          v-model="nickname"
          autofocus
          :placeholder="$t('welcome_modal.input_placeholder')"
          name="nickname"
          class="welcome-modal__display-name-input"
        />

        <p class="welcome-modal__error">
          {{ isError ? $t('welcome_modal.error'): '&nbsp;' }}
        </p>
      </section>

      <section v-else>
        <span class="welcome-modal__explanation">
          {{ $t('$.identicon_explanation') }}
        </span>

        <p
          v-if="nickname"
          class="welcome-modal__display-name"
        >
          {{ nickname }}
        </p>

        <span class="welcome-modal__identicon">
          <Identicon
            v-if="agentAddress"
            size="80"
            :agent-key="agentAddress"
            role="img"
            aria-label="Agent Identity Icon"
          />
        </span>

        <p class="welcome-modal__hash-id">
          {{ encodeAgentId(agentAddress) }}
        </p>

        <p class="welcome-modal__tip">
          <b>{{ $t('$.tip') }}</b> {{ $t('$.identicon_click') }}
        </p>
      </section>
    </div>

    <template #buttons>
      <BaseButton
        :is-disabled="!nickname"
        :is-busy="isLoading"
        :class="[step === 1 ?'welcome-modal__save-button' :'welcome-modal__close-button']"
        @click="handleSubmit"
      >
        {{ modalContent.buttonLabel }}
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import BaseButton from '@uicommon/components/BaseButton.vue'
import BaseInput from '@uicommon/components/BaseInput.vue'
import BaseModal from '@uicommon/components/BaseModal.vue'
import Identicon from '@uicommon/components/Identicon.vue'
import { encodeAgentId } from '@uicommon/utils/agent'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '../../store/user'

const { t } = useI18n()

defineProps({
  isVisible: {
    type: Boolean,
    required: true
  }
})

const userStore = useUserStore()

const emit = defineEmits(['close'])

const nickname = ref('')

const step = ref(1)
const isLoading = ref(false)
const isError = ref(false)

const agentAddress = computed(() => userStore.holoFuel.agentAddress || null)

const modalContent = computed(() => {
  return step.value === 1
    ? {
        title: t('welcome_modal.step_one_title'),
        buttonLabel: t('welcome_modal.step_one_button_label')
      }
    : {
        title: t('welcome_modal.step_two_title'),
        buttonLabel: t('welcome_modal.step_two_button_label')
      }
})

async function handleSubmit() {
  if (step.value === 1) {
    if (isError.value) {
      isError.value = false
    }

    isLoading.value = true

    const isSuccess = await userStore.updateHoloFuelProfile({ nickname: nickname.value })

    isLoading.value = false

    if (isSuccess) {
      step.value = 2
    } else {
      isError.value = true
    }
  } else {
    emit('close')
  }
}
</script>

<style scoped lang="scss">
.welcome-modal {
  &__first-paragraph {
    margin: 12px 26px;
  }

  &__second-paragraph {
    margin-top: 36px;
  }

  &__error {
    color: var(--red-color);
    margin-bottom: 0;
  }

  &__display-name,
  &__hash-id {
    font-weight: 700;
  }

  &__display-name {
    margin-top: 36px;
  }

  &__hash-id {
    margin-top: 8px;
  }

  &__tip {
    margin-top: 32px;
    padding: 0 40px;
  }

  &__display-name-input {
    margin-top: 50px;
    padding: 0 32px 0 12px;
  }

  &__close-button {
    margin-top: 24px;
  }

  &__hash-id {
    font-weight: 700;
  }

  &__display-name {
    margin-top: 36px;
  }

  &__hash-id {
    margin-top: 8px;
  }

  &__tip {
    margin-top: 32px;
    padding: 0 40px;
  }
}

@media screen and (max-width: 900px) {
  .first-paragraph {
    margin: 0;
  }
}
</style>
