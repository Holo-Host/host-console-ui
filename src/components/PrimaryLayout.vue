<template>
  <div class='layout'>
    <Sidebar />
    <div class='main-column'>
      <TopNav :title="title" />
      <div class='content'>
        <slot />
      </div>
    </div>
  </div>
</template>

<script>

import Sidebar from 'components/Sidebar.vue'
import TopNav from 'components/TopNav.vue'

export default {
  name: 'PrimaryLayout',
  components: {
    Sidebar,
    TopNav
  },
  props: {
    title: String
  }
}
</script>

<style scoped>
.layout {
  display: flex;
  height: 100%;
}
.main-column {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 20px;
}
.content{
  display: flex;
  flex-direction: column;
}
</style>
