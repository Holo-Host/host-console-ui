<template>
  <section class="mobile-banner">
    <MenuIcon />
    <TopNavMenu :deviceName="deviceName" :white="true" />
  </section>
</template>

<script>
import TopNavMenu from 'components/TopNavMenu.vue'
import MenuIcon from 'components/icons/MenuIcon.vue'

export default {
  name: 'MobileBanner',
  components: {
    MenuIcon,
    TopNavMenu
  },
  props: {
    deviceName: String
  },
}
</script>

<style>
/* note this style sheet is not scoped, because we use the class in TopNavMenu */
.mobile-banner {
  display: none;
  flex: 0 0 128px;
  align-items: flex-end;
  background-color: #00CAD9;
  padding: 20px;
}

@media screen and (max-width: 1050px) {
  .mobile-banner {
    display: flex;
  }
}
</style>
