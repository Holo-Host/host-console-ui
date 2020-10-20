<template>
  <PrimaryLayout :breadcrumbs="breadcrumbs">
    <div class='happ-details'>
      <div class='avatar'>{{ initials }}</div>
      <div class='details'>
        <div class="name-row">
          <h2 class="name">{{ happ.name }}</h2>
          <ArrowIcon class="arrow-icon" />
        </div>
        <div class="duration-row">
          <ClockIcon class="clock-icon" /> Hosted for&nbsp;<span class="days">{{ happ.hostedDays }} days</span>
        </div>
        <div class="snapshot-label">7 day snapshot:</div>
        <div class="earnings-row">
          <HoloIcon class='holo-icon' /> Earnings:<span class="earnings">&nbsp;{{ happ.earnings }} TF</span>
        </div>
        <div class="usage-row">
          <div class='usage'>
            <span class="usage-value">{{ happ.usage.cpu }}ms</span> CPU
          </div>
          <div class='usage'>
            <span class="usage-value">{{ happ.usage.storage }}MB</span> Storage
          </div>
          <div class='usage'>
            <span class="usage-value">{{ happ.usage.bandwidth }}Mb</span> Bandwidth            
          </div>
        </div>
      </div>
    </div>
  </PrimaryLayout>
</template>

<script>

import PrimaryLayout from 'components/PrimaryLayout.vue'
import happs from 'src/mockHapps'

export default {
  name: 'HappDetails',
  data() {
    return {
      happ: {}
    }
  },
  created () {
    const happId = Number(this.$route.params.id)
    const happ = happs.find(({ id }) => id === happId)
    if (!happ) {
      throw new Error(`Failed to load happ with id: ${happId}`)
    }
    this.happ = happ
  },
  computed: {
    breadcrumbs () {
      console.log([{
        label: 'hApps',
        path: '/'
      }, {
        label: this.happ.name || 'loading'
      }])
      return [{
        label: 'hApps',
        path: '/'
      }, {
        label: this.happ.name || 'loading'
      }]
    }
  },
  components: {
    PrimaryLayout,
  }
}

</script>

<style scoped>

</style>
