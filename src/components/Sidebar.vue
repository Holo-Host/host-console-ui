<template>
  <section class="sidebar">
    <h1 class="banner">Host Console</h1>
    <section class="menu">
      <div class="menu-row">
        <HappsIcon class="home-icon" />Happs
      </div>
      <div class="footer">
        <div class='holo-brand'>
          <img src='/images/holo-logo.png' class='holo-logo'/>
          HOLO
        </div>
        <a href='https://forum.holo.host/t/alpha-testnet-terms-conditions/193'>View Terms of Service</a>        
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
}
.home-icon {
  margin-right: 10px;
}
.footer {
  margin-top: auto;
  padding-bottom: 8px;
}
.footer a {
  display: block;
  margin-bottom: 5px;
  color: black;
  font-weight: 600;
  text-decoration: none;
}
.holo-brand {
  display: flex;
  margin-bottom: 25px;
  align-items: center;
  font-family: 'Raleway', sans-serif;
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 12px;
}
.holo-logo {
  width: 30px;
  margin-right: 8px;
}
</style>
