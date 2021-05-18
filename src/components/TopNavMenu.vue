<template>
  <div class="top-nav-menu">
    <div class="owner" @click="toggleMenu">{{ deviceName }} <DownTriangleIcon class='down-triangle' :white="white" /></div>
    <div v-if="menuOpen" class="menu">
      <router-link to="/settings" class="settings-link">
        <div class="menu-item">
          HoloPort Settings
        </div>
      </router-link>
      <div @click="logout" class="menu-item">Logout</div>
    </div>
  </div>
</template>

<script>
import { eraseHpAdminKeypair } from 'src/utils/keyManagement'
import DownTriangleIcon from 'components/icons/DownTriangleIcon.vue'

export default {
  name: 'TopNav',
  components: {
    DownTriangleIcon
  },
  props: {
    deviceName: String,
    white: Boolean
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
      eraseHpAdminKeypair()
      // the next two lines are redundant because they will both happen automatically in router.js once keypair is removed.
      localStorage.removeItem('isAuthed')
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>
.top-nav-menu {
  display: block;
  margin-left: auto;
  margin-right: -3px;
  color: #313C59;
}
.mobile-banner .top-nav-menu {
  display: none;
  color: white;
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
.down-triangle {
  margin-left: 3px;
}
.menu {
  position: relative;
  right: 12px;
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
  position: absolute;
  right: 49px;
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
.settings-link {
  text-decoration: none;
  color: #606C8B;
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
  }
}
</style>
