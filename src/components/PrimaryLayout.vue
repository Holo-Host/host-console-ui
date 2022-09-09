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

      <GoToHolofuelModal
        :is-visible="isGoToHolofuelModalVisible"
        @close="hideGoToHolofuelModal"
      />

      <section class="content">
        <slot />
      </section>
    </section>
  </section>
</template>

<script setup>
import { addObserver, removeObserver } from '@uicommon/utils/notifications'
import MobileTopNav from 'components/MobileTopNav.vue'
import GoToHolofuelModal from 'components/modals/GoToHolofuelModal.vue'
import WelcomeModal from 'components/modals/WelcomeModal.vue'
import TheSidebar from 'components/TheSidebar.vue'
import TopNav from 'components/TopNav.vue'
import { useUserStore } from 'src/store/user'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { ENotification, postNotification } from '../../ui-common-library/src/utils/notifications'
import { EProjectNotification } from '../utils/notifications'

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
