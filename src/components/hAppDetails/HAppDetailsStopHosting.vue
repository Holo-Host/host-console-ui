<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import AlertCircleIcon from '@/components/icons/AlertCircleIcon.vue'
import StopHostingModal from '@/components/StopHostingModal.vue'
import type { HAppDetails } from '@/interfaces/HposInterface'

const { t } = useI18n()

const props = defineProps<{
  hApp: HAppDetails
}>()

const isHostingModalVisible = ref(false)

function openHostingModal(): void {
  isHostingModalVisible.value = true
}

function closeHostingModal(): void {
  isHostingModalVisible.value = false
}

function stopHostingHApp(): void {
  console.log('NOT YET IMPLEMENTED: Stopping hosting happ', props.hApp.name)
}
</script>

<template>
  <div>
    <div class="happ-details__row">
      <div
        class="happ-details__label"
        @click="openHostingModal"
      >
        {{ t('happ_details.stop_hosting') }}
      </div>
      <div class="happ-details__warning">
        <AlertCircleIcon class="alert-circle-icon" />
        {{ t('happ_details.stop_hosting_warning') }}
      </div>
    </div>

    <StopHostingModal
      v-if="hApp"
      :is-visible="isHostingModalVisible"
      :h-app-name="hApp?.name || ''"
      @close="closeHostingModal"
      @stop-hosting-happ="stopHostingHApp"
    />
  </div>
</template>

<style scoped lang="scss">
.happ-details {
  &__row {
    display: flex;
    align-items: center;
  }

  &__label {
    font-weight: 800;
    font-size: 12px;
    line-height: 16px;
    text-decoration-line: underline;
    color: var(--grey-dark-color);
    margin-right: 10px;
    cursor: pointer;
    flex-shrink: 0;
  }

  &__warning {
    display: flex;
    align-items: flex-start;
    background: #f3f5f8;
    border-radius: 4px;
    color: var(--grey-dark-color);
    font-size: 12px;
    font-weight: 400;
    padding: 4px 12px;
  }
}

.alert-circle-icon {
  flex-shrink: 0;
  margin-right: 12px;
}

@media screen and (max-width: 1050px) {
  .happ-details-usage {
    &__stop-hosting-row {
      align-items: flex-start;
    }
  }
}
</style>
