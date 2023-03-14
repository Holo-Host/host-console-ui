<template>
  <SettingsSection
    :title="$t('$.holoport')"
    class="holoport-settings"
  >
    <SettingsRow
      :label="$t('settings.hpos_version')"
      :value="props.settings.hposVersion"
    />

    <SettingsRow
      :label="$t('settings.device_name')"
      :value="!isEditingDeviceName ? props.settings.deviceName : ''"
    >
      <PencilIcon
        v-if="!isEditingDeviceName"
        class="holoport-settings__editable-value-icon"
        @click="editDeviceName"
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
      :value="props.settings.networkFlavour"
    />

    <SettingsRow :label="$t('settings.ssh_access')">
      <BaseCheckbox
        id="sshAccess"
        is-disabled
        :checked="props.settings.sshAccess"
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

<script setup lang="ts">
import BaseCheckbox from '@uicommon/components/BaseCheckbox.vue'
import BaseInput from '@uicommon/components/BaseInput.vue'
import { ref } from 'vue'
import CircledExIcon from '../icons/CircledExIcon.vue'
import FilledCheckIcon from '../icons/FilledCheckIcon.vue'
import LeaveSiteIcon from '../icons/LeaveSiteIcon.vue'
import PencilIcon from '../icons/PencilIcon.vue'
import SettingsRow from './SettingsRow.vue'
import SettingsSection from './SettingsSection.vue'

const props = withDefaults(
  defineProps<{
    settings: Record<string, unknown>
    isLoading?: boolean
  }>(),
  {
    isLoading: false
  }
)

const emit = defineEmits(['update:device-name'])

const isEditingDeviceName = ref(false)
const editedDeviceName = ref('')

function editDeviceName(): void {
  editedDeviceName.value = props.settings.deviceName
  isEditingDeviceName.value = true
}

function saveDeviceName(): void {
  emit('update:device-name', editedDeviceName.value)
  isEditingDeviceName.value = false
}

function cancelEditDeviceName(): void {
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
    cursor: pointer;
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
