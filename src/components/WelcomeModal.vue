<template>
  <BaseModal
    title="Welcome to Host Console"
    :is-dismissible="false"
    :is-visible="isVisible"
  >
    <div class="welcome-modal">
      <section>
        <p class="first-paragraph">
          When you registered and configured your HoloPort, that included coupling it with an associated HoloFuel account.
        </p>
        <p class="second-paragraph">
          Give these associated accounts an Account Display Name. This will show up on invoices and transactions between you and other HoloFuel users. You will NOT be able to change the name once saved.
        </p>

        <input
          id="sshAccess"
          type="text"
        />
      </section>
    </div>

    <template #buttons>
      <BaseButton
        @click="$emit('close')"
      >
        Save
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script setup>
import BaseButton from 'src/components/BaseButton'
import BaseModal from 'src/components/BaseModal'
// import { ref } from 'vue'

defineProps({
  isVisible: {
    type: Boolean,
    required: true
  }
})

defineEmits(['close'])

// const displayName = ref('')
</script>

<style scoped lang="scss">
.welcome-modal {
  margin: 20px 70px;
}

.first-paragraph {
  margin: 0 26px;
}

.second-paragraph {
  margin-top: 32px;
}

@media screen and (max-width: 900px) {
  .welcome-modal {
    margin: 20px;
  }

  .first-paragraph {
    margin: 0;
  }
}

@media screen and (max-width: 568px) {
  .welcome-modal {
    margin: 0 0 20px 0;
  }
}
</style>
