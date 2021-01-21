<template>
  <PrimaryLayout title="HoloPort Settings">
    <div class='settings'>
      
    </div>
  </PrimaryLayout>
</template>

<script>

import PrimaryLayout from 'components/PrimaryLayout.vue'
import HposInterface from 'src/interfaces/HposInterface'

export default {
  name: 'Settings',
  components: {
    PrimaryLayout
  }
}

</script>

<style scoped>
.settings {
  display: flex;
  flex-direction: column;
  background-color: white;
  box-shadow: 0px 4px 20px #ECEEF1;
  border-radius: 5px;
  margin: 40px 18px 20px 0;
  padding: 30px;
  color: #606C8B;
  font-size: 14px;
  line-height: 19px;
  font-weight: 600;
}
</style>
