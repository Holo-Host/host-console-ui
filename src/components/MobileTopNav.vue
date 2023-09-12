<script setup lang="ts">
import { ref } from 'vue'
import MenuIcon from '@/components/icons/MenuIcon.vue'
import TheSidebar from '@/components/sidebar/TheSidebar.vue'
import TopNav from '@/components/TopNav.vue'
import TopNavMenu from '@/components/TopNavMenu.vue'
import { EUserKycLevel } from '@/types/types'

const props = withDefaults(
  defineProps<{
    kycLevel: EUserKycLevel
    nickname: string
    agentAddress?: typeof Uint8Array | null
  }>(),
  {
    agentAddress: null
  }
)

const isMobileSidebarVisible = ref(false)
</script>

<template>
  <section class="mobile-banner">
    <MenuIcon @click="isMobileSidebarVisible = !isMobileSidebarVisible" />

    <TopNavMenu
      :kyc-level="props.kycLevel"
      :nickname="props.nickname"
      :white="true"
      :agent-address="props.agentAddress"
    />

    <TheSidebar v-if="isMobileSidebarVisible" />

    <div
      v-if="isMobileSidebarVisible"
      class="sidebar-backdrop"
      @click="isMobileSidebarVisible = false"
    />
  </section>
</template>

<style scoped>
.mobile-banner {
  display: none;
  flex: 0 0 88px;
  align-items: flex-end;
  background-color: var(--primary-color);
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
