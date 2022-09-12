<template>
  <section class="layout">
    <TheSidebar />

    <section v-if="!isLoading" class="main-column">
      <MobileTopNav
        :nickname="nickname"
        :agent-address="agentAddress"
      />

      <TopNav
        :breadcrumbs="breadcrumbsOrTitle"
        :nickname="nickname"
        :agent-address="agentAddress"
      />

      <WelcomeModal
        :is-visible="isWelcomeModalVisible"
        @close="closeWelcomeModal"
      />

      <GoToHoloFuelModal
        :is-visible="isGoToHolofuelModalVisible"
        :app-name="$t('$.app_name')"
        :dont-show-modal-again-local-storage-key="kDontShowGoToHoloFuelModalAgainLSKey"
        :holo-fuel-url="kHoloFuelUrl"
        @close="hideGoToHolofuelModal"
      />

      <section class="content">
        <slot />
      </section>
    </section>
  </section>
</template>

<script setup>
import GoToHoloFuelModal from '@uicommon/components/GoToHoloFuelModal'
import {
  addObserver,
  removeObserver,
  ENotification,
  postNotification,
  EProjectNotification
} from '@uicommon/utils/notifications'
import MobileTopNav from 'components/MobileTopNav'
import WelcomeModal from 'components/modals/WelcomeModal'
import TheSidebar from 'components/TheSidebar'
import TopNav from 'components/TopNav'
import { kDontShowGoToHoloFuelModalAgainLSKey, kHoloFuelUrl } from 'src/constants'
import { useUserStore } from 'src/store/user'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'

const userStore = useUserStore()

const props = defineProps({
  title: {
    type: String,
    required: true
  },

  breadcrumbs: {
    type: Array,
    default: () => []
  }
})

const isLoading = ref(false)

const isWelcomeModalVisible = ref(false)
const isGoToHolofuelModalVisible = ref(false)

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

function closeWelcomeModal() {
  isWelcomeModalVisible.value = false
}

onMounted(async () => {
  addObserver(EProjectNotification.showGoToHolofuelModal, showGoToHolofuelModal)
  addObserver(EProjectNotification.hideGoToHolofuelModal, hideGoToHolofuelModal)

  await nextTick(async () => {
    if (!userStore.publicKey) {
      isLoading.value = true

      postNotification(ENotification.showBusyState)
      await userStore.getUser()

      postNotification(ENotification.hideBusyState)
      isLoading.value = false
    }

    isWelcomeModalVisible.value = !userStore.holoFuel.nickname
  })
})

onUnmounted(() => {
  removeObserver(EProjectNotification.showGoToHolofuelModal, showGoToHolofuelModal)
  removeObserver(EProjectNotification.hideGoToHolofuelModal, hideGoToHolofuelModal)
})

function showGoToHolofuelModal() {
  isGoToHolofuelModalVisible.value = true
}

function hideGoToHolofuelModal() {
  isGoToHolofuelModalVisible.value = false
}
</script>

<style scoped>
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
  display: flex;
  flex-direction: column;
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
