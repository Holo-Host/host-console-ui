<template>
  <Modal :handleClose="handleClose">
    <div class='stop-hosting-modal'>
      <ExclamationIcon class="exclamation-icon" />
      <p class='content'>Are you sure you want to stop hosting this hApp?</p>
      <p class='content'>It will be removed from your HoloPort and will not be available for you to host again for 30 days. All invoices, logs and payments associated with this hApp will remain available to you.</p>
      <div class='buttons'>
        <Button color='white' @click="handleClose">Cancel</Button>
        <Button color='teal'>Yes, I want to stop hosting this hApp</Button>
      </div>
    </div>
  </Modal>
</template>

<script>
import Modal from 'components/Modal'
import Button from 'components/Button'
import ExclamationIcon from 'components/icons/ExclamationIcon'

export default {
  name: 'StopHostingModal',
  components: {
    Modal,
    Button,
    ExclamationIcon
  },
  props: {
    handleClose: {
      type: Function,
      required: true
    }
  },
  data: function () {
    return {
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
