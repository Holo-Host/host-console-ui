<template>
  <BaseModal
    title="HoloPort Settings"
    :sub-title="deviceName"
    @close="$emit('close')"
  >
    <div class="settings-modal">
      <section class="settings-rows">
        <div class="settings-row">
          <div class="row-label">
            HPOS Version
          </div>

          <div class="row-value">
            {{ hposVersion }}
          </div>
        </div>

        <div class="settings-row">
          <div class="row-label">
            <label for="device-name">Device Name</label>
          </div>

          <div
            v-if="!isEditingDeviceName"
            class="row-value"
          >
            {{ deviceName }}
            <PencilIcon
              v-if="!isLoading"
              class="pencil"
              data-testid="edit-button"
              @click="editDeviceName"
            />
          </div>

          <div
            v-if="isEditingDeviceName"
            class="row-value"
            style="position: relative; top: -2px; margin-left: -2px"
          >
            <input
              id="device-name"
              v-model="editedDeviceName"
              class="device-input"
            />

            <FilledCheckIcon
              class="filled-check"
              data-testid="save-button"
              @click="saveDeviceName"
            />

            <CircledExIcon
              class="circled-ex"
              data-testid="cancel-button"
              @click="cancelEditDeviceName"
            />
          </div>
        </div>

        <div class="settings-row">
          <div class="row-label">
            Network
          </div>

          <div class="row-value">
            {{ networkStatus }}
          </div>
        </div>

        <div class="settings-row">
          <div class="row-label">
            <label for="sshAccess">Access for HoloPort support (SSH)</label>
          </div>

          <div class="row-value">
            <input
              id="sshAccess"
              type="checkbox"
              :checked="true"
              disabled
            />
          </div>
        </div>
      </section>
    </div>

    <template #buttons>
      <Button
        color="teal"
        class="close-button"
        @click="$emit('close')"
      >
        Close
      </Button>
    </template>
  </BaseModal>
</template>

<script>
import Button from 'src/components/BaseButton'
import BaseModal from 'src/components/BaseModal'
import CircledExIcon from 'src/components/icons/CircledExIcon'
import FilledCheckIcon from 'src/components/icons/FilledCheckIcon'
import PencilIcon from 'src/components/icons/PencilIcon'
import HposInterface from 'src/interfaces/HposInterface'

export default {
  name: 'SettingsModal',

  components: {
    BaseModal,
    Button,
    PencilIcon,
    FilledCheckIcon,
    CircledExIcon
  },

  emits: ['close'],

  data() {
    return {
      settings: {},
      isLoading: true,
      isEditingDeviceName: false,
      editedDeviceName: ''
    }
  },

  computed: {
    hposVersion() {
      return '70791b'
    },

    deviceName() {
      return this.isLoading ? 'Loading...' : this.settings.deviceName
    },

    networkStatus() {
      return this.isLoading ? 'Loading...' : this.settings.networkStatus
    },

    sshAccess: {
      // The checkbox is currently disabled in the html, so this code won't run. Pending a fix to a holo-nixpkgs bug
      get() {
        return this.settings.sshAccess
      },
      set(newValue) {
        if (newValue) {
          HposInterface.enableSshAccess()
        } else {
          HposInterface.disableSshAccess()
        }

        this.settings.sshAccess = newValue
      }
    }
  },

  async mounted() {
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
    editDeviceName() {
      // BUG: hpos-admin-api does not properly save config due to permissions issue. [1]
      //      Disable editing device name until bug is fixed
      //
      // [1]: https://github.com/Holo-Host/holo-nixpkgs/issues/1068
      //
      // correct code:
      //
      // this.editedDeviceName = this.settings.deviceName
      // this.isEditingDeviceName = true
    },

    saveDeviceName() {
      HposInterface.updateSettings({
        deviceName: this.editedDeviceName
      })
      this.settings.deviceName = this.editedDeviceName
      this.isEditingDeviceName = false
    },

    cancelEditDeviceName() {
      this.isEditingDeviceName = false
    }
  }
}
</script>

<style scoped>
.settings-modal {
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.settings-rows {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  min-width: 480px;
  margin-bottom: 60px;
  font-weight: 600;
  font-size: 14px;
  color: #606c8b;
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
#sshAccess {
  cursor: not-allowed;
}
.pencil {
  margin-left: 5px;
  margin-top: 3px;

  /* Disable editing device name until bug is fixed
  cursor: pointer; */
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
  border: 0.5px solid #606c8b;
  color: #313c59;
}
.close-button {
  min-width: 110px;
  justify-content: center;
}
@media screen and (max-width: 1050px) {
  .settings-rows {
    min-width: 0;
    width: 100%;
    margin-bottom: 40px;
  }
  .row-label {
    flex-basis: initial;
  }
  .row-value {
    margin-left: auto;
  }
}
</style>
