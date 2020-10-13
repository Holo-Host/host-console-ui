<template>
  <PrimaryLayout title='hApps'>
    <HappCard v-for="happ in happs" v-bind:happ="happ" v-bind:key="happ.id" />
  </PrimaryLayout>
</template>

<script>

import PrimaryLayout from 'components/PrimaryLayout.vue'
import HappCard from 'components/HappCard.vue'

export default {
  name: 'HostedHapps',
  components: {
    PrimaryLayout,
    HappCard
  },
  data () {
    return {
      happs: [{
        id: 1,
        name: 'HoloFuel',
        hostedDays: 34,
        sevenDayEarnings: 476005,
        usage: {
          cpu: '258ms',
          storage: '9mb',
          bandwidth: '64mb'
        }
      }]
    }
  } 
}
</script>

<style scoped>

</style>
