<template>
  <SettingsSection
    :title="$t('$.holoport')"
    class="holoport-settings"
  >
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
        class="holoport-settings__editable-value-icon"
        @click="() => {}"
      />
      <div
        v-else
        class="holoport-settings__editable-value"
      >
        <BaseInput
          v-model="editedDeviceName"
          :placeholder="$t('settings.device_name_placeholder')"
          name="edited-device-name"
          class="holoport-settings__editable-value-input"
        />

        <FilledCheckIcon
          class="holoport-settings__save-button"
          data-testid="save-button"
          @click="saveDeviceName"
        />

        <CircledExIcon
          class="holoport-settings__cancel-button"
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
          class="holoport-settings__factory-reset-link"
        >
          <LeaveSiteIcon />
          <span class="holoport-settings__factory-reset-link-label">
            {{ $t('settings.factory_reset') }}
          </span>

        </a>
      </template>
    </SettingsRow>
  </SettingsSection>
</template>

<script setup >
import BaseInput from '@uicommon/components/BaseInput'
import { ref } from 'vue'
import BaseCheckbox from '../BaseCheckbox'
import CircledExIcon from '../icons/CircledExIcon'
import FilledCheckIcon from '../icons/FilledCheckIcon'
import LeaveSiteIcon from '../icons/LeaveSiteIcon'
import PencilIcon from '../icons/PencilIcon'
import SettingsRow from './SettingsRow'
import SettingsSection from './SettingsSection'

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
  emit('update:device-name', editedDeviceName.value)
  isEditingDeviceName.value = false
}

function cancelEditDeviceName() {
  isEditingDeviceName.value = false
  editedDeviceName.value = ''
}
</script>

<style lang="scss" scoped>
.holoport-settings {
  &__editable-value {
    display: flex;
    align-items: center;
  }

  &__editable-value-input {
    margin-right: 30px;
  }

  &__editable-value-icon {
    margin-left: 5px;
    opacity: 0.5;
    cursor: not-allowed;
    //cursor: pointer;
  }

  &__factory-reset-link {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: var(--grey-color);

    &-label {
      margin-left: 8px;
      text-decoration-line: underline;
    }
  }

  &__question-mark {
    margin-left: 8px;
  }

  &__save-button {
    margin-left: 5px;
    cursor: pointer;
  }

  &__cancel-button {
    margin-left: 5px;
    cursor: pointer;
  }
}
</style>
