<template>
  <section class="sidebar">
    <h1 class="banner">Host Console</h1>
    <section class="menu">
      <router-link to="/dashboard" class='menu-row' active-class="active-link">
        <HomeIcon class="home-icon" :color="$route.path.match('/dashboard') ? '#00CAD9' : '#313C59'" />Dashboard
      </router-link>
      <router-link to="/happs" class='menu-row' active-class="active-link">
        <HappsIcon class="home-icon" :color="$route.path.match('/happs') ? '#00CAD9' : '#313C59'" />Happs
      </router-link>
      <div class="footer">
        <a class='holo-brand' href="https://holo.host/" target="_blank">
          <img src='/images/holo-logo.png' class='holo-logo'/>
          HOLO
        </a>
        <a class='footer-link' href='https://forum.holo.host/t/alpha-testnet-terms-conditions/193' target="_blank">View Terms of Service</a>
        <div class='ui-version'>Host Console version {{ uiVersion }}</div>
      </div>
    </section>
  </section>
</template>

<script>
import HomeIcon from 'components/icons/HomeIcon.vue'
import HappsIcon from 'components/icons/HappsIcon.vue'

export default {
  name: 'Sidebar',
  components: {
    HomeIcon,
    HappsIcon
  },
  computed: {
    uiVersion () {
      return process.env.VUE_APP_UI_VERSION
    }
  }
}
</script>

<style scoped>
.sidebar {
  display: flex;
  flex-direction: column;
  flex: 0 0 270px;
  background: #FFFFFF;
  box-shadow: 0px 4px 4px rgba(54, 59, 71, 0.1);
  z-index: 100;
}
.mobile-banner .sidebar {
  display: none;
}
.banner {
  background-color: rgba(0, 202, 217, 0.06);
  color: #00CAD9;
  font-weight: bold;
  font-size: 24px;
  text-align: center;
  padding: 44px 0;
  margin: 0;
}
.menu {
  padding: 30px 24px 30px 18px;
  flex: 1;
  display: flex;
  flex-direction: column;
}
.menu-row {
  display: flex;
  align-items: center;
  font-size: 14px;
  text-decoration: none;
  color: #313C59;
  margin-bottom: 20px;
  padding: 3px 0 3px 24px;
}
.menu-row:hover {
  background: rgba(0, 202, 217, 0.06);
  border-radius: 2px;
}
.active-link {
  color: #00CAD9;
}
.icon {
  margin-right: 10px;
}
.footer {
  margin-top: auto;
  padding-bottom: 8px;
  padding-left: 24px;
}
.holo-brand {
  display: flex;
  margin-bottom: 25px;
  align-items: center;
  font-family: 'Raleway', sans-serif;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 12px;
  color: black;
  text-decoration: none;
}
.holo-logo {
  width: 30px;
  margin-right: 8px;
  margin-left: -6px;
}
.footer-link {
  display: block;
  margin-bottom: 6px;
  color: black;
  font-weight: 600;
  font-size: 14px;
}
.ui-version {
  line-height: 14px;
  font-size: 10px;
  color: black;
  font-style: italic;
  font-weight: 600;
}
@media screen and (max-width: 1050px) {
  .sidebar {
    display: none;
  }

  .mobile-banner .sidebar {
    display: flex;
    position: fixed;
    top: 0px;
    left: 0px;
    height: 100%;
    min-width: 272px;
  }
}

</style>
