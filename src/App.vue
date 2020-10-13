<template>
  <HostedHapps />
</template>

<script>
import HostedHapps from 'pages/HostedHapps.vue'

export default {
  name: 'App',
  components: {
    HostedHapps
  }
}
</script>

<style>
body, html {
  height: 100%;
}
#app {
  font-family: 'Nunito Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #fafcfe;
  height: 100%;
}
</style>
