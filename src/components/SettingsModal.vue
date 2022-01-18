<template>
  <Modal :handleClose="handleClose">
    <div class='settings-modal'>
      <h3 class='title'>HoloPort Settings</h3>
      <h4 class='sub-title'>{{ deviceName }}</h4>

      <section class='settings-rows'>
        <div class='settings-row'>
          <div class='row-label'>
            HPOS Version
          </div>
          <div class='row-value'>
            {{ hposVersion }}
          </div>
        </div>

        <div class='settings-row'>
          <div class='row-label'>
            <label for='device-name'>Device Name</label>
          </div>
          <div v-if='!isEditingDeviceName' class='row-value'>
            {{ deviceName }}
            <PencilIcon v-if='!isLoading' @click="editDeviceName" class='pencil' data-testid='edit-button' />
          </div>
          <div v-if='isEditingDeviceName' class='row-value' style="position: relative; top: -2px; margin-left: -2px">
            <input v-model='editedDeviceName' class='device-input' id='device-name'>
            <FilledCheckIcon @click="saveDeviceName" class='filled-check' data-testid='save-button' />
            <CircledExIcon @click="cancelEditDeviceName" class='circled-ex' data-testid='cancel-button' />
          </div>
        </div>

        <div class='settings-row'>
          <div class='row-label'>
            Network
          </div>
          <div class='row-value'>
            {{ networkStatus }}
          </div>
        </div>

        <div class='settings-row'>
          <div class='row-label'>
            <label for='sshAccess'>Access for HoloPort support (SSH)</label>
          </div>
          <div class='row-value'>
            <input type='checkbox' id='sshAccess' v-model='sshAccess'>
          </div>
        </div>
      </section>

      <Button color='teal' @click="handleClose" class='close-button'>Close</Button>
    </div>
  </Modal>
</template>

<script>
import Modal from 'components/Modal'
import Button from 'components/Button'
import PencilIcon from 'src/components/icons/PencilIcon'
import FilledCheckIcon from 'src/components/icons/FilledCheckIcon'
import CircledExIcon from 'src/components/icons/CircledExIcon'
import HposInterface from 'src/interfaces/HposInterface'

export default {
  name: 'SettingsModal',
  components: {
    Modal,
    Button,
    PencilIcon,
    FilledCheckIcon,
    CircledExIcon
  },
  props: {
    handleClose: {
      type: Function,
      required: true
    }
  },
    data () {
    return {
      settings: {},
      isLoading: true,
      isEditingDeviceName: false,
      editedDeviceName: ''
    }
  },
  async mounted () {
    const settings = await HposInterface.settings()
    this.settings = settings
    const sshAccess = await HposInterface.getSshAccess()

    // Need to assign like this to trigger Vue reactivity
    this.settings = {
      ...this.settings,
      sshAccess
    }
    this.isLoading = false
  },
  methods: {
    editDeviceName () {
      // Disabled until we get auth working
      // this.editedDeviceName = this.settings.deviceName
      // this.isEditingDeviceName = true
    },
    saveDeviceName () {
      HposInterface.updateSettings({
        deviceName: this.editedDeviceName
      })
      this.settings.deviceName = this.editedDeviceName
      this.isEditingDeviceName = false
    },
    cancelEditDeviceName () {
      this.isEditingDeviceName = false
    },
  },
  computed: {
    hposVersion () {
      return '70791b'
    },
    deviceName () {
      return this.isLoading ? 'Loading...' : this.settings.deviceName
    },
    networkStatus () {
      return this.isLoading ? 'Loading...' : this.settings.networkStatus
    },
    sshAccess: {
      get () {
        return this.settings.sshAccess
      },
      set (newValue) {
        if (newValue) {
          HposInterface.enableSshAccess()
        } else {
          HposInterface.disableSshAccess()
        }
        this.settings.sshAccess = newValue
      }
    }
  }
}
</script>

<style scoped>
.settings-modal {
  display: flex;
  align-items: center;
  padding: 26px 98px;
  flex-direction: column;
  font-style: normal;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  text-align: center;
  color: #313C59;
}
.title {
  font-weight: 600;
  font-size: 22px;
  line-height: 30px;
  display: flex;
  align-items: center;
  text-align: center;
  color: #313C59;
  margin: 0 0 12px 0;
}
.sub-title {
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: #313C59;
  margin: 0 0 65px 0;
}
.settings-rows {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 480px;
  margin-bottom: 132px;
  font-weight: 600;
  font-size: 14px;
  color: #606C8B;
}
.settings-row {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  width: 100%;
  line-height: 30px;
}
.row-label {
  flex-basis: 280px;
  display: flex;
  align-items: center;
}
.row-value {
  display: flex;
}
.factory-reset-link {
  text-decoration-line: underline;
  color: #606C8B;
}
.question-mark {
  margin-left: 8px;
}
.pencil {
  margin-left: 5px;
  margin-top: 3px;
  /* cursor: pointer; */
  opacity: 0.2;
}
.filled-check {
  margin-left: 5px;
  cursor: pointer;
}
.circled-ex {
  margin-left: 5px;
  cursor: pointer;
}
.device-input {
  border: 0.5px solid #606C8B;
  color: #313C59;
}
.close-button {
  min-width: 110px;
  justify-content: center;
}
@media screen and (max-width: 1050px) {
  .settings-modal {
    padding: 26px 0 28px;
    margin: 0 -6px;
  }
  .title {
    margin-bottom: 6px;
  }
  .sub-title {
    margin-bottom: 26px
  }
  .settings-rows {
    min-width: 0;
    width: 100%;
    margin-bottom: 40px
  }
  .row-label {
    flex-basis: initial;
  }
  .row-value {
    margin-left: auto;
  }
}
</style>
