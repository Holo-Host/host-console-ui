<template>
  <section class='layout'>
    <Sidebar />
    <section class='main-column'>
      <MobileBanner :deviceName="deviceName" :showMobileSidebar="showMobileSidebar" :mobileSidebarVisible="mobileSidebarVisible" :openSettingsModal="openSettingsModal" />
      <TopNav :breadcrumbs="breadcrumbsOrTitle" :deviceName="deviceName" :openSettingsModal="openSettingsModal" />
      <SettingsModal v-if="settingsModalVisible" :handleClose="closeSettingsModal"  />
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
      settingsModalVisible: true
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
}
.main-column {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 20px;
}
.content{
  display: flex;
  flex-direction: column;
}

@media screen and (max-width: 1050px) {
  .main-column {
    padding: 0 16px;
  }
}
</style>
