<template>
  <section class="top-nav">    
    <h1 v-if="!path" class="main-title">{{ mainTitle }}</h1>    
    <router-link v-if="!!path" class="main-title" :to="path">{{ mainTitle }}</router-link>
    <RightChevronIcon v-if="showSubtitle" class="chevron" />
    <div v-if="showSubtitle" class="sub-title">{{ subTitle }}</div>
    <div class="right">
      <div class="owner" @click="toggleMenu">Your HP <DownTriangleIcon class='down-triangle' /></div>
      <div v-if="menuOpen" class="menu">
        <button @click="logout" class="menu-item">Logout</button>
      </div>
    </div>
  </section>
</template>

<script>
import { eraseHpAdminKeypair } from 'src/utils/keyManagement'
import RightChevronIcon from 'components/icons/RightChevronIcon.vue'
import DownTriangleIcon from 'components/icons/DownTriangleIcon.vue'

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
      menuOpen: false
    }
  },
  methods: {
    toggleMenu () {
      this.menuOpen = !this.menuOpen
    },
    logout () {
      console.log('lougout!!')
      eraseHpAdminKeypair()
      localStorage.removeItem('auth_token')
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
  border-bottom: 1px solid #E7E9ED;
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
  margin-right: 80px;
}
.owner {
  font-weight: 600;
  font-size: 14px;
  line-height: 19px;
  color: #313C59;
}
.down-triangle {
  margin-left: 3px;
}
.menu {
  background: #FFFFFF;
  border: 1px solid #606C8B;
  border-radius: 2px;
  font-size: 14px;
  line-height: 19px;
  color: #606C8B;
  padding: 5px 0px;
}
.menu-item {
  padding: 0px 6px;
}
.menu-item:hover {
  background-color: rgba(176, 236, 240, 0.72);
}
</style>
