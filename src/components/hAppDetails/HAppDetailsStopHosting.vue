<script setup lang="ts">
import BaseButton from '@uicommon/components/BaseButton.vue'
import { EButtonType } from '@uicommon/types/ui'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseTooltip from '@/components/BaseTooltip.vue'
import AlertCircleIcon from '@/components/icons/AlertCircleIcon.vue'
import StopHostingModal from '@/components/StopHostingModal.vue'
import type { HAppDetails } from '@/interfaces/HposInterface'

const { t } = useI18n()

const props = defineProps<{
  hApp: HAppDetails
}>()

const isHostingModalVisible = ref(false)
const isDisableHostingTooltipVisible = ref(false)

function openHostingModal(): void {
  isHostingModalVisible.value = true
}

function closeHostingModal(): void {
  isHostingModalVisible.value = false
}
</script>

<template>
  <div>
    <div class="happ-details__row">
      <BaseButton
        :type="EButtonType.tertiary"
        :title="t('happ_details.disable_hosting')"
        @click="openHostingModal"
      />
      <div class="happ-details__warning">
        <AlertCircleIcon
          class="alert-circle-icon"
          @mouseover="() => isDisableHostingTooltipVisible = true"
          @mouseleave="() => isDisableHostingTooltipVisible = false"
        />

        <BaseTooltip
          class="happ-details__warning-tooltip"
          :is-visible="isDisableHostingTooltipVisible"
        >
          {{ $t('happ_details.disable_hosting_warning') }}
        </BaseTooltip>
      </div>
    </div>

    <StopHostingModal
      v-if="props.hApp"
      :h-app="props.hApp"
      :is-visible="isHostingModalVisible"
      :h-app-name="hApp?.name || ''"
      @close="closeHostingModal"
    />
  </div>
</template>

<style scoped lang="scss">
.happ-details {
  &__row {
    display: flex;
    align-items: center;
  }

  &__warning {
    display: flex;
    position: relative;
    align-items: flex-start;
    border-radius: 4px;
    color: var(--grey-dark-color);
    font-size: 12px;
    font-weight: 400;
    padding: 4px 12px;

    &-tooltip {
      position: absolute;
      top: 30px;
      right: 8px;
      width: 204px;
    }
  }
}

@media screen and (max-width: 1050px) {
  .happ-details-usage {
    &__stop-hosting-row {
      align-items: flex-start;
    }
  }
}
</style>
