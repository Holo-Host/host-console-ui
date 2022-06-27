<template>
  <BaseModal
    :title="modalContent.title"
    :is-dismissible="false"
    :is-visible="isVisible"
  >
    <div class="welcome-modal">
      <section v-if="step === 1">
        <p class="welcome-modal__first-paragraph">
          When you registered and configured your HoloPort, that included coupling it with an associated HoloFuel account.
        </p>
        <p class="welcome-modal__second-paragraph">
          Give these associated accounts an Account Display Name. This will show up on invoices and transactions between you and other HoloFuel users. You will NOT be able to change the name once saved.
        </p>

        <BaseInput
          v-model="displayName"
          autofocus
          placeholder="Enter Account Display Name"
          name="displayName"
          class="welcome-modal__display-name-input"
        />
      </section>

      <section v-else>
        <p class="welcome-modal__address-paragraph">
          This Identicon design and hash ID are both unique representations of this Host Console and associated HoloFuel address. Consider this address like a bank account, or crypto wallet. When you see this identicon, you know it’s your account.
        </p>

        <p class="welcome-modal__display-name">
          {{ displayName }}
        </p>

        <span class="welcome-modal__identicon">
          Identicon
        </span>

        <p class="welcome-modal__hash-id">
          {{ hashId }}
        </p>

        <p class="welcome-modal__tip">
          <b>TIP:</b> Clicking on an identicon will copy the associated address for easy transacting in HoloFuel.
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
import { computed, ref } from 'vue'
import BaseButton from './BaseButton'
import BaseInput from './BaseInput'
import BaseModal from './BaseModal'

defineProps({
  isVisible: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close'])

const displayName = ref('')
const hashId = ref('')
const identicon = ref('')

const step = ref(1)
const isLoading = ref(false)

const modalContent = computed(() => {
  return step.value === 1
    ? {
        title: 'Welcome to Host Console',
        buttonLabel: 'Save'
      }
    : {
        title: 'Your Address & Identity',
        buttonLabel: 'I understand'
      }
})

function handleSubmit() {
  if (step.value === 1) {
    isLoading.value = true

    // API call to save the display name, get the identicon and hashId
    setTimeout(() => {
      hashId.value = 'hCAkgyiI9vKwl9CW9UZio5aQdEg9SFqLTH6YorCqIAC9tOYTcPkI'
      identicon.value = 'IdentIcon'

      isLoading.value = false
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
    margin-top: 36px;
    font-weight: 700;
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
}

@media screen and (max-width: 900px) {
  .first-paragraph {
    margin: 0;
  }
}
</style>
