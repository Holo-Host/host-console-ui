<template>
  <section class="top-nav">    
    <h1 v-if="!path" class="main-title">{{ mainTitle }}</h1>    
    <router-link v-if="!!path" class="main-title" :to="path">{{ mainTitle }}</router-link>
    <RightChevronIcon v-if="showSubtitle" class="chevron" />
    <div v-if="showSubtitle" class="sub-title">{{ subTitle }}</div>
    <div class="right">
      <div class="owner" @click="toggleMenu">{{ deviceName }} <DownTriangleIcon class='down-triangle' /></div>
      <div v-if="menuOpen" class="menu">
        <router-link to="/settings" class="settings-link">
          <div class="menu-item">
            HoloPort Settings
          </div>
        </router-link>
        <div @click="logout" class="menu-item">Logout</div>
      </div>
    </div>
  </section>
</template>

<script>
import { eraseHpAdminKeypair } from 'src/utils/keyManagement'
import RightChevronIcon from 'components/icons/RightChevronIcon.vue'
import DownTriangleIcon from 'components/icons/DownTriangleIcon.vue'
import HposInterface from 'src/interfaces/HposInterface'

export default {
  name: 'TopNav',
  components: {
    RightChevronIcon,
    DownTriangleIcon
  },
  props: {
    breadcrumbs: {
      type: Array,
      default: [{}, {}]
    }
  },
  data () {
    return {
      menuOpen: false,
      deviceName: 'Loading...'
    }
  },
  async mounted () {
    const { deviceName } = await HposInterface.settings()
    if (deviceName) {
      this.deviceName = deviceName
    }
  },
  methods: {
    toggleMenu () {
      this.menuOpen = !this.menuOpen
    },
    logout () {
      eraseHpAdminKeypair()
      localStorage.removeItem('isAuthed')
      this.$router.push('/login')
    }
  },
  computed: {
    mainTitle () {
      return this.breadcrumbs[0].label
    }, 
    path () {
      return this.breadcrumbs[0].path
    },
    subTitle () {
      return this.breadcrumbs[1].label
    },
    showSubtitle () {
      return this.breadcrumbs.length > 1 && !!this.breadcrumbs[1].label
    }
  }
}
</script>

<style scoped>
.top-nav {
  display: flex;
  flex: 0 0 92px;
  padding-top: 46px;
}
.main-title {
  font-size: 26px;
  font-weight: 700;
  margin: 0;
  color: #273048;
  text-decoration: none;
}
.chevron {
  margin: 12px 10px 0 15px;
}
.sub-title {
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: #606C8B;
  text-decoration: none;
  margin-top: 9px;
}
.right {
  margin-left: auto;  
  margin-right: -3px;
}
.owner {
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: #313C59;
  min-width: 150px;
  cursor: pointer;
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
</style>
