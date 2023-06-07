<script setup lang="ts">
import BaseButton from '@uicommon/components/BaseButton.vue'
import CircleSpinner from '@uicommon/components/CircleSpinner.vue'
import GoToHoloFuelModal from '@uicommon/components/GoToHoloFuelModal.vue'
import { useModals } from '@uicommon/composables/useModals.js'
import { useOverlay } from '@uicommon/composables/useOverlay.js'
import { EButtonType } from '@uicommon/types/ui.js'
import { computed, nextTick, onMounted, ref } from 'vue'
import MobileTopNav from '@/components/MobileTopNav.vue'
import GoToSpringboardModal from '@/components/modals/GoToSpringboardModal.vue'
import RedemptionInitiatedModal from '@/components/modals/RedemptionInitiatedModal.vue'
import WelcomeModal from '@/components/modals/WelcomeModal.vue'
import TheSidebar from '@/components/sidebar/TheSidebar.vue'
import TopNav from '@/components/TopNav.vue'
import { kAuthTokenLSKey, kDontShowGoToHoloFuelModalAgainLSKey, kHoloFuelUrl } from '@/constants'
import { EModal } from '@/constants/ui'
import router, { kRoutes } from '@/router'
import { useUserStore } from '@/store/user'
import type { BreadCrumb } from '@/types/types'

const userStore = useUserStore()
// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const { showLoadingOverlay, hideOverlay } = useOverlay()
// eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-assignment
const { showModal } = useModals()

const props = withDefaults(
  defineProps<{
    title: string
    breadcrumbs?: BreadCrumb[]
    isContentLoading?: boolean
    isContentError?: boolean
  }>(),
  {
    breadcrumbs: undefined,
    isContentLoading: false,
    isContentError: false
  }
)

const emit = defineEmits(['try-again-clicked'])

const isLoading = ref(false)

const nickname = computed((): string => userStore.holoFuel?.nickname)
const agentAddress = computed((): Uint8Array | null => userStore.holoFuel?.agentAddress ?? null)

const breadcrumbsOrTitle = computed(() => {
  if (props.breadcrumbs?.length) {
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
  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  await nextTick(async (): Promise<void> => {
    if (!userStore.publicKey) {
      isLoading.value = true

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      showLoadingOverlay()

      try {
        await userStore.getUser()
      } catch (e) {
        localStorage.removeItem(kAuthTokenLSKey)
        await router.push({ name: kRoutes.login.name })
      }

      // eslint-disable-next-line @typescript-eslint/no-unsafe-call
      hideOverlay()
      isLoading.value = false
    }

    await nextTick(() => {
      if (!userStore.holoFuel.nickname) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        showModal(EModal.welcome)
      }
    })
  })
})
</script>

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

      <GoToSpringboardModal />

      <RedemptionInitiatedModal />

      <section class="content">
        <slot />

        <div
          v-if="props.isContentLoading || props.isContentError"
          class="content__overlay"
        >
          <CircleSpinner
            v-if="props.isContentLoading"
            class="content__overlay-spinner"
          />

          <div
            v-else-if="props.isContentError"
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
