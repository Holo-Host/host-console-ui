<template>
  <div class="top-nav-menu">
    <div class="owner">
      <Identicon
        v-if="props.agentAddress"
        size="42"
        :agent-key="props.agentAddress"
        role="img"
        aria-label="Agent Identity Icon"
      />
      <div class="display-name" @click="toggleMenu">
        {{ nickname }}
        <span class="verification-status">
          Unverified
        </span>
      </div>
      <DownTriangleIcon class="down-triangle" :white="white" />
    </div>

    <div v-if="isMenuOpen" class="menu">
      <div class="menu-item" @click="openSettingsAndCloseMenu">
        {{ $t('settings.header') }}
      </div>

      <div class="menu-item" @click="logout">
        {{ $t('$.logout') }}
      </div>
    </div>
  </div>
</template>

<script setup>
import Identicon from '@uicommon/components/Identicon.vue'
import DownTriangleIcon from 'components/icons/DownTriangleIcon.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { kAuthTokenLSKey } from '@/constants'
import { kRoutes } from '@/router'

const router = useRouter()

const props = defineProps({
  nickname: {
    type: String,
    required: true
  },

  agentAddress: {
    type: Uint8Array,
    default: []
  },

  white: {
    type: Boolean,
    default: false
  }
})

const isMenuOpen = ref(false)

function toggleMenu() {
  isMenuOpen.value = !isMenuOpen.value
}

function logout() {
  localStorage.removeItem(kAuthTokenLSKey)
  router.push({ name: kRoutes.login.name })
}

function openSettingsAndCloseMenu() {
  isMenuOpen.value = false
  router.push({ name: kRoutes.accountSettings.name })
}
</script>

<style scoped>
.top-nav-menu {
  display: block;
  position: relative;
  margin-left: auto;
  margin-right: -3px;
  color: var(--grey-dark-color);
}

.mobile-banner .top-nav-menu {
  display: none;
}

.owner {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  min-width: 150px;
  cursor: pointer;
  text-align: end;
  padding-right: 20px;
}

.display-name {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  text-align: right;
  margin-left: 12px;
}

.verification-status {
  font-style: italic;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
}

.down-triangle {
  margin-left: 12px;
}

.menu {
  position: absolute;
  z-index: 50;
  right: 12px;
  top: 20px;
  background: var(--white-color);
  border-radius: 2px;
  font-size: 14px;
  line-height: 19px;
  color: var(--grey-color);
  margin-top: 1px;
  padding: 5px 0;
  cursor: pointer;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.25);
}

.mobile-banner .menu {
  right: -2px;
  top: 20px;
  z-index: 10;
}

.menu::before {
  position: absolute;
  right: 7px;
  top: -5px;
  content: '';
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 6px 6px 6px;
  border-color: transparent transparent white transparent;
}

.menu-item {
  padding: 0 16px;
  margin: 7px 0;
}

.menu-item:hover {
  background-color: rgba(176, 236, 240, 0.72);
}

@media screen and (max-width: 1050px) {
  .top-nav-menu {
    display: none;
  }

  .mobile-banner .top-nav-menu {
    display: block;
    top: 11px;
    color: white;
  }

  .owner {
    padding-right: 6px;
  }
}
</style>
