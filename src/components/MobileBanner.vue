<template>
  <section class="mobile-banner">
    <MenuIcon @click="showMobileSidebar(true)" />

    <TopNavMenu
      :device-name="deviceName"
      :white="true"
      :open-settings-modal="openSettingsModal"
    />

    <Sidebar v-if="mobileSidebarVisible" />

    <div
      v-if="mobileSidebarVisible"
      class="sidebar-backdrop"
      @click="showMobileSidebar(false)"
    />
  </section>
</template>

<script>
import MenuIcon from 'components/icons/MenuIcon.vue'
import Sidebar from 'components/Sidebar.vue'
import TopNavMenu from 'components/TopNavMenu.vue'

export default {
  name: 'MobileBanner',

  components: {
    MenuIcon,
    TopNavMenu,
    Sidebar
  },

  props: {
    deviceName: {
      type: String,
      required: true
    },

    showMobileSidebar: {
      type: Function,
      required: true
    },

    mobileSidebarVisible: {
      type: Boolean,
      default: false
    },

    openSettingsModal: {
      type: Function,
      required: true
    }
  }
}
</script>

<style scoped>
.mobile-banner {
  display: none;
  flex: 0 0 88px;
  align-items: flex-end;
  background-color: #00cad9;
  padding: 20px;
  margin: 0 -18px;
}

.sidebar-backdrop {
  display: none;
  background-color: rgba(49, 60, 89, 0.67);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
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
