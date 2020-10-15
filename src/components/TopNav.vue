<template>
  <section class='top-nav'>
    <h1 class='title'>{{ title }}</h1>
  </section>
</template>

<script>
export default {
  name: 'TopNav',
  props: {
    title: String
  }
}
</script>

<style scoped>
.top-nav {
  border-bottom: 1px solid #E7E9ED;
  flex: 0 0 92px;
  padding-top: 46px;
}
.title {
  font-size: 26px;
  font-weight: 700;
  margin: 0;
}
</style>
