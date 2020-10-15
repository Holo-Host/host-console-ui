<template>
  <PrimaryLayout title="hApps">
    <div class="happ-list">
      <HappCard v-for="happ in happs" v-bind:happ="happ" v-bind:key="happ.id" />
    </div>
  </PrimaryLayout>
</template>

<script>

import PrimaryLayout from 'components/PrimaryLayout.vue'
import HappCard from 'components/HappCard.vue'

const happs = [{
  id: 1,
  name: 'HoloFuel',
  hostedDays: 34,
  earnings: 476005,
  usage: {
    cpu: '258',
    storage: '9',
    bandwidth: '64'
  }
}, {
  id: 2,
  name: 'Community',
  hostedDays: 34,
  earnings: 476005,
  usage: {
    cpu: '258',
    storage: '9',
    bandwidth: '64'
  }
}, {
  id: 3,
  name: 'H-Wiki',
  hostedDays: 34,
  earnings: 476005,
  usage: {
    cpu: '258',
    storage: '9',
    bandwidth: '64'
  }
}, {
  id: 4,
  name: 'HoloFuel',
  hostedDays: 34,
  earnings: 476005,
  usage: {
    cpu: '258',
    storage: '9',
    bandwidth: '64'
  }
}, {
  id: 5,
  name: 'Community',
  hostedDays: 34,
  earnings: 476005,
  usage: {
    cpu: '258',
    storage: '9',
    bandwidth: '64'
  }
}, {
  id: 6,
  name: 'H-Wiki',
  hostedDays: 34,
  earnings: 476005,
  usage: {
    cpu: '258',
    storage: '9',
    bandwidth: '64'
  }
}, {
  id: 7,
  name: 'HoloFuel',
  hostedDays: 34,
  earnings: 476005,
  usage: {
    cpu: '258',
    storage: '9',
    bandwidth: '64'
  }
}, {
  id: 8,
  name: 'Community',
  hostedDays: 34,
  earnings: 476005,
  usage: {
    cpu: '258',
    storage: '9',
    bandwidth: '64'
  }
}]

export default {
  name: 'HostedHapps',
  components: {
    PrimaryLayout,
    HappCard
  },
  data () {
    return {
      happs
    }
  } 
}

</script>

<style scoped>
.happ-list {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding-top: 40px;
  margin-right: -18px;
}
</style>
