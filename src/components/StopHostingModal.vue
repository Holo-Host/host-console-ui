<template>
  <Modal :handleClose="handleClose">
    <div class='stop-hosting-modal' v-if="!confirmed">
      <ExclamationIcon class="exclamation-icon" />
      <p class='content'>Are you sure you want to stop hosting this hApp?</p>
      <p class='content'>It will be removed from your HoloPort and will not be available for you to host again for 30 days. All invoices, logs and payments associated with this hApp will remain available to you.</p>
      <div class='buttons'>
        <Button color='white' @click="handleClose">Cancel</Button>
        <Button color='teal' @click="confirm">Yes, I want to stop hosting this hApp</Button>
      </div>
    </div>
    <div class='stop-hosting-modal' v-if="confirmed">
      <BigCheckIcon class="exclamation-icon" />
      <p class='content'>This hApp has been removed from hosting.</p>
      <p class='content'>Please note it may take some time for the hApp to be fully removed from your HoloPort. Any hosting provided for storage during that time will be billed to the publisher.</p>
      <div class='buttons'>
        <Button color='teal' @click="closeAndGoToHapps">Close</Button>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from 'components/Modal'
import Button from 'components/Button'
import ExclamationIcon from 'components/icons/ExclamationIcon'
import BigCheckIcon from 'components/icons/BigCheckIcon'

export default {
  name: 'StopHostingModal',
  components: {
    Modal,
    Button,
    ExclamationIcon,
    BigCheckIcon
  },
  props: {
    handleClose: {
      type: Function,
      required: true
    },
    stopHostingHapp: {
      type: Function,
      required: true
    },
  },
  data: function () {
    return {
      confirmed: false
    }
  },
  methods: {
    confirm () {
      this.stopHostingHapp()
      this.confirmed = true
    },
    closeAndGoToHapps () {
      this.handleClose()
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
    color: #313C59;
  }
  .exclamation-icon {
    margin-bottom: 22px;
  }
  .content {
    max-width: 625px;
    margin: 0 0 20px 0;
  }
  .buttons {
    display: flex;
    margin-top: 20px;
    margin-bottom: 26px;
  }
</style>
