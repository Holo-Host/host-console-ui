<script setup lang="ts">
import BaseModal from '@uicommon/components/BaseModal.vue'
import CircleSpinner from '@uicommon/components/CircleSpinner.vue'
import { useModals } from '@uicommon/composables/useModals'
import { ESpinnerSize } from '@uicommon/types/ui'
import type { Ref } from 'vue'
import { EModal } from '@/constants/ui'

// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const { visibleModal, hideModal, modalProps } = useModals()

interface Props {
  description: string
}

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
const props = modalProps as Ref<Props>
</script>

<template>
  <BaseModal
    :is-dismissible="false"
    :is-visible="visibleModal === EModal.loading_modal"
    @close="hideModal"
  >
    <div class="loading-modal">
      <p class="loading-modal__title">
        <CircleSpinner
          class="loading-modal__icon"
          :scale="ESpinnerSize.medium"
        />
      </p>
      <div class="loading-modal__description">
        <p>{{ props.description }}</p>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped lang="scss">
.loading-modal {
  display: flex;
  flex-direction: column;
  align-items: center;

  &__icon {
    width: 50px;
    height: 50px;
    margin-left: 12px;
  }

  &__description {
    margin-top: 40px;
    padding: 0 46px;
  }
}
</style>
