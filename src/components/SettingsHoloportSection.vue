<template>
  <div class="settings">
    <h3 class="heading">
      {{ settings.deviceName }}
    </h3>

    <div class="settings-row">
      <div class="row-label">
        HPOS Version
      </div>
      <div class="row-value">
        {{ settings.hposVersion }}
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
        {{ settings.deviceName }}
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
        >
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
        {{ settings.networkStatus }}
      </div>
    </div>

    <div class="settings-row">
      <div class="row-label">
        <label for="sshAccess">Access for HoloPort support (SSH)</label>
      </div>
      <div class="row-value">
        <input
          id="sshAccess"
          v-model="settings.sshAccess"
          type="checkbox"
        >
      </div>
    </div>

    <div class="settings-row">
      <div class="row-label">
        <a
          href="https://holo.host/holoport-reset"
          target="_blank"
          class="factory-reset-link"
        >Factory Reset</a>
        <QuestionMarkIcon class="question-mark" />
      </div>
    </div>
  </div>
</template>

<script setup >
import CircledExIcon from 'src/components/icons/CircledExIcon'
import FilledCheckIcon from 'src/components/icons/FilledCheckIcon'
import PencilIcon from 'src/components/icons/PencilIcon'
import QuestionMarkIcon from 'src/components/icons/QuestionMarkIcon'
import { ref } from 'vue'

defineProps({
  settings: {
    type: Object,
    required: true
  },

  isLoading: {
    type: Boolean,
    default: false
  }
})

const isEditingDeviceName = ref(false)
const editedDeviceName = ref('')

function editDeviceName() {
  // temporarily disabled until hpos bug is fixed
  // this.editedDeviceName = this.settings.deviceName
  // this.isEditingDeviceName = true
}

function saveDeviceName() {
  // HposInterface.updateSettings({
  //   deviceName: this.editedDeviceName
  // })
  // this.settings.deviceName = this.editedDeviceName
  // this.isEditingDeviceName = false
}

function cancelEditDeviceName() {
  // this.isEditingDeviceName = false
}
</script>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0 4px 20px #eceef1;
  border-radius: 5px;
  margin: 40px 10px 20px 12px;
  padding: 30px;
  color: var(--grey-color);
  font-size: 14px;
  line-height: 19px;
  font-weight: 600;
  min-width: 300px;
}
.heading {
  color: var(--grey-dark-color);
}
.settings-row {
  display: flex;
  align-items: center;
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
  color: var(--grey-color);
}
.question-mark {
  margin-left: 8px;
}
.pencil {
  margin-left: 5px;
  cursor: pointer;
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
  border: 0.5px solid var(--grey-color);
  color: var(--grey-dark-color);
}
</style>
