<template>
  <section class="layout">
    <TheSidebar />

    <section class="main-column">
      <MobileTopNav
        :display-name="displayName"
        :public-key="publicKey"
      />

      <TopNav
        :breadcrumbs="breadcrumbsOrTitle"
        :display-name="displayName"
        :public-key="publicKey"
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

const isWelcomeModalVisible = ref(false)
const isGoToHolofuelModalVisible = ref(false)

const displayName = computed(() => userStore.displayName)
const publicKey = computed(() => userStore.publicKey)

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

  if (!userStore?.publicKey) {
    await userStore.getUser()
  }

  await nextTick(() => {
    isWelcomeModalVisible.value = !userStore.displayName
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
