<template>
  <section class="layout">
    <TheSidebar />

    <section
      v-if="!isLoading"
      class="main-column"
    >
      <MobileTopNav
        :nickname="nickname"
        :agent-address="agentAddress"
      />

      <TopNav
        :breadcrumbs="breadcrumbsOrTitle"
        :nickname="nickname"
        :agent-address="agentAddress"
      />

      <WelcomeModal />

      <GoToHoloFuelModal
        :app-name="$t('$.app_name')"
        :dont-show-modal-again-local-storage-key="kDontShowGoToHoloFuelModalAgainLSKey"
        :holo-fuel-url="kHoloFuelUrl"
      />

      <section class="content">
        <slot />

        <div
          v-if="isContentLoading || isContentError"
          class="content__overlay"
        >
          <CircleSpinner
            v-if="isContentLoading"
            class="content__overlay-spinner"
          />

          <div
            v-else-if="isContentError"
            class="content__overlay-error-message"
          >
            <p>{{ $t('$.generic_error') }}</p>
            <BaseButton
              :type="EButtonType.gray"
              :title="$t('$.try_again')"
              @click="emit('try-again-clicked')"
            />
          </div>
        </div>
      </section>
    </section>
  </section>
</template>

<script setup>
import BaseButton from '@uicommon/components/BaseButton'
import CircleSpinner from '@uicommon/components/CircleSpinner'
import GoToHoloFuelModal from '@uicommon/components/GoToHoloFuelModal'
import { useModals } from '@uicommon/composables/useModals'
import { useOverlay } from '@uicommon/composables/useOverlay'
import { EButtonType } from '@uicommon/types/ui'
import MobileTopNav from 'components/MobileTopNav'
import WelcomeModal from 'components/modals/WelcomeModal'
import TheSidebar from 'components/sidebar/TheSidebar'
import TopNav from 'components/TopNav'
import { kDontShowGoToHoloFuelModalAgainLSKey, kHoloFuelUrl } from 'src/constants'
import { useUserStore } from 'src/store/user'
import { computed, nextTick, onMounted, ref } from 'vue'
import { EModal } from '@/constants/ui'

const userStore = useUserStore()
const { showLoadingOverlay, hideOverlay } = useOverlay()
const { showModal } = useModals()

const props = defineProps({
  title: {
    type: String,
    required: true
  },

  breadcrumbs: {
    type: Array,
    default: () => []
  },

  isContentLoading: {
    type: Boolean,
    default: false
  },

  isContentError: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['try-again-clicked'])

const isLoading = ref(false)

const nickname = computed(() => userStore.holoFuel?.nickname)
const agentAddress = computed(() => userStore.holoFuel?.agentAddress || null)

const breadcrumbsOrTitle = computed(() => {
  if (props.breadcrumbs.length) {
    return props.breadcrumbs
  } else {
    return [
      {
        label: props.title
      }
    ]
  }
})

onMounted(async () => {
  // Get user data when the app is hard reloaded and user was logged in before.
  // In that case we still have a valid token but all store is cleared, that is why
  // we need to fetch user data again.
  await nextTick(async () => {
    if (!userStore.publicKey) {
      isLoading.value = true

      showLoadingOverlay()
      await userStore.getUser()

      hideOverlay()
      isLoading.value = false
    }

    if (!userStore.holoFuel.nickname) {
      showModal(EModal.welcome)
    }
  })
})
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  height: 100%;
  /* Making room for the sidebar */
  padding-left: 270px;
}

.main-column {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 30px;
}

.content {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  &__overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    z-index: 10;

    &-spinner {
      position: absolute;
    }

    &-error-message {
      padding: 5px 20px;
      text-align: center;
      color: var(--grey-color);
    }
  }
}

@media screen and (max-width: 1050px) {
  .main-column {
    padding: 0 16px;
  }
  .layout {
    padding-left: 0;
  }
}
</style>
