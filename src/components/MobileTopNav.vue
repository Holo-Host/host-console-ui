<template>
  <section class="mobile-banner">
    <MenuIcon @click="isMobileSidebarVisible = !isMobileSidebarVisible" />

    <TopNavMenu
      :display-name="displayName"
      :white="true"
      :public-key="publicKey"
    />

    <TheSidebar v-if="isMobileSidebarVisible" />

    <div
      v-if="isMobileSidebarVisible"
      class="sidebar-backdrop"
      @click="isMobileSidebarVisible = false"
    />
  </section>
</template>

<script setup>
import MenuIcon from 'components/icons/MenuIcon.vue'
import TheSidebar from 'components/TheSidebar.vue'
import TopNavMenu from 'components/TopNavMenu.vue'
import { ref } from 'vue'

defineProps({
  displayName: {
    type: String,
    required: true
  },

  publicKey: {
    type: String,
    default: null
  }
})

const isMobileSidebarVisible = ref(false)
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
