<script setup>
import { ExclamationTriangleIcon } from '@heroicons/vue/20/solid'
import { useModals } from '@uicommon/composables/useModals'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import BaseModal from '@uicommon/components/BaseModal.vue'
import { EModal } from '@/constants/ui'

const { t } = useI18n()

const title = ref('')
const description = ref('')
const { visibleModal, hideModal } = useModals()

function close() {
  hideModal()
}
</script>

<template>
  <BaseModal
    :is-visible="visibleModal === EModal.error_modal"
    @close="close"
  >
		<div class="error-modal">
      <p class="error-modal__title">
        <ExclamationTriangleIcon class="error-modal__icon" />
        <span class="mt-4">{{ t('$.errors.unexpected') }}</span>
      </p>
      <div class="error-modal__description">
        <p>We are sorry but something went wrong on our side.</p>
        <p>
          Please try again, and if the problem persists, contact our support at
          <a href="mailto:help@holo.host?subject=Springboard support&body=">help@holo.host</a>.
        </p>
      </div>
    </div>
  </BaseModal>
</template>

<style scoped lang="scss">
.error-modal {
	&__title {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top: 6px;
		font-size: 26px;
		font-weight: 600;
		text-align: center;
	}

	&__icon {
		width: 50px;
		height: 50px;
		margin-right: 8px;
		color: #F87171;
	}

	&__description {
		margin-top: 40px;
		padding: 0 46px;
	}
}
</style>
