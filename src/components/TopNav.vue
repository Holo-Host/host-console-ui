<template>
  <section class='top-nav'>    
    <h1 v-if="!path" class='main-title'>{{ mainTitle }}</h1>    
    <router-link v-if="!!path" class='main-title' :to="path">{{ mainTitle }}</router-link>
    <div v-if="showSubtitle" class='sub-title'>&nbsp;&nbsp;&nbsp;&gt;&nbsp;&nbsp;&nbsp;{{ subTitle }}</div>
  </section>
</template>

<script>
export default {
  name: 'TopNav',
  props: {
    breadcrumbs: {
      type: Array,
      default: [{}, {}]
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
.sub-title {
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: #606C8B;
  text-decoration: none;
  margin-top: 8px;
}
</style>
