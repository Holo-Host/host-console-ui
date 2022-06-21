<template>
  <section class="layout">
    <Sidebar />

    <section class="main-column">
      <MobileBanner
        :device-name="deviceName"
        :show-mobile-sidebar="showMobileSidebar"
        :mobile-sidebar-visible="mobileSidebarVisible"
        :open-settings-modal="openSettingsModal"
      />

      <TopNav
        :breadcrumbs="breadcrumbsOrTitle"
        :device-name="deviceName"
        :open-settings-modal="openSettingsModal"
      />

      <SettingsModal
        :is-visible="settingsModalVisible"
        @close="closeSettingsModal"
      />

      <div
        v-if="kycBannerVisible"
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

<script>
import MobileBanner from 'components/MobileBanner.vue'
import SettingsModal from 'components/SettingsModal.vue'
import Sidebar from 'components/Sidebar.vue'
import TopNav from 'components/TopNav.vue'
import HposInterface from 'src/interfaces/HposInterface'

export default {
  name: 'PrimaryLayout',

  components: {
    Sidebar,
    TopNav,
    MobileBanner,
    SettingsModal
  },

  props: {
    title: {
      type: String,
      required: true
    },

    breadcrumbs: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      deviceName: 'Loading...',
      mobileSidebarVisible: false,
      settingsModalVisible: false,
      kycBannerVisible: false
    }
  },

  computed: {
    breadcrumbsOrTitle() {
      if (this.breadcrumbs.length) {
        return this.breadcrumbs
      } else {
        return [
          {
            label: this.title
          }
        ]
      }
    }
  },

  async mounted() {
    const { deviceName } = await HposInterface.settings()

    if (deviceName) {
      this.deviceName = deviceName
    }
  },

  methods: {
    showMobileSidebar(shouldShow = false) {
      this.mobileSidebarVisible = shouldShow
    },

    openSettingsModal() {
      this.settingsModalVisible = true
    },

    closeSettingsModal() {
      this.settingsModalVisible = false
    }
  }
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
