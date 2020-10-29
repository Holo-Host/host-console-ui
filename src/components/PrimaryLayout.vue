<template>
  <section class='layout'>
    <Sidebar />
    <section class='main-column'>
      <TopNav :breadcrumbs="breadcrumbsOrTitle" />
      <section class='content'>
        <slot />
      </section>
    </section>
  </section>
</template>

<script>

import Sidebar from 'components/Sidebar.vue'
import TopNav from 'components/TopNav.vue'
import { computed } from 'vue'

export default {
  name: 'PrimaryLayout',
  components: {
    Sidebar,
    TopNav
  },
  props: {
    title: String,
    breadcrumbs: Array
  },
  computed: {
    breadcrumbsOrTitle() {
      if (!!this.breadcrumbs) {
        return this.breadcrumbs
      } else {
        return [{
          label: this.title
        }]
      }
    }
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
