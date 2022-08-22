<template>
  <div class="top-nav-menu">
    <div class="owner" @click="toggleMenu">{{ deviceName }} <DownTriangleIcon class='down-triangle' :white="white" /></div>
    <div class="verification-status">Unverified</div>
    <div v-if="menuOpen" class="menu">
      <div @click="openSettingsAndCloseMenu" class="menu-item">
        HoloPort Settings
      </div>
      <div @click="logout" class="menu-item">Logout</div>
    </div>
  </div>
</template>

<script>
import DownTriangleIcon from 'components/icons/DownTriangleIcon.vue'

export default {
  name: 'TopNav',
  components: {
    DownTriangleIcon
  },
  props: {
    deviceName: String,
    white: Boolean,
    openSettingsModal: Function
  },
  data () {
    return {
      menuOpen: false
    }
  },
  methods: {
    toggleMenu () {
      this.menuOpen = !this.menuOpen
    },
    logout () {
      localStorage.removeItem('authToken')
      // TODO: is this enough to forward to login page?
      this.$router.push('/login')
    },
    openSettingsAndCloseMenu () {
      this.menuOpen = false
      this.openSettingsModal()
    }
  }
}
</script>

<style scoped>
.top-nav-menu {
  display: block;
  position: relative;
  margin-left: auto;
  margin-right: -3px;
  color: #313C59;
}
.mobile-banner .top-nav-menu {
  display: none;
}
.owner {
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  min-width: 150px;
  cursor: pointer;
  text-align: end;
  padding-right: 20px;
}
.verification-status {
  font-style: italic;
  font-weight: 600;
  font-size: 12px;
  line-height: 16px;
  text-align: right;
  margin-right: 38px;
}
.down-triangle {
  margin-left: 3px;
}
.menu {
  position: absolute;
  z-index: 50;
  right: 12px;
  top: 20px;
  background: #FFFFFF;
  border-radius: 2px;
  font-size: 14px;
  line-height: 19px;
  color: #606C8B;
  margin-top: 1px;
  padding: 5px 0px;
  cursor: pointer;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
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
  padding: 0px 16px;
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
  .verification-status {
    margin-right: 24px;
  }
}
</style>
