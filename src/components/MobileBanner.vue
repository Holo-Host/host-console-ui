<template>
  <section class="mobile-banner">
    <MenuIcon @click="showMobileSidebar(true)" />
    <TopNavMenu :deviceName="deviceName" :white="true" :openSettingsModal="openSettingsModal" />
    <Sidebar v-if="mobileSidebarVisible" />
    <div v-if="mobileSidebarVisible" class='sidebar-backdrop' @click="showMobileSidebar(false)" />
  </section>
</template>

<script>
import TopNavMenu from 'components/TopNavMenu.vue'
import Sidebar from 'components/Sidebar.vue'
import MenuIcon from 'components/icons/MenuIcon.vue'

export default {
  name: 'MobileBanner',
  components: {
    MenuIcon,
    TopNavMenu,
    Sidebar
  },
  props: {
    deviceName: String,
    showMobileSidebar: Function,
    mobileSidebarVisible: Boolean,
    openSettingsModal: Function
  }
}
</script>

<style scoped>
.mobile-banner {
  display: none;
  flex: 0 0 88px;
  align-items: flex-end;
  background-color: #00CAD9;
  padding: 20px;
  margin: 0 -20px;
}

.sidebar-backdrop {
  display: none;
  background-color: rgba(49, 60, 89, 0.67);
  position: fixed;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  z-index: 50;
}

@media screen and (max-width: 1050px) {
  .mobile-banner {
    display: flex;
  }

  .sidebar-backdrop {
    display: flex;
  }
}
</style>
