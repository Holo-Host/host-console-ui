<template>
  <BaseModal @close="$emit('close')">
    <div v-if="!confirmed" class="stop-hosting-modal">
      <ExclamationIcon class="exclamation-icon" />
      <p class="content">
        Are you sure you want to stop hosting {{ happName }}?
      </p>
      <p class="content">
        It will be removed from your HoloPort and will not be available for you to host again for 30 days. All invoices, logs and payments associated with this hApp will remain available to you.
      </p>
    </div>
    <div v-if="confirmed" class="stop-hosting-modal">
      <BigCheckIcon class="exclamation-icon" />
      <p class="content">
        This hApp has been removed from hosting.
      </p>
      <p class="content">
        Please note it may take some time for the hApp to be fully removed from your HoloPort. Any hosting provided for storage during that time will be billed to the publisher.
      </p>
    </div>

    <template
      v-if="confirmed"
      #buttons
    >
      <BaseButton @click="closeAndGoToHapps">
        Close
      </BaseButton>
    </template>
    <template
      v-else
      #buttons
    >
      <BaseButton @click="confirm">
        Yes, I want to stop hosting this hApp
      </BaseButton>

      <BaseButton @click="$emit('close')">
        Cancel
      </BaseButton>
    </template>
  </BaseModal>
</template>

<script>
import BaseButton from 'components/BaseButton'
import BaseModal from 'components/BaseModal'
import BigCheckIcon from 'components/icons/BigCheckIcon'
import ExclamationIcon from 'components/icons/ExclamationIcon'

export default {
  name: 'StopHostingModal',

  components: {
    BaseModal,
    BaseButton,
    ExclamationIcon,
    BigCheckIcon
  },

  props: {
    happName: {
      type: String,
      required: true
    }
  },

  emits: ['close', 'stop-hosting-happ'],

  data() {
    return {
      confirmed: false
    }
  },

  methods: {
    confirm() {
      this.$emit('stop-hosting-happ')
      this.confirmed = true
    },

    closeAndGoToHapps() {
      this.$emit('close')
      this.$router.push('/happs')
    }
  }
}
</script>

<style scoped>
.stop-hosting-modal {
  display: flex;
  align-items: center;
  padding-top: 26px;
  flex-direction: column;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #313c59;
}
.exclamation-icon {
  margin-bottom: 22px;
}
.content {
  max-width: 625px;
  margin: 0 0 20px 0;
}
</style>
