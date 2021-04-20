<template>
  <router-view />
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html {
  overflow-y: scroll;
}
body, html {
  height: 100%;
}
#app {
  font-family: 'Nunito Sans', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background-color: #fafcfe;
  height: 100%;
  display: flex;
  flex-direction: column;
}
</style>
