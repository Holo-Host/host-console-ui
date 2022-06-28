<template>
  <section class="layout">
    <Sidebar />

    <section class="main-column">
      <MobileBanner
        :display-name="displayName"
        :public-key="publicKey"
      />

      <TopNav
        :breadcrumbs="breadcrumbsOrTitle"
        :display-name="displayName"
        :public-key="publicKey"
      />

      <SettingsModal
        :is-visible="isSettingsModalVisible"
        @close="isSettingsModalVisible = false"
      />

      <WelcomeModal
        :is-visible="isWelcomeModalVisible"
        @close="isWelcomeModalVisible = false"
      />

      <div
        v-if="isKycBannerVisible"
        class="kyc-banner"
      >
        You haven't finished verifying your identity yet. Go to our
        <a
          href="https://holo.host/kyc"
          target="_blank"
        >third party provider's site</a> to complete
        your verification.
      </div>

      <section class="content">
        <slot />
      </section>
    </section>
  </section>
</template>

<script setup>
import MobileBanner from 'components/MobileBanner.vue'
import SettingsModal from 'components/SettingsModal.vue'
import Sidebar from 'components/Sidebar.vue'
import TopNav from 'components/TopNav.vue'
import WelcomeModal from 'components/WelcomeModal.vue'
import { useUserStore } from 'src/store/user'
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue'
import { addObserver, ENotification, removeObserver } from '../utils/notifications'

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

const isSettingsModalVisible = ref(false)
const isKycBannerVisible = ref(false)
const isWelcomeModalVisible = ref(false)

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

onMounted(async () => {
  addObserver(ENotification.showSettingsModal, handleShowSettingsModal)

  await userStore.getUser()

  await nextTick(() => {
    isWelcomeModalVisible.value = !userStore.displayName
  })
})

onUnmounted(() => {
  removeObserver(ENotification.showSettingsModal, handleShowSettingsModal)
})

function handleShowSettingsModal() {
  isSettingsModalVisible.value = true
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
  padding: 0 20px;
}
.kyc-banner {
  margin: -30px -20px 28px -20px;
  background-color: #ffe871;
  text-align: center;
  font-weight: 600;
  font-size: 12px;
  line-height: 28px;
  color: #000000;
}
.kyc-banner a {
  text-decoration: underline;
  cursor: pointer;
  color: #000000;
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
  .kyc-banner {
    margin-top: 0;
    padding: 10px 30px;
    line-height: 20px;
  }
}
</style>
