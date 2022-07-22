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
          v-model="displayName"
          autofocus
          :placeholder="$t('welcome_modal.input_placeholder')"
          name="displayName"
          class="welcome-modal__display-name-input"
        />
      </section>

      <section v-else>
        <span class="welcome-modal__explanation">
          {{ $t('$.identicon_explanation') }}
        </span>

        <p
          v-if="displayName"
          class="welcome-modal__display-name"
        >
          {{ displayName }}
        </p>

        <span class="welcome-modal__identicon">
          <IdentIcon
            v-if="publicKey"
            size="80"
            :hash="publicKey"
            role="img"
            aria-label="Agent Identity Icon"
          />
        </span>

        <p class="welcome-modal__hash-id">
          {{ publicKey }}
        </p>

        <p class="welcome-modal__tip">
          <b>{{ $t('$.tip') }}</b> {{ $t('$.identicon_click') }}
        </p>
      </section>
    </div>

    <template #buttons>
      <BaseButton
        :is-disabled="!displayName"
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
import IdentIcon from '@uicommon/components/IdentIcon2.vue'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '../store/user'

const { t } = useI18n()

defineProps({
  isVisible: {
    type: Boolean,
    required: true
  }
})

const userStore = useUserStore()

const emit = defineEmits(['close'])

const displayName = ref('')

const step = ref(1)
const isLoading = ref(false)

const publicKey = computed(() => userStore.publicKey || null)

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

function handleSubmit() {
  if (step.value === 1) {
    isLoading.value = true

    // API call to save the display name
    setTimeout(() => {
      isLoading.value = false
      userStore.updateDisplayName(displayName.value)
      step.value = 2
      // eslint-disable-next-line no-magic-numbers
    }, 2000)
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

  &__save-button {
    margin-top: 40px;
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
