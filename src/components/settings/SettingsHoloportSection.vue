<template>
  <SettingsSection :title="$t('$.holoport')">
    <SettingsRow
      :label="$t('settings.hpos_version')"
      :value="settings.hposVersion"
    />

    <SettingsRow
      :label="$t('settings.device_name')"
      :value="!isEditingDeviceName ? settings.deviceName : ''"
    >
      <PencilIcon
        v-if="!isEditingDeviceName"
        class="settings__editable-value-icon"
        @click="editDeviceName"
      />
      <div
        v-else
        class="settings__editable-value"
      >
        <BaseInput
          v-model="editedDeviceName"
          :placeholder="$t('settings.device_name_placeholder')"
          name="edited-device-name"
          class="settings__editable-value-input"
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
    </SettingsRow>

    <SettingsRow
      :label="$t('$.network')"
      :value="settings.networkStatus"
    />

    <SettingsRow :label="$t('settings.ssh_access')">
      <BaseCheckbox
        id="sshAccess"
        is-disabled
        :checked="settings.sshAccess"
      />
    </SettingsRow>

    <SettingsRow>
      <template #label>
        <a
          href="https://forum.holo.host/t/usb-reset-step-by-step/4782"
          target="_blank"
          class="factory-reset-link"
        >Factory Reset</a>
        <QuestionMarkIcon class="question-mark" />
      </template>
    </SettingsRow>
  </SettingsSection>
</template>

<script setup >
import BaseInput from '@uicommon/components/BaseInput.vue'
import { ref } from 'vue'
import BaseCheckbox from '../BaseCheckbox.vue'
import CircledExIcon from '../icons/CircledExIcon.vue'
import FilledCheckIcon from '../icons/FilledCheckIcon.vue'
import PencilIcon from '../icons/PencilIcon.vue'
import QuestionMarkIcon from '../icons/QuestionMarkIcon.vue'
import SettingsRow from './SettingsRow.vue'
import SettingsSection from './SettingsSection.vue'

const props = defineProps({
  settings: {
    type: Object,
    required: true
  },

  isLoading: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:device-name'])

const isEditingDeviceName = ref(false)
const editedDeviceName = ref('')

function editDeviceName() {
  editedDeviceName.value = props.settings.deviceName
  isEditingDeviceName.value = true
}

function saveDeviceName() {
  // HposInterface.updateSettings({
  //   deviceName: this.editedDeviceName
  // })
  emit('update:device-name', editedDeviceName.value)
  isEditingDeviceName.value = false
}

function cancelEditDeviceName() {
  isEditingDeviceName.value = false
  editedDeviceName.value = ''
}
</script>

<style lang="scss" scoped>
.settings {
  &__editable-value {
    display: flex;
    align-items: center;
  }

  &__editable-value-input {
    margin-right: 30px;
  }

  &__editable-value-icon {
    margin-left: 5px;
    cursor: pointer;
  }
}

.factory-reset-link {
  text-decoration-line: underline;
  color: var(--grey-color);
}

.question-mark {
  margin-left: 8px;
}

.filled-check {
  margin-left: 5px;
  cursor: pointer;
}

.circled-ex {
  margin-left: 5px;
  cursor: pointer;
}
</style>
