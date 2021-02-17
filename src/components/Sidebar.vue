<template>
  <section class="sidebar">
    <h1 class="banner">Host Console</h1>
    <section class="menu">
      <router-link to="/" class='menu-row'>
        <HappsIcon class="home-icon" />hApps
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
import HappsIcon from 'components/icons/HappsIcon.vue'


export default {
  name: 'Sidebar',
  components: {
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
  padding: 30px 40px;
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
}
.home-icon {
  margin-right: 10px;
}
.footer {
  margin-top: auto;
  padding-bottom: 8px;
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

</style>
