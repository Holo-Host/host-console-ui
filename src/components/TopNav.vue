<template>
  <section class="top-nav">
    <h1 v-if="!path" class="main-title">{{ mainTitle }}</h1>
    <router-link v-if="!!path" class="main-title" :to="path">{{ mainTitle }}</router-link>
    <RightChevronIcon v-if="showSubtitle" class="chevron" />
    <div v-if="showSubtitle" class="sub-title">{{ subTitle }}</div>
    <TopNavMenu :deviceName="deviceName" />
  </section>
</template>

<script>
import TopNavMenu from 'components/TopNavMenu.vue'
import RightChevronIcon from 'components/icons/RightChevronIcon.vue'

export default {
  name: 'TopNav',
  components: {
    TopNavMenu,
    RightChevronIcon
  },
  props: {
    breadcrumbs: {
      type: Array,
      default: [{}, {}]
    },
    deviceName: String
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

@media screen and (max-width: 1050px) {
  .top-nav {
    padding-top: 22px;
    flex: 0 0 46px;
  }
}
</style>
