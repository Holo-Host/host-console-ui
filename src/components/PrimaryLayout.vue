<template>
  <section class='layout'>
    <Sidebar />
    <section class='main-column'>
      <MobileBanner :deviceName="deviceName" :showMobileSidebar="showMobileSidebar" :mobileSidebarVisible="mobileSidebarVisible" :openSettingsModal="openSettingsModal" />
      <TopNav :breadcrumbs="breadcrumbsOrTitle" :deviceName="deviceName" :openSettingsModal="openSettingsModal" />
      <SettingsModal :is-visible="settingsModalVisible" @close="closeSettingsModal" />
      <div v-if="kycBannerVisible" class='kyc-banner'>
        You haven't finished verifying your identity yet. Go to our <a href='https://holo.host/kyc' target="_blank">third party provider's site</a> to complete your verification.
      </div>
      <section class='content'>
        <slot />
      </section>
    </section>
  </section>
</template>

<script>

import Sidebar from 'components/Sidebar.vue'
import TopNav from 'components/TopNav.vue'
import MobileBanner from 'components/MobileBanner.vue'
import SettingsModal from 'components/SettingsModal.vue'
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
    title: String,
    breadcrumbs: Array
  },
  data () {
    return {
      deviceName: 'Loading...',
      mobileSidebarVisible: false,
      settingsModalVisible: false,
      kycBannerVisible: false
    }
  },
  async mounted () {
    const { deviceName } = await HposInterface.settings()
    if (deviceName) {
      this.deviceName = deviceName
    }
  },
  methods: {
    showMobileSidebar (shouldShow = false) {
      this.mobileSidebarVisible = shouldShow
    },
    openSettingsModal () {
      this.settingsModalVisible = true
    },
    closeSettingsModal () {
      this.settingsModalVisible = false
    }
  },
  computed: {
    breadcrumbsOrTitle() {
      if (!!this.breadcrumbs) {
        return this.breadcrumbs
      } else {
        return [{
          label: this.title
        }]
      }
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
  background-color: #FFE871;
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
.content{
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
