<template>
  <PrimaryLayout title="HoloPort Settings">
    <div class='settings'>
      <h3 class='heading'>{{ deviceName }}</h3>
      
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

      <div class='settings-row'>
        <div class='row-label'>
          <a href='https://holo.host/holoport-reset' target='_blank' class='factory-reset-link'>Factory Reset</a>
          <QuestionMarkIcon class='question-mark' />
        </div>
      </div>

    </div>
  </PrimaryLayout>
</template>

<script>

import PrimaryLayout from 'components/PrimaryLayout.vue'
import QuestionMarkIcon from 'src/components/icons/QuestionMarkIcon'
import PencilIcon from 'src/components/icons/PencilIcon'
import FilledCheckIcon from 'src/components/icons/FilledCheckIcon'
import CircledExIcon from 'src/components/icons/CircledExIcon'
import HposInterface from 'src/interfaces/HposInterface'

export default {
  name: 'Settings',
  components: {
    PrimaryLayout,
    QuestionMarkIcon,
    PencilIcon,
    FilledCheckIcon,
    CircledExIcon
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
      this.editedDeviceName = this.settings.deviceName
      this.isEditingDeviceName = true
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
.settings {
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0px 4px 20px #ECEEF1;
  border-radius: 5px;
  margin: 40px 18px 20px 0;
  padding: 30px;
  color: #606C8B;
  font-size: 14px;
  line-height: 19px;
  font-weight: 600;
}
.heading {
  color: #313C59;
}
.settings-row {
  display: flex;
  margin-bottom: 12px;
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
  cursor: pointer;
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
</style>
