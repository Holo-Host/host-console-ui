<template>
  <router-link :to="pathToHapp" class='happ-card'>
    <HappImage :happ="happ" />
    <div class='details'>
      <div class="name-row">
        <h2 class="name">{{ happ.name }}</h2>
        <ArrowIcon class="arrow-icon" />
      </div>
      <div class="duration-row">
        <ClockIcon class="clock-icon" /> Hosted for&nbsp;<span class="days">{{ happ.hostedDays }} days</span>
      </div>
      <div class="snapshot-label">7 day snapshot:</div>
      <div class="earnings-row grayed-out">
        Earnings:<span class="earnings">&nbsp;{{ happ.sevenDayEarnings }} TF</span>
      </div>
      <div class="usage-row">
        <div class='usage'>
          <span class="usage-value">{{ happ.usage.cpu }}ms</span> CPU
        </div>
        <div class='usage'>
          <span class="usage-value">{{ happ.storage }}MB</span> Storage
        </div>
        <div class='usage'>
          <span class="usage-value">{{ happ.usage.bandwidth }}Mb</span> Bandwidth            
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import HappImage from 'components/HappImage.vue'
import ClockIcon from 'components/icons/ClockIcon.vue'
import ArrowIcon from 'components/icons/ArrowIcon.vue'

export default {
  name: 'HappCard',
  components: {
    HappImage,
    ClockIcon,
    ArrowIcon
  },
  props: {
    happ: Object
  },
  computed: {
    pathToHapp() {
      return `/happ/${this.happ.id}`
    }
  }
}
</script>

<style scoped>
.happ-card {
  display: flex;
  background-color: white;
  max-width: 546px;
  box-shadow: 0px 4px 20px #ECEEF1;
  border-radius: 12px;
  margin-right: 18px;
  margin-bottom: 20px;
  padding: 20px;
  flex: 1 0 546px;
  text-decoration: none;
}
.details {
  display: flex;
  flex: 1;
  flex-direction: column;  
  color: #606C8B;
  font-size: 14px;
  line-height: 19px;
  font-weight: 600;
}
.name-row {
  display: flex;
  align-items: center;
  margin-bottom: 6px;
}
.name {
  margin: 0;
  color: #313C59;
  font-weight: bold;
  font-size: 22px;
  line-height: 30px;
}
.arrow-icon {
  margin-left: auto;
}
.duration-row {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}
.clock-icon {
  margin-right: 8px;
}
.days {
  font-weight: 700;
}
.snapshot-label {
  margin-left: 3px;
  margin-bottom: 3px;
}
.earnings-row {
  display: flex;
  align-items: center;
  color: #313C59;
  margin-bottom: 10px;
  margin-left: 3px;  
}
.earnings {
  font-weight: 700;
}
.usage-row {
  display: flex;
  justify-content: space-between;
  color: #313C59;
  font-size: 12px;
  font-weight: 600;
  padding-right: 36px;
}
.usage {
  display: flex;
}
.usage-value {
  padding: 0 5px;
  border-bottom: 2px solid #00CAD9;
  font-size: 14px;
  font-weight: 700;
}
/* Temporary, remove once we have all live data */
.grayed-out {
  color: rgba(96, 108, 139, 0.18);
}
.grayed-out span {
  color: rgba(96, 108, 139, 0.18);
}
</style>
